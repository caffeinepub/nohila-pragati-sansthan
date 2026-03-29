import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
    // Initialize the access control system
    let accessControlState = AccessControl.initState();
    include MixinAuthorization(accessControlState);

    // User Profile Type - stores member information
    public type UserProfile = {
        name : Text;
        phoneNumber : Text;
        role : Text; // "admin" or "volunteer" or "member"
        registrationDate : Int;
    };

    // Help Request Type - stores contact/help requests from visitors
    public type HelpRequest = {
        id : Nat;
        name : Text;
        phone : Text;
        message : Text;
        submittedAt : Int;
    };

    // QR Code Data Type
    public type QRCodeData = {
        url : Text;
        description : Text;
        updatedAt : Int;
    };

    // Storage
    let userProfiles = Map.empty<Principal, UserProfile>();
    var helpRequests : [HelpRequest] = [];
    var nextHelpRequestId : Nat = 0;
    var qrCodeData : ?QRCodeData = null;

    // ============================================
    // User Profile Management
    // ============================================

    // Get caller's own profile (authenticated users only)
    public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            Runtime.trap("Unauthorized: Only users can view profiles");
        };
        userProfiles.get(caller);
    };

    // Get any user's profile (admin can view any, users can view their own)
    public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
        if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
            Runtime.trap("Unauthorized: Can only view your own profile");
        };
        userProfiles.get(user);
    };

    // Save caller's profile (authenticated users only)
    public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            Runtime.trap("Unauthorized: Only users can save profiles");
        };
        userProfiles.add(caller, profile);
    };

    // ============================================
    // Member Management (Admin Only)
    // ============================================

    // Get all members (admin only)
    public query ({ caller }) func getAllMembers() : async [(Principal, UserProfile)] {
        if (not (AccessControl.isAdmin(accessControlState, caller))) {
            Runtime.trap("Unauthorized: Only admins can view all members");
        };
        userProfiles.entries().toArray();
    };

    // Get member count (admin only)
    public query ({ caller }) func getMemberCount() : async Nat {
        if (not (AccessControl.isAdmin(accessControlState, caller))) {
            Runtime.trap("Unauthorized: Only admins can view member count");
        };
        userProfiles.size();
    };

    // Get members by role (admin only)
    public query ({ caller }) func getMembersByRole(role : Text) : async [(Principal, UserProfile)] {
        if (not (AccessControl.isAdmin(accessControlState, caller))) {
            Runtime.trap("Unauthorized: Only admins can view members by role");
        };
        let filtered = userProfiles.entries().filter(
            func((_, profile)) : Bool {
                profile.role == role
            }
        );
        filtered.toArray();
    };

    // ============================================
    // QR Code Management
    // ============================================

    // Get QR code data (public - anyone can view)
    public query func getQRCodeData() : async ?QRCodeData {
        qrCodeData;
    };

    // Set QR code data (admin only)
    public shared ({ caller }) func setQRCodeData(url : Text, description : Text) : async () {
        if (not (AccessControl.isAdmin(accessControlState, caller))) {
            Runtime.trap("Unauthorized: Only admins can update QR code data");
        };
        qrCodeData := ?{
            url = url;
            description = description;
            updatedAt = Time.now();
        };
    };

    // ============================================
    // Help Request Management
    // ============================================

    // Submit help request (public - anyone can submit)
    public shared func submitHelpRequest(name : Text, phone : Text, message : Text) : async Nat {
        let requestId = nextHelpRequestId;
        nextHelpRequestId += 1;

        let newRequest : HelpRequest = {
            id = requestId;
            name = name;
            phone = phone;
            message = message;
            submittedAt = Time.now();
        };

        helpRequests := helpRequests.concat([newRequest]);
        requestId;
    };

    // Get all help requests (admin only)
    public query ({ caller }) func getAllHelpRequests() : async [HelpRequest] {
        if (not (AccessControl.isAdmin(accessControlState, caller))) {
            Runtime.trap("Unauthorized: Only admins can view help requests");
        };
        helpRequests;
    };

    // Get help request count (admin only)
    public query ({ caller }) func getHelpRequestCount() : async Nat {
        if (not (AccessControl.isAdmin(accessControlState, caller))) {
            Runtime.trap("Unauthorized: Only admins can view help request count");
        };
        helpRequests.size();
    };

    // Get recent help requests (admin only)
    public query ({ caller }) func getRecentHelpRequests(limit : Nat) : async [HelpRequest] {
        if (not (AccessControl.isAdmin(accessControlState, caller))) {
            Runtime.trap("Unauthorized: Only admins can view help requests");
        };
        let size = helpRequests.size();
        if (size <= limit) {
            return helpRequests;
        };
        let startIndex = size - limit;
        Array.tabulate<HelpRequest>(
            limit,
            func(i : Nat) : HelpRequest {
                helpRequests[startIndex + i];
            }
        );
    };

    // ============================================
    // Statistics (Admin Only)
    // ============================================

    // Get basic statistics
    public query ({ caller }) func getStats() : async {
        totalMembers : Nat;
        totalHelpRequests : Nat;
        adminCount : Nat;
        volunteerCount : Nat;
        memberCount : Nat;
    } {
        if (not (AccessControl.isAdmin(accessControlState, caller))) {
            Runtime.trap("Unauthorized: Only admins can view statistics");
        };

        var adminCount = 0;
        var volunteerCount = 0;
        var memberCount = 0;

        for ((_, profile) in userProfiles.entries()) {
            if (profile.role == "admin") {
                adminCount += 1;
            } else if (profile.role == "volunteer") {
                volunteerCount += 1;
            } else if (profile.role == "member") {
                memberCount += 1;
            };
        };

        {
            totalMembers = userProfiles.size();
            totalHelpRequests = helpRequests.size();
            adminCount = adminCount;
            volunteerCount = volunteerCount;
            memberCount = memberCount;
        };
    };

    // ============================================
    // User Registration Helper
    // ============================================

    // Register new member with phone number (public for initial registration)
    // Note: After registration, admin should assign appropriate role
    public shared ({ caller }) func registerMember(
        name : Text,
        phoneNumber : Text,
        role : Text
    ) : async () {
        // Check if user already has a profile
        switch (userProfiles.get(caller)) {
            case (?_) {
                Runtime.trap("User already registered");
            };
            case null {
                let profile : UserProfile = {
                    name = name;
                    phoneNumber = phoneNumber;
                    role = role;
                    registrationDate = Time.now();
                };
                userProfiles.add(caller, profile);
            };
        };
    };

    // Check if phone number is already registered (public query)
    public query func isPhoneNumberRegistered(phoneNumber : Text) : async Bool {
        for ((_, profile) in userProfiles.entries()) {
            if (profile.phoneNumber == phoneNumber) {
                return true;
            };
        };
        false;
    };
};

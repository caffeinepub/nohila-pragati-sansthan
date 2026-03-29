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

    // User Profile Type
    public type UserProfile = {
        name : Text;
        phoneNumber : Text;
        role : Text;
        registrationDate : Int;
    };

    // Help Request Type
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

    // Pending Registration Type
    public type PendingRegistration = {
        principal : Principal;
        name : Text;
        phoneNumber : Text;
        role : Text;
        utrNumber : Text;
        submittedAt : Int;
    };

    // Storage
    let userProfiles = Map.empty<Principal, UserProfile>();
    var helpRequests : [HelpRequest] = [];
    var nextHelpRequestId : Nat = 0;
    var qrCodeData : ?QRCodeData = null;
    var pendingRegistrations : [PendingRegistration] = [];

    // ============================================
    // User Profile Management
    // ============================================

    public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
        userProfiles.get(caller);
    };

    public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
        userProfiles.get(user);
    };

    public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
        userProfiles.add(caller, profile);
    };

    // ============================================
    // Member Management (public for admin dashboard)
    // ============================================

    public query func getAllMembers() : async [(Principal, UserProfile)] {
        userProfiles.entries().toArray();
    };

    public query func getMemberCount() : async Nat {
        userProfiles.size();
    };

    public query func getMembersByRole(role : Text) : async [(Principal, UserProfile)] {
        userProfiles.entries().toArray().filter(func((_, p)) { p.role == role });
    };

    // ============================================
    // QR Code Management
    // ============================================

    public query func getQRCodeData() : async ?QRCodeData {
        qrCodeData;
    };

    public shared ({ caller }) func setQRCodeData(url : Text, description : Text) : async () {
        qrCodeData := ?{
            url = url;
            description = description;
            updatedAt = Time.now();
        };
    };

    // ============================================
    // Help Request Management
    // ============================================

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

    public query func getAllHelpRequests() : async [HelpRequest] {
        helpRequests;
    };

    public query func getHelpRequestCount() : async Nat {
        helpRequests.size();
    };

    public query func getRecentHelpRequests(limit : Nat) : async [HelpRequest] {
        let all = helpRequests;
        let size = all.size();
        if (size <= limit) { all } else { Array.tabulate<HelpRequest>(limit, func i = all[size - limit + i]) };
    };

    // ============================================
    // Statistics (public for admin dashboard)
    // ============================================

    public query func getStats() : async {
        totalMembers : Nat;
        totalHelpRequests : Nat;
        adminCount : Nat;
        volunteerCount : Nat;
        memberCount : Nat;
    } {
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
    // User Registration
    // ============================================

    public shared ({ caller }) func registerMember(
        name : Text,
        phoneNumber : Text,
        role : Text
    ) : async () {
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

    public query func isPhoneNumberRegistered(phoneNumber : Text) : async Bool {
        for ((_, profile) in userProfiles.entries()) {
            if (profile.phoneNumber == phoneNumber) {
                return true;
            };
        };
        false;
    };

    // ============================================
    // Pending Registration (UTR Payment Verification)
    // ============================================

    public shared ({ caller }) func submitPendingRegistration(
        name : Text,
        phoneNumber : Text,
        role : Text,
        utrNumber : Text
    ) : async () {
        // Check not already registered
        switch (userProfiles.get(caller)) {
            case (?_) { Runtime.trap("User already registered"); };
            case null {};
        };
        // Remove any previous pending registration for same principal
        pendingRegistrations := pendingRegistrations.filter(
            func(r) { r.principal != caller }
        );
        let pending : PendingRegistration = {
            principal = caller;
            name = name;
            phoneNumber = phoneNumber;
            role = role;
            utrNumber = utrNumber;
            submittedAt = Time.now();
        };
        pendingRegistrations := pendingRegistrations.concat([pending]);
    };

    public query func getAllPendingRegistrations() : async [PendingRegistration] {
        pendingRegistrations;
    };

    public shared func approvePendingRegistration(utrNumber : Text) : async () {
        var found : ?PendingRegistration = null;
        for (r in pendingRegistrations.vals()) {
            if (r.utrNumber == utrNumber) {
                found := ?r;
            };
        };
        switch (found) {
            case null { Runtime.trap("Pending registration not found"); };
            case (?r) {
                let profile : UserProfile = {
                    name = r.name;
                    phoneNumber = r.phoneNumber;
                    role = r.role;
                    registrationDate = Time.now();
                };
                userProfiles.add(r.principal, profile);
                pendingRegistrations := pendingRegistrations.filter(
                    func(p) { p.utrNumber != utrNumber }
                );
            };
        };
    };

    public shared func rejectPendingRegistration(utrNumber : Text) : async () {
        pendingRegistrations := pendingRegistrations.filter(
            func(p) { p.utrNumber != utrNumber }
        );
    };

    public query ({ caller }) func getMyPendingRegistration() : async ?PendingRegistration {
        var found : ?PendingRegistration = null;
        for (r in pendingRegistrations.vals()) {
            if (r.principal == caller) {
                found := ?r;
            };
        };
        found;
    };


};

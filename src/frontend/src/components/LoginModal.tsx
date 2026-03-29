import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  Loader2,
  LogIn,
  LogOut,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useGetMyPendingRegistration,
  useSubmitPendingRegistration,
} from "../hooks/useQueries";

type RegistrationStep = "form" | "payment" | "submitted";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: Props) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const { data: profile, isLoading: profileLoading } =
    useGetCallerUserProfile();
  const { data: pendingReg, isLoading: pendingLoading } =
    useGetMyPendingRegistration();
  const submitPendingMutation = useSubmitPendingRegistration();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("member");
  const [utr, setUtr] = useState("");
  const [registrationStep, setRegistrationStep] =
    useState<RegistrationStep>("form");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      if (error.message === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    onClose();
    toast.success("Logged out successfully");
  };

  const handleFormNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setRegistrationStep("payment");
  };

  const handleSubmitUTR = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (utr.trim().length < 6) {
      toast.error("Please enter a valid UTR number (at least 6 characters).");
      return;
    }
    try {
      await submitPendingMutation.mutateAsync({
        name,
        phoneNumber: phone,
        role,
        utrNumber: utr.trim(),
      });
      setRegistrationStep("submitted");
    } catch (err: any) {
      const msg = err?.message || String(err) || "Unknown error";
      console.error("UTR submission error:", msg);
      setSubmitError(msg);
      toast.error("Submission failed. Please try again.");
    }
  };

  const isDataLoading = profileLoading || pendingLoading;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md" data-ocid="login.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-gradient-pink">
            {isAuthenticated
              ? profile
                ? `Welcome, ${profile.name}!`
                : "Join Mahila Pragati Sansthan"
              : "Join Mahila Pragati Sansthan"}
          </DialogTitle>
          <DialogDescription className="text-sm text-foreground/60">
            {isAuthenticated
              ? "You are logged in. Register your details to join our community."
              : "Login with Internet Identity to register as a volunteer or member."}
          </DialogDescription>
        </DialogHeader>

        {/* Login step */}
        {!isAuthenticated && (
          <div className="py-4 space-y-4">
            <div className="bg-pink-pale rounded-xl p-4 text-sm text-foreground/70">
              <p className="font-medium text-foreground mb-1">Why sign in?</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Register as a volunteer or member</li>
                <li>Track submitted help requests</li>
                <li>Access admin features (if authorized)</li>
              </ul>
            </div>
            <Button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full bg-pink-gradient text-white font-semibold rounded-full py-3 shadow-pink"
              data-ocid="login.submit_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging
                  in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" /> Login with Internet
                  Identity
                </>
              )}
            </Button>
          </div>
        )}

        {/* Authenticated view */}
        {isAuthenticated && (
          <div className="py-2 space-y-4">
            {isDataLoading ? (
              <div
                className="flex items-center justify-center py-6"
                data-ocid="login.loading_state"
              >
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : profile ? (
              // Already fully registered
              <div className="bg-pink-pale rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-pink-gradient rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{profile.name}</p>
                    <p className="text-xs text-foreground/60 capitalize">
                      {profile.role} · {profile.phoneNumber}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-foreground/60">
                  Member since{" "}
                  {new Date(
                    Number(profile.registrationDate) / 1_000_000,
                  ).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-pink-pale rounded-full"
                  data-ocid="login.cancel_button"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </div>
            ) : pendingReg ? (
              // Has pending registration awaiting admin approval
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <p className="font-semibold text-amber-800">
                      Registration Pending Approval
                    </p>
                  </div>
                  <p className="text-sm text-amber-700">
                    Your payment verification is under review. Admin will
                    approve your registration shortly.
                  </p>
                  <div className="bg-white rounded-lg p-3 border border-amber-200">
                    <p className="text-xs text-foreground/60 mb-1">
                      Submitted Details
                    </p>
                    <p className="text-sm font-medium">{pendingReg.name}</p>
                    <p className="text-xs text-foreground/60">
                      {pendingReg.phoneNumber} ·{" "}
                      <span className="capitalize">{pendingReg.role}</span>
                    </p>
                    <p className="text-xs text-foreground/60 mt-1">
                      UTR:{" "}
                      <span className="font-mono font-medium">
                        {pendingReg.utrNumber}
                      </span>
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-pink-pale rounded-full"
                  data-ocid="login.cancel_button"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </div>
            ) : (
              // Registration flow
              <Tabs defaultValue="register">
                <TabsList className="w-full bg-pink-pale">
                  <TabsTrigger
                    value="register"
                    className="flex-1"
                    data-ocid="login.tab"
                  >
                    Register
                  </TabsTrigger>
                  <TabsTrigger
                    value="logout"
                    className="flex-1"
                    data-ocid="login.tab"
                  >
                    Logout
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="register">
                  {registrationStep === "submitted" ? (
                    // Step 3: Submitted
                    <div className="pt-4 space-y-4">
                      <div className="flex flex-col items-center text-center gap-3 py-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-green-800">
                            Registration Submitted!
                          </p>
                          <p className="text-sm text-foreground/60 mt-1">
                            Your registration is pending admin approval. You'll
                            be notified once verified.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={onClose}
                        className="w-full bg-pink-gradient text-white font-semibold rounded-full shadow-pink"
                        data-ocid="login.close_button"
                      >
                        Close
                      </Button>
                    </div>
                  ) : registrationStep === "payment" ? (
                    // Step 2: Payment
                    <form onSubmit={handleSubmitUTR} className="space-y-4 pt-3">
                      <div className="text-center">
                        <p className="font-semibold text-foreground mb-1">
                          Pay ₹1000 Registration Fee
                        </p>
                        <p className="text-xs text-foreground/60">
                          Use any UPI app to scan the QR code below
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <div className="border-2 border-pink-200 rounded-xl overflow-hidden w-44 h-44 bg-white flex items-center justify-center p-1">
                          <img
                            src="/assets/uploads/whatsapp_image_2026-03-29_at_5.12.13_pm-019d397e-5b05-7188-8bee-aa8000aac93c-2.jpeg"
                            alt="Payment QR Code"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <p className="text-center text-xs font-medium text-foreground/70">
                        UPI ID: kissikanha6@okicici
                      </p>
                      <div className="bg-pink-pale rounded-lg p-3 text-xs text-foreground/70">
                        After paying, find the UTR/Reference number in your UPI
                        app's transaction history and enter it below.
                      </div>
                      <div>
                        <Label htmlFor="utr-number" className="text-sm">
                          UTR / Reference Number
                        </Label>
                        <Input
                          id="utr-number"
                          value={utr}
                          onChange={(e) => {
                            setUtr(e.target.value);
                            setSubmitError(null);
                          }}
                          placeholder="UTR / Reference number"
                          className="mt-1 font-mono"
                          required
                          minLength={6}
                          data-ocid="login.input"
                        />
                        <p className="text-xs text-foreground/50 mt-1">
                          Enter the UTR/transaction reference from your UPI app
                        </p>
                      </div>
                      {submitError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p
                            className="text-destructive text-xs font-medium"
                            data-ocid="login.error_state"
                          >
                            Error: {submitError}
                          </p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setRegistrationStep("form")}
                          className="flex-1 border-primary text-primary hover:bg-pink-pale rounded-full"
                          data-ocid="login.cancel_button"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={submitPendingMutation.isPending}
                          className="flex-1 bg-pink-gradient text-white font-semibold rounded-full shadow-pink"
                          data-ocid="login.submit_button"
                        >
                          {submitPendingMutation.isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                              Submitting...
                            </>
                          ) : (
                            "Submit for Verification"
                          )}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    // Step 1: Form
                    <form onSubmit={handleFormNext} className="space-y-4 pt-3">
                      <div>
                        <Label htmlFor="reg-name" className="text-sm">
                          Full Name
                        </Label>
                        <Input
                          id="reg-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          className="mt-1"
                          required
                          data-ocid="login.input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reg-phone" className="text-sm">
                          Phone Number
                        </Label>
                        <div className="relative mt-1">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="reg-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="pl-9"
                            required
                            data-ocid="login.input"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="reg-role" className="text-sm">
                          Join As
                        </Label>
                        <Select value={role} onValueChange={setRole}>
                          <SelectTrigger
                            className="mt-1"
                            data-ocid="login.select"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="volunteer">Volunteer</SelectItem>
                            <SelectItem value="counselor">Counselor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="bg-pink-pale rounded-lg p-3 text-xs text-foreground/70">
                        <span className="font-semibold text-foreground">
                          Registration fee: ₹1000
                        </span>{" "}
                        — payable via UPI in the next step.
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-pink-gradient text-white font-semibold rounded-full shadow-pink"
                        data-ocid="login.submit_button"
                      >
                        Next: Pay ₹1000 →
                      </Button>
                    </form>
                  )}
                </TabsContent>

                <TabsContent value="logout">
                  <div className="pt-4">
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-pink-pale rounded-full"
                      data-ocid="login.cancel_button"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

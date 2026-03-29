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
import { Loader2, LogIn, LogOut, Phone, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useRegisterMember,
} from "../hooks/useQueries";

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
  const registerMutation = useRegisterMember();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("member");

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await registerMutation.mutateAsync({ name, phoneNumber: phone, role });
      toast.success(`Welcome, ${name}! You are now registered.`);
      setName("");
      setPhone("");
      setRole("member");
      onClose();
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md" data-ocid="login.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-gradient-pink">
            {isAuthenticated
              ? profile
                ? `Welcome, ${profile.name}!`
                : "Complete Registration"
              : "Join Nohila Pragati Sansthan"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {isAuthenticated
              ? "You are logged in. Register your details to join our community."
              : "Login with Internet Identity to register as a volunteer or member."}
          </DialogDescription>
        </DialogHeader>

        {/* Login step */}
        {!isAuthenticated && (
          <div className="py-4 space-y-4">
            <div className="bg-pink-pale rounded-xl p-4 text-sm text-muted-foreground">
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
            {profileLoading ? (
              <div
                className="flex items-center justify-center py-6"
                data-ocid="login.loading_state"
              >
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : profile ? (
              // Already registered
              <div className="bg-pink-pale rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-pink-gradient rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{profile.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {profile.role} · {profile.phoneNumber}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
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
            ) : (
              // Register form
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
                  <form onSubmit={handleRegister} className="space-y-4 pt-3">
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
                    {registerMutation.isError && (
                      <p
                        className="text-destructive text-xs"
                        data-ocid="login.error_state"
                      >
                        Registration failed. Please try again.
                      </p>
                    )}
                    <Button
                      type="submit"
                      disabled={registerMutation.isPending}
                      className="w-full bg-pink-gradient text-white font-semibold rounded-full shadow-pink"
                      data-ocid="login.submit_button"
                    >
                      {registerMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                          Registering...
                        </>
                      ) : (
                        "Complete Registration"
                      )}
                    </Button>
                  </form>
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

import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Phone, Shield, User } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";

export default function UserProfilePage() {
  const { identity, clear } = useInternetIdentity();
  const { data: profile, isLoading } = useGetCallerUserProfile();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const avatarUrl = profile?.name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=e91e8c&color=fff&size=128&bold=true`
    : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-pink-gradient py-16 text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={profile?.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
          )}
          <div>
            <h1 className="font-display text-3xl font-bold">
              {profile?.name ?? "My Profile"}
            </h1>
            {profile && (
              <p className="text-white/80 capitalize mt-1">{profile.role}</p>
            )}
          </div>
        </motion.div>
      </div>

      <div className="max-w-lg mx-auto w-full px-4 py-12">
        {!isAuthenticated ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">You are not logged in.</p>
            <a
              href="/"
              className="text-primary font-medium hover:underline text-sm"
            >
              ← Go back to Home
            </a>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : profile ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-border space-y-4">
              <h2 className="font-semibold text-base">Profile Details</h2>

              <div className="flex items-center gap-3 py-3 border-b border-border">
                <div className="w-9 h-9 bg-pink-pale rounded-xl flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="font-medium text-sm">{profile.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-3 border-b border-border">
                <div className="w-9 h-9 bg-pink-pale rounded-xl flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone Number</p>
                  <p className="font-medium text-sm">{profile.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-3 border-b border-border">
                <div className="w-9 h-9 bg-pink-pale rounded-xl flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="font-medium text-sm capitalize">
                    {profile.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-3">
                <div className="w-9 h-9 bg-pink-pale rounded-xl flex items-center justify-center">
                  <span className="text-sm">📅</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="font-medium text-sm">
                    {new Date(
                      Number(profile.registrationDate) / 1_000_000,
                    ).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-pink-pale rounded-full"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm mb-4">
              You are logged in but haven't registered yet. Please register from
              the home page.
            </p>
            <a
              href="/"
              className="text-primary font-medium hover:underline text-sm"
            >
              ← Go to Home
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

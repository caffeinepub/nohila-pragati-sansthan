import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Crown,
  FileText,
  Loader2,
  LogIn,
  LogOut,
  MessageSquare,
  Shield,
  Trash2,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useApprovePendingRegistration,
  useClearAllData,
  useGetAllHelpRequests,
  useGetAllMembers,
  useGetAllPendingRegistrations,
  useGetOccupiedSpecialRoles,
  useGetStats,
  useRejectPendingRegistration,
} from "../hooks/useQueries";

const ADMIN_USER = "admin";
const ADMIN_PASS = "MahilaPragati@2024";
const STORAGE_KEY = "mps_admin_auth";

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground/60 font-medium">{label}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-pink-gradient flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem(STORAGE_KEY, "true");
        onLogin();
      } else {
        setError("Invalid username or password. Please try again.");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-pale via-white to-secondary flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4 pt-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-pink-gradient rounded-2xl flex items-center justify-center shadow-pink">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="font-display text-2xl text-gradient-pink">
              Admin Portal
            </CardTitle>
            <p className="text-sm text-foreground/60 mt-1">
              Mahila Pragati Sansthan — Secure Access
            </p>
          </CardHeader>
          <CardContent className="pb-8 px-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="admin-user" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="admin-user"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="mt-1.5"
                  autoComplete="username"
                  required
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label htmlFor="admin-pass" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="admin-pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="mt-1.5"
                  autoComplete="current-password"
                  required
                  data-ocid="admin.input"
                />
              </div>
              {error && (
                <div
                  className="flex items-center gap-2 text-destructive text-xs bg-destructive/10 px-3 py-2 rounded-lg"
                  data-ocid="admin.error_state"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-gradient text-white font-semibold rounded-full py-2.5 shadow-pink mt-2"
                data-ocid="admin.submit_button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" /> Login to Admin
                  </>
                )}
              </Button>
            </form>
            <div className="mt-6 p-3 bg-pink-pale rounded-xl">
              <p className="text-xs text-foreground/60 text-center">
                🔒 This portal is restricted to authorized administrators only.
              </p>
            </div>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-foreground/40 mt-4">
          <a href="/" className="hover:text-primary transition-colors">
            ← Back to main site
          </a>
        </p>
      </motion.div>
    </div>
  );
}

function ExpandableMessage({ message }: { message: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = message.length > 80;

  return (
    <div>
      <p className="text-sm">
        {expanded || !isLong ? message : `${message.slice(0, 80)}...`}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-0.5 text-xs text-primary mt-1 hover:underline"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3 h-3" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              Show more
            </>
          )}
        </button>
      )}
    </div>
  );
}

function PendingRegistrationsTab() {
  const { data: pendingList, isLoading } = useGetAllPendingRegistrations();
  const approveMutation = useApprovePendingRegistration();
  const rejectMutation = useRejectPendingRegistration();
  const [processingUtr, setProcessingUtr] = useState<string | null>(null);

  const handleApprove = async (utrNumber: string, name: string) => {
    setProcessingUtr(utrNumber);
    try {
      await approveMutation.mutateAsync(utrNumber);
      toast.success(`${name} approved and registered successfully.`);
    } catch (err: any) {
      toast.error(err?.message || "Failed to approve registration.");
    } finally {
      setProcessingUtr(null);
    }
  };

  const handleReject = async (utrNumber: string, name: string) => {
    setProcessingUtr(utrNumber);
    try {
      await rejectMutation.mutateAsync(utrNumber);
      toast.success(`Registration for ${name} rejected.`);
    } catch {
      toast.error("Failed to reject registration.");
    } finally {
      setProcessingUtr(null);
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" /> Pending Registrations
          {pendingList && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {pendingList.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div
            className="py-12 flex justify-center"
            data-ocid="admin.loading_state"
          >
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : !pendingList || pendingList.length === 0 ? (
          <div className="py-12 text-center" data-ocid="admin.empty_state">
            <Clock className="w-10 h-10 text-primary/30 mx-auto mb-3" />
            <p className="text-foreground/60 text-sm">
              No pending registrations
            </p>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden border border-border">
            <Table data-ocid="admin.table">
              <TableHeader>
                <TableRow className="bg-pink-pale/50">
                  <TableHead className="font-semibold text-foreground/70">
                    #
                  </TableHead>
                  <TableHead className="font-semibold text-foreground/70">
                    Name
                  </TableHead>
                  <TableHead className="font-semibold text-foreground/70">
                    Phone
                  </TableHead>
                  <TableHead className="font-semibold text-foreground/70">
                    Role
                  </TableHead>
                  <TableHead className="font-semibold text-foreground/70">
                    UTR Number
                  </TableHead>
                  <TableHead className="font-semibold text-foreground/70">
                    Submitted
                  </TableHead>
                  <TableHead className="font-semibold text-foreground/70">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingList.map((reg, i) => {
                  const isProcessing = processingUtr === reg.utrNumber;
                  return (
                    <TableRow
                      key={reg.utrNumber}
                      className="hover:bg-pink-pale/20"
                      data-ocid={`admin.row.item.${i + 1}`}
                    >
                      <TableCell className="text-foreground/40 text-sm">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-medium">{reg.name}</TableCell>
                      <TableCell className="text-sm text-foreground/70">
                        {reg.phoneNumber}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="text-xs capitalize bg-pink-pale text-primary"
                        >
                          {reg.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {reg.utrNumber}
                      </TableCell>
                      <TableCell className="text-sm text-foreground/60">
                        {new Date(
                          Number(reg.submittedAt) / 1_000_000,
                        ).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleApprove(reg.utrNumber, reg.name)
                            }
                            disabled={isProcessing || processingUtr !== null}
                            className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 h-7 rounded-full"
                            data-ocid="admin.confirm_button"
                          >
                            {isProcessing ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <>
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Approve
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleReject(reg.utrNumber, reg.name)
                            }
                            disabled={isProcessing || processingUtr !== null}
                            className="text-xs px-3 h-7 rounded-full"
                            data-ocid="admin.delete_button"
                          >
                            {isProcessing ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 mr-1" />
                                Reject
                              </>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SettingsTab() {
  const clearAllData = useClearAllData();

  const handleClearAll = async () => {
    const confirmed = window.confirm(
      "WARNING: This will permanently delete ALL registered users and pending registrations. This cannot be undone. Are you absolutely sure?",
    );
    if (!confirmed) return;
    try {
      await clearAllData.mutateAsync();
      toast.success("All users and registrations have been cleared.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to clear data.");
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" /> Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border border-destructive/30 rounded-xl p-5 bg-destructive/5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-destructive text-sm">
                Danger Zone
              </h3>
              <p className="text-xs text-foreground/60 mt-1">
                This will permanently delete ALL registered users and pending
                registrations. This cannot be undone.
              </p>
            </div>
          </div>
          <Button
            onClick={handleClearAll}
            disabled={clearAllData.isPending}
            variant="destructive"
            className="w-full rounded-full"
            data-ocid="admin.delete_button"
          >
            {clearAllData.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Clearing...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Users &amp; Registrations
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardContent({ onLogout }: { onLogout: () => void }) {
  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { data: members, isLoading: membersLoading } = useGetAllMembers();
  const { data: helpRequests, isLoading: requestsLoading } =
    useGetAllHelpRequests();
  const { data: pendingList } = useGetAllPendingRegistrations();
  const { data: occupiedRoles = [] } = useGetOccupiedSpecialRoles();

  const totalMembers = stats ? Number(stats.totalMembers) : null;
  const volunteers = stats ? Number(stats.volunteerCount) : null;
  const membersCount = stats ? Number(stats.memberCount) : null;
  const requestsCount = stats ? Number(stats.totalHelpRequests) : null;
  const pendingCount = pendingList ? pendingList.length : null;
  const overviewLoading = statsLoading;

  // Find president/treasurer names from approved members
  const presidentMember = members?.find(([, p]) => p.role === "president");
  const treasurerMember = members?.find(([, p]) => p.role === "treasurer");
  const presidentName = presidentMember
    ? presidentMember[1].name
    : occupiedRoles.includes("president")
      ? "Appointed"
      : "Vacant";
  const treasurerName = treasurerMember
    ? treasurerMember[1].name
    : occupiedRoles.includes("treasurer")
      ? "Appointed"
      : "Vacant";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top header */}
      <header className="bg-white border-b border-border shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/nps-logo-transparent.dim_200x200.png"
              alt="Logo"
              className="w-9 h-9 object-contain"
            />
            <div>
              <p className="font-display font-bold text-sm text-gradient-pink leading-tight">
                Admin Dashboard
              </p>
              <p className="text-xs text-foreground/50">
                Mahila Pragati Sansthan
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden sm:block text-xs text-foreground/50 hover:text-primary transition-colors"
            >
              ← Main Site
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="text-foreground/70 border-border hover:text-destructive hover:border-destructive rounded-full text-xs"
              data-ocid="admin.secondary_button"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border border-border rounded-xl p-1 gap-1 h-auto flex-wrap">
            <TabsTrigger
              value="overview"
              className="rounded-lg data-[state=active]:bg-pink-gradient data-[state=active]:text-white text-sm"
              data-ocid="admin.tab"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="rounded-lg data-[state=active]:bg-pink-gradient data-[state=active]:text-white text-sm"
              data-ocid="admin.tab"
            >
              Members
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="rounded-lg data-[state=active]:bg-pink-gradient data-[state=active]:text-white text-sm relative"
              data-ocid="admin.tab"
            >
              Pending
              {pendingCount !== null && pendingCount > 0 && (
                <span className="ml-1.5 bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="rounded-lg data-[state=active]:bg-pink-gradient data-[state=active]:text-white text-sm"
              data-ocid="admin.tab"
            >
              Help Requests
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-lg data-[state=active]:bg-pink-gradient data-[state=active]:text-white text-sm"
              data-ocid="admin.tab"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
              <StatCard
                icon={<Users className="w-5 h-5 text-white" />}
                label="Total Members"
                value={overviewLoading ? "..." : (totalMembers ?? "--")}
              />
              <StatCard
                icon={<Users className="w-5 h-5 text-white" />}
                label="Volunteers"
                value={overviewLoading ? "..." : (volunteers ?? "--")}
              />
              <StatCard
                icon={<FileText className="w-5 h-5 text-white" />}
                label="Registered Members"
                value={overviewLoading ? "..." : (membersCount ?? "--")}
              />
              <StatCard
                icon={<MessageSquare className="w-5 h-5 text-white" />}
                label="Help Requests"
                value={overviewLoading ? "..." : (requestsCount ?? "--")}
              />
              <StatCard
                icon={<Clock className="w-5 h-5 text-white" />}
                label="Pending Approvals"
                value={pendingCount ?? "--"}
              />
              <StatCard
                icon={<Crown className="w-5 h-5 text-white" />}
                label="President"
                value={membersLoading ? "..." : presidentName}
              />
              <StatCard
                icon={<Wallet className="w-5 h-5 text-white" />}
                label="Treasurer"
                value={membersLoading ? "..." : treasurerName}
              />
            </div>
          </TabsContent>

          {/* Members */}
          <TabsContent value="members">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" /> Registered Members
                  {members && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {members.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {membersLoading ? (
                  <div
                    className="py-12 flex justify-center"
                    data-ocid="admin.loading_state"
                  >
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : !members || members.length === 0 ? (
                  <div
                    className="py-12 text-center"
                    data-ocid="admin.empty_state"
                  >
                    <Users className="w-10 h-10 text-primary/30 mx-auto mb-3" />
                    <p className="text-foreground/60 text-sm">
                      No members registered yet
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden border border-border">
                    <Table data-ocid="admin.table">
                      <TableHeader>
                        <TableRow className="bg-pink-pale/50">
                          <TableHead className="font-semibold text-foreground/70">
                            #
                          </TableHead>
                          <TableHead className="font-semibold text-foreground/70">
                            Name
                          </TableHead>
                          <TableHead className="font-semibold text-foreground/70">
                            Phone
                          </TableHead>
                          <TableHead className="font-semibold text-foreground/70">
                            Role
                          </TableHead>
                          <TableHead className="font-semibold text-foreground/70">
                            Registered
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {members.map(([_principal, profile], i) => (
                          <TableRow
                            key={profile.phoneNumber || profile.name}
                            className="hover:bg-pink-pale/20"
                            data-ocid={`admin.row.item.${i + 1}`}
                          >
                            <TableCell className="text-foreground/40 text-sm">
                              {i + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {profile.name}
                            </TableCell>
                            <TableCell className="text-sm text-foreground/70">
                              {profile.phoneNumber}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className={`text-xs capitalize ${
                                  profile.role === "volunteer"
                                    ? "bg-pink-pale text-primary"
                                    : profile.role === "counselor"
                                      ? "bg-secondary text-secondary-foreground"
                                      : profile.role === "president"
                                        ? "bg-amber-100 text-amber-800"
                                        : profile.role === "treasurer"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {profile.role}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-foreground/60">
                              {new Date(
                                Number(profile.registrationDate) / 1_000_000,
                              ).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Registrations */}
          <TabsContent value="pending">
            <PendingRegistrationsTab />
          </TabsContent>

          {/* Help Requests */}
          <TabsContent value="requests">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" /> Help
                  Requests
                  {helpRequests && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {helpRequests.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {requestsLoading ? (
                  <div
                    className="py-12 flex justify-center"
                    data-ocid="admin.loading_state"
                  >
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : !helpRequests || helpRequests.length === 0 ? (
                  <div
                    className="py-12 text-center"
                    data-ocid="admin.empty_state"
                  >
                    <MessageSquare className="w-10 h-10 text-primary/30 mx-auto mb-3" />
                    <p className="text-foreground/60 text-sm">
                      No help requests submitted yet
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden border border-border">
                    <Table data-ocid="admin.table">
                      <TableHeader>
                        <TableRow className="bg-pink-pale/50">
                          <TableHead className="font-semibold text-foreground/70">
                            #
                          </TableHead>
                          <TableHead className="font-semibold text-foreground/70">
                            Name
                          </TableHead>
                          <TableHead className="font-semibold text-foreground/70">
                            Phone
                          </TableHead>
                          <TableHead className="font-semibold text-foreground/70">
                            Message
                          </TableHead>
                          <TableHead className="font-semibold text-foreground/70">
                            Submitted
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {helpRequests.map((req, i) => (
                          <TableRow
                            key={Number(req.id)}
                            className="hover:bg-pink-pale/20"
                            data-ocid={`admin.row.item.${i + 1}`}
                          >
                            <TableCell className="text-foreground/40 text-sm">
                              {i + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {req.name}
                            </TableCell>
                            <TableCell className="text-sm text-foreground/70">
                              {req.phone}
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <ExpandableMessage message={req.message} />
                            </TableCell>
                            <TableCell className="text-sm text-foreground/60">
                              {new Date(
                                Number(req.submittedAt) / 1_000_000,
                              ).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true",
  );

  if (!authenticated) {
    return <LoginGate onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <DashboardContent
      onLogout={() => {
        localStorage.removeItem(STORAGE_KEY);
        setAuthenticated(false);
      }}
    />
  );
}

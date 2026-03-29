import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, ExternalLink, QrCode, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInView } from "../hooks/useInView";
import {
  useGetQRCodeData,
  useIsCallerAdmin,
  useSetQRCodeData,
} from "../hooks/useQueries";
import { useQRScanner } from "../qr-code/useQRScanner";

// QR code image using Google Charts API (client-side, free)
function QRImage({ data, size = 200 }: { data: string; size?: number }) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=${size}x${size}&color=8B0050&bgcolor=FFF0F5&margin=10`;
  return (
    <img
      src={url}
      alt="QR Code"
      width={size}
      height={size}
      className="rounded-xl border-2 border-pink-light shadow-pink"
    />
  );
}

export default function QRCodeSection() {
  const { ref, inView } = useInView();
  const { data: qrData } = useGetQRCodeData();
  const { data: isAdmin } = useIsCallerAdmin();
  const setQRMutation = useSetQRCodeData();
  const [showScanner, setShowScanner] = useState(false);
  const [adminUrl, setAdminUrl] = useState("");
  const [adminDesc, setAdminDesc] = useState("");

  const defaultQRData = qrData?.url || "tel:1091";
  const defaultDesc =
    qrData?.description ||
    "Call 1091 — National Domestic Violence Helpline (Free & Confidential)";

  const scanner = useQRScanner({ facingMode: "environment" });

  const handleSaveQR = async () => {
    if (!adminUrl.trim()) return;
    await setQRMutation.mutateAsync({ url: adminUrl, description: adminDesc });
    toast.success("QR code updated!");
    setAdminUrl("");
    setAdminDesc("");
  };

  return (
    <section id="qrcode" className="py-20 lg:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3 px-3 py-1 bg-pink-pale rounded-full">
            Quick Access
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Scan to Get
            <span className="text-gradient-pink"> Immediate Help</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Scan this QR code with your phone to instantly connect with the
            National Domestic Violence Helpline.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* QR Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-5"
          >
            <div className="bg-pink-pale rounded-3xl p-8 shadow-pink text-center">
              <QRImage data={defaultQRData} size={220} />
              <p className="mt-4 text-sm font-semibold text-primary">
                📞 Helpline: 1091
              </p>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                {defaultDesc}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-pink-pale rounded-full"
                onClick={() => setShowScanner(!showScanner)}
                data-ocid="qrcode.toggle"
              >
                <Camera className="w-4 h-4 mr-2" />
                {showScanner ? "Hide" : "Scan QR"}
              </Button>
              <Button
                asChild
                className="bg-pink-gradient text-white rounded-full shadow-pink"
                data-ocid="qrcode.primary_button"
              >
                <a
                  href={defaultQRData}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Link
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right side: scanner or info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {showScanner ? (
              <div className="bg-pink-pale rounded-2xl p-6">
                <h3 className="font-semibold mb-3 text-center">
                  📷 QR Scanner
                </h3>
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                  <video
                    ref={scanner.videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                  />
                  <canvas ref={scanner.canvasRef} className="hidden" />
                </div>
                {scanner.error && (
                  <p className="text-destructive text-sm mt-2">
                    {scanner.error.message}
                  </p>
                )}
                {scanner.qrResults.length > 0 && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-primary/30">
                    <p className="text-xs font-semibold text-primary mb-1">
                      Scanned Result:
                    </p>
                    <p className="text-sm break-all">
                      {scanner.qrResults[0].data}
                    </p>
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={
                      scanner.isScanning
                        ? scanner.stopScanning
                        : scanner.startScanning
                    }
                    disabled={!scanner.canStartScanning && !scanner.isScanning}
                    className="flex-1 bg-pink-gradient text-white rounded-full"
                    data-ocid="qrcode.secondary_button"
                  >
                    {scanner.isScanning ? "Stop" : "Start Scanning"}
                  </Button>
                  {scanner.qrResults.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={scanner.clearResults}
                      className="rounded-full"
                      data-ocid="qrcode.cancel_button"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="bg-pink-pale rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <QrCode className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">
                        How to Use This QR Code
                      </h3>
                      <ol className="text-sm text-muted-foreground space-y-1.5 list-decimal list-inside">
                        <li>Open your phone's camera or QR scanner app</li>
                        <li>Point it at the QR code</li>
                        <li>Tap the notification that appears</li>
                        <li>You'll be connected to the helpline instantly</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-border rounded-2xl p-6">
                  <h3 className="font-semibold mb-1">Need Help Right Now?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    The National Domestic Violence Helpline 1091 is free,
                    confidential, and available 24/7.
                  </p>
                  <a
                    href="tel:1091"
                    className="inline-flex items-center gap-2 bg-pink-gradient text-white font-bold rounded-full px-5 py-2.5 shadow-pink hover:opacity-90 transition-opacity"
                  >
                    📞 Call 1091 Now
                  </a>
                </div>

                {isAdmin && (
                  <div className="bg-white border border-primary/30 rounded-2xl p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" /> Update QR Code (Admin)
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="qr-url" className="text-xs">
                          URL / Phone Number
                        </Label>
                        <Input
                          id="qr-url"
                          value={adminUrl}
                          onChange={(e) => setAdminUrl(e.target.value)}
                          placeholder="tel:1091 or https://..."
                          className="mt-1"
                          data-ocid="qrcode.input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="qr-desc" className="text-xs">
                          Description
                        </Label>
                        <Input
                          id="qr-desc"
                          value={adminDesc}
                          onChange={(e) => setAdminDesc(e.target.value)}
                          placeholder="QR code description"
                          className="mt-1"
                          data-ocid="qrcode.textarea"
                        />
                      </div>
                      <Button
                        onClick={handleSaveQR}
                        disabled={setQRMutation.isPending || !adminUrl}
                        className="w-full bg-pink-gradient text-white rounded-full"
                        data-ocid="qrcode.save_button"
                      >
                        {setQRMutation.isPending
                          ? "Saving..."
                          : "Update QR Code"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

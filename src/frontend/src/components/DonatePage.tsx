import { Heart, QrCode } from "lucide-react";
import { motion } from "motion/react";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-pink-gradient py-16 text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">
            Support Our Mission
          </h1>
          <p className="text-white/85 text-lg max-w-xl mx-auto">
            Your donation helps us empower survivors, provide counseling, and
            spread awareness across India.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Donation QR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-3xl shadow-soft border border-border p-10 text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-pink-pale rounded-2xl flex items-center justify-center">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">
            Scan to Donate
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Use any UPI app — GPay, PhonePe, Paytm, or your bank app — to scan
            and donate directly.
          </p>

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <div
              className="rounded-2xl overflow-hidden border-2 border-pink-200 bg-white p-2"
              style={{ width: "220px", height: "220px" }}
            >
              <img
                src="/assets/uploads/whatsapp_image_2026-03-29_at_5.12.13_pm-019d397e-5b05-7188-8bee-aa8000aac93c-2.jpeg"
                alt="Donation QR Code - Scan to pay"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm font-medium text-foreground mt-3">
              UPI ID: kissikanha6@okicici
            </p>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            All donations go directly toward survivor support programs.
          </p>
        </motion.div>

        {/* Impact cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="font-display text-xl font-bold text-center mb-6">
            Your Donation Makes a Difference
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                amount: "₹500",
                impact: "Provides emergency counseling for one survivor",
                emoji: "💬",
              },
              {
                amount: "₹1,000",
                impact: "Funds legal aid consultation for one case",
                emoji: "⚖️",
              },
              {
                amount: "₹5,000",
                impact: "Supports a month of rehabilitation program",
                emoji: "🌸",
              },
            ].map((item) => (
              <div
                key={item.amount}
                className="bg-pink-pale rounded-2xl p-5 text-center border border-border"
              >
                <span className="text-3xl">{item.emoji}</span>
                <p className="font-bold text-primary text-xl mt-2">
                  {item.amount}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.impact}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-10">
          <a
            href="/"
            className="text-sm text-primary font-medium hover:underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

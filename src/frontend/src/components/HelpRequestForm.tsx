import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInView } from "../hooks/useInView";
import { useSubmitHelpRequest } from "../hooks/useQueries";

export default function HelpRequestForm() {
  const { ref, inView } = useInView();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitHelpRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await mutation.mutateAsync({ name, phone, message });
      setSubmitted(true);
      toast.success(
        "Your request has been received. We will contact you soon.",
      );
    } catch {
      toast.error("Failed to submit. Please try again or call 1091.");
    }
  };

  return (
    <section id="help" className="py-20 lg:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3 px-3 py-1 bg-pink-pale rounded-full">
              Need Help?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-4">
              You Are Not Alone.
              <span className="text-gradient-pink block">We Are Here.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Reaching out is the first step toward safety. Fill in the form and
              our trained counselors will contact you confidentially. All
              information is kept strictly private.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-pink-pale rounded-xl p-4">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">In immediate danger?</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Call{" "}
                    <a href="tel:100" className="text-primary font-bold">
                      100 (Police)
                    </a>{" "}
                    or{" "}
                    <a href="tel:1091" className="text-primary font-bold">
                      1091 (Helpline)
                    </a>{" "}
                    immediately.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-pink-pale rounded-xl p-4">
                <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">
                    Confidential & Compassionate
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    All requests are handled with complete privacy and without
                    judgment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <div
                className="bg-pink-pale rounded-2xl p-10 text-center"
                data-ocid="help.success_state"
              >
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-primary mb-2">
                  Request Received
                </h3>
                <p className="text-muted-foreground mb-5">
                  Thank you for reaching out. A counselor will contact you
                  within 24 hours. If this is urgent, please call 1091 now.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setPhone("");
                    setMessage("");
                  }}
                  variant="outline"
                  className="border-primary text-primary hover:bg-pink-pale rounded-full"
                  data-ocid="help.secondary_button"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-pink-pale rounded-2xl p-8 shadow-soft space-y-5"
                data-ocid="help.panel"
              >
                <div>
                  <Label htmlFor="help-name" className="text-sm font-medium">
                    Your Name
                  </Label>
                  <Input
                    id="help-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-1.5 bg-white border-border"
                    required
                    data-ocid="help.input"
                  />
                </div>
                <div>
                  <Label htmlFor="help-phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="help-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="mt-1.5 bg-white border-border"
                    required
                    data-ocid="help.input"
                  />
                </div>
                <div>
                  <Label htmlFor="help-message" className="text-sm font-medium">
                    Tell Us What You Need
                  </Label>
                  <Textarea
                    id="help-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your situation or what kind of help you need..."
                    className="mt-1.5 bg-white border-border min-h-[100px]"
                    required
                    data-ocid="help.textarea"
                  />
                </div>
                {mutation.isError && (
                  <p
                    className="text-destructive text-sm"
                    data-ocid="help.error_state"
                  >
                    Failed to submit. Please try again or call 1091.
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-pink-gradient text-white font-semibold rounded-full py-3 shadow-pink hover:opacity-90"
                  data-ocid="help.submit_button"
                >
                  {mutation.isPending ? "Sending..." : "Send Help Request"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree that your information will be used
                  solely for providing support.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

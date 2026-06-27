"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Building2,
  Mail,
  BookOpen,
  CheckCircle2,
  Loader2,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const dashboardStyles = `
.db-section-card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition:
    border-color .45s var(--ease-smooth),
    box-shadow .45s var(--ease-smooth);
}

.db-section-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 1.5rem;
  right: 1.5rem;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform .7s cubic-bezier(.22,1,.36,1);
}

.db-section-card:hover {
  border-color: var(--color-primary-border);
  box-shadow: var(--glow-mint-md);
}

.db-section-card:hover::before {
  transform: scaleX(1);
}

.db-input {
  width: 100%;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-base-alt);
  padding: 0.75rem 1rem 0.75rem 2.875rem;
  font-size: 0.9375rem;
  color: var(--color-ink);
  outline: none;
  transition:
    border-color .25s var(--ease-smooth),
    box-shadow .25s var(--ease-smooth),
    background .25s var(--ease-smooth);
  font-family: var(--font-body);
}

.db-input::placeholder {
  color: var(--color-ink-placeholder);
}

.db-input:hover {
  border-color: var(--color-ink-placeholder);
  background: var(--color-surface);
}

.db-input:focus {
  border-color: var(--color-primary);
  background: var(--color-surface);
  box-shadow: 0 0 0 3px rgb(15 139 108 / 0.1);
}

.db-textarea {
  width: 100%;
  min-height: 220px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-base-alt);
  padding: 0.875rem 1rem;
  font-size: 0.9375rem;
  color: var(--color-ink);
  outline: none;
  resize: vertical;
  line-height: 1.7;
  transition:
    border-color .25s var(--ease-smooth),
    box-shadow .25s var(--ease-smooth),
    background .25s var(--ease-smooth);
  font-family: var(--font-body);
}

.db-textarea::placeholder {
  color: var(--color-ink-placeholder);
}

.db-textarea:hover {
  border-color: var(--color-ink-placeholder);
  background: var(--color-surface);
}

.db-textarea:focus {
  border-color: var(--color-primary);
  background: var(--color-surface);
  box-shadow: 0 0 0 3px rgb(15 139 108 / 0.1);
}

.db-input-wrap {
  position: relative;
}

.db-input-icon {
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-ink-muted);
  pointer-events: none;
  transition: color .25s var(--ease-smooth);
}

.db-input-wrap:focus-within .db-input-icon {
  color: var(--color-primary);
}

.db-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-ink-secondary);
  margin-bottom: 0.5rem;
}

.db-section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: linear-gradient(155deg, var(--color-primary-subtle), var(--color-primary-tint));
  color: var(--color-primary);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.6);
  flex-shrink: 0;
  transition:
    background .45s var(--ease-smooth),
    color .45s var(--ease-smooth),
    transform .45s var(--ease-smooth);
}

.db-section-card:hover .db-section-icon {
  background: linear-gradient(155deg, var(--color-primary), var(--color-primary-hover));
  color: #ffffff;
  transform: rotate(-6deg) scale(1.08);
}

.db-saved-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: var(--radius-full);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-primary);
}
`;

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.0, delay, ease: easeOut },
  }),
};

export default function DashboardClient({ ownerId }: { ownerId: string }) {
  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!ownerId) return;
    const fetchDetails = async () => {
      try {
        const result = await axios.post("/api/settings/get", { ownerId });
        setBusinessName(result.data.businessName ?? "");
        setSupportEmail(result.data.supportEmail ?? "");
        setKnowledge(result.data.knowledge ?? "");
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, [ownerId]);

  const handleSettings = async () => {
    setLoading(true);
    try {
      await axios.post("/api/settings", {
        ownerId,
        businessName,
        supportEmail,
        knowledge,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />

      <main className="min-h-screen bg-[var(--color-base)] px-4 pb-20 pt-4 sm:px-6">
        <div className="mx-auto max-w-[740px]">

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
            className="mb-6"
          >
            <h1 className="font-[var(--font-display)] text-[clamp(1.6rem,3vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)]">
              Chatbot{" "}
              <span className="italic text-[var(--color-primary)]">Settings</span>
            </h1>
            <p className="mt-2 text-[1rem] leading-relaxed text-[var(--color-ink-tertiary)]">
              Manage your AI chatbot knowledge and business details.
            </p>
          </motion.div>

          <div className="flex flex-col gap-5">

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0.12}
              className="db-section-card"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="db-section-icon">
                  <Building2 size={18} strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                    Business Details
                  </h2>
                  <p className="mt-0.5 text-[0.8125rem] text-[var(--color-ink-tertiary)]">
                    Basic info shown to customers during support
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="db-label">Business Name</label>
                  <div className="db-input-wrap">
                    <Building2 size={15} strokeWidth={2} className="db-input-icon" />
                    <input
                      type="text"
                      className="db-input"
                      placeholder="e.g. Acme Store"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="db-label">Support Email</label>
                  <div className="db-input-wrap">
                    <Mail size={15} strokeWidth={2} className="db-input-icon" />
                    <input
                      type="email"
                      className="db-input"
                      placeholder="e.g. support@acme.com"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0.24}
              className="db-section-card"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="db-section-icon">
                  <BookOpen size={18} strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                    Knowledge Base
                  </h2>
                  <p className="mt-0.5 text-[0.8125rem] text-[var(--color-ink-tertiary)]">
                    Add FAQs, policies, delivery info, refunds and more
                  </p>
                </div>
              </div>

              <textarea
                className="db-textarea"
                placeholder={`Example:\n• Refund policy: 7 days return available\n• Delivery time: 3–5 working days\n• Cash on Delivery available\n• Support hours: Mon–Fri, 9am–6pm`}
                value={knowledge}
                onChange={(e) => setKnowledge(e.target.value)}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0.36}
              className="flex items-center gap-4 pt-2"
            >
              <Button
                variant="primary"
                size="lg"
                loading={loading}
                leftIcon={!loading ? <Save size={16} strokeWidth={2} /> : undefined}
                onClick={handleSettings}
              >
                {loading ? "Saving..." : "Save Settings"}
              </Button>

              {saved && (
                <motion.span
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="db-saved-badge"
                >
                  <CheckCircle2 size={14} strokeWidth={2} />
                  Settings saved
                </motion.span>
              )}
            </motion.div>

          </div>
        </div>
      </main>
    </>
  );
}
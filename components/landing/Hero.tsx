"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M3 7.5H12M8.5 4L12 7.5L8.5 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlayIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M3 2.5L10.5 6.5L3 10.5V2.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const StarFill = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 1L7.5 4.5H11L8.2 6.8L9.2 10.5L6 8.5L2.8 10.5L3.8 6.8L1 4.5H4.5L6 1Z" fill="#F59E0B" />
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M2.5 6.5L5 9L10.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1V3M7 11V13M1 7H3M11 7H13M2.93 2.93L4.34 4.34M9.66 9.66L11.07 11.07M11.07 2.93L9.66 4.34M4.34 9.66L2.93 11.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="7" cy="7" r="2.2" fill="currentColor" opacity="0.25"/>
    <circle cx="7" cy="7" r="1.1" fill="currentColor"/>
  </svg>
);

const tickerItems = [
  "Resolve tickets in seconds",
  "Zero training required",
  "Deploy in 5 minutes",
  "99.9% uptime SLA",
  "SOC 2 certified",
  "Works in 47 languages",
];

const trustAvatars = [
  { initials: "AK", color: "#6366F1" },
  { initials: "SR", color: "#EC4899" },
  { initials: "TM", color: "#14B8A6" },
  { initials: "JL", color: "#F59E0B" },
  { initials: "PD", color: "#8B5CF6" },
];

const chatMessages = [
  { from: "user", text: "My order hasn't arrived yet, it's been 2 weeks", delay: 0 },
  { from: "bot", text: "I found your order #4821. It's delayed at customs — estimated delivery is tomorrow by 6 PM. Want me to send you live tracking?", delay: 0.9 },
  { from: "user", text: "Yes please!", delay: 1.8 },
  { from: "bot", text: "Done! Tracking link sent to your email ✓", delay: 2.5 },
];

const stats = [
  { value: "80%", label: "tickets auto-resolved" },
  { value: "3.2s", label: "avg. response time" },
  { value: "4.9★", label: "customer rating" },
];

function FloatingOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(60px)",
        pointerEvents: "none",
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.35, 0.55, 0.35],
        x: [0, 20, 0],
        y: [0, -15, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function ChatWidget() {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    chatMessages.forEach((msg, i) => {
      if (msg.from === "bot" && i > 0) {
        timers.push(setTimeout(() => setIsTyping(true), msg.delay * 1000 - 600));
        timers.push(setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages(i + 1);
        }, msg.delay * 1000));
      } else {
        timers.push(setTimeout(() => setVisibleMessages(i + 1), msg.delay * 1000));
      }
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 32px 64px -12px rgb(0 0 0 / 0.14), 0 8px 24px -4px rgb(0 0 0 / 0.06), 0 0 0 1px rgb(0 0 0 / 0.02)",
      width: "100%",
      maxWidth: "380px",
    }}>
      <div style={{
        padding: "14px 16px",
        borderBottom: "1px solid var(--color-border-subtle)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "var(--color-surface-raised)",
      }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "10px",
          background: "var(--color-primary)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="5" width="12" height="9" rx="2.5" stroke="white" strokeWidth="1.4" />
            <path d="M8 2V5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="5.5" cy="9" r="0.9" fill="white" />
            <circle cx="10.5" cy="9" r="0.9" fill="white" />
            <path d="M6 11.5C6 11.5 6.8 12.5 8 12.5C9.2 12.5 10 11.5 10 11.5" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-ink)", letterSpacing: "-0.01em" }}>SupportMint AI</div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-online)" }} />
            <span style={{ fontSize: "0.72rem", color: "var(--color-ink-tertiary)", fontFamily: "var(--font-body)" }}>Online · Typically replies instantly</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px", minHeight: "240px" }}>
        <AnimatePresence>
          {chatMessages.slice(0, visibleMessages).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
              style={{
                display: "flex",
                justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div style={{
                maxWidth: "84%",
                padding: "9px 13px",
                borderRadius: msg.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: msg.from === "user" ? "var(--color-primary)" : "var(--color-base-alt)",
                color: msg.from === "user" ? "#fff" : "var(--color-ink)",
                fontSize: "0.82rem",
                lineHeight: 1.5,
                fontFamily: "var(--font-body)",
                boxShadow: msg.from === "user"
                  ? "0 2px 8px rgb(37 99 235 / 0.25)"
                  : "0 1px 3px rgb(0 0 0 / 0.05)",
              }}>
                {msg.text}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <div style={{
                padding: "10px 14px",
                borderRadius: "14px 14px 14px 4px",
                background: "var(--color-base-alt)",
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}>
                {[0, 0.16, 0.32].map((d, i) => (
                  <motion.div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-ink-muted)" }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, delay: d, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{
        padding: "12px 14px",
        borderTop: "1px solid var(--color-border-subtle)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "var(--color-surface-raised)",
      }}>
        <div style={{
          flex: 1,
          background: "var(--color-base)",
          border: "1px solid var(--color-border)",
          borderRadius: "10px",
          padding: "8px 12px",
          fontSize: "0.8rem",
          color: "var(--color-ink-placeholder)",
          fontFamily: "var(--font-body)",
        }}>
          Ask anything...
        </div>
        <div style={{
          width: "32px", height: "32px", borderRadius: "9px",
          background: "var(--color-primary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M8 3L12 7L8 11" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const}}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "14px",
        padding: "16px 20px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgb(0 0 0 / 0.04)",
        cursor: "default",
        flex: 1,
      }}
    >
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-ink)",
        letterSpacing: "-0.03em",
        lineHeight: 1,
        marginBottom: "4px",
      }}>
        {value}
      </div>
      <div style={{
        fontSize: "0.76rem",
        color: "var(--color-ink-tertiary)",
        fontFamily: "var(--font-body)",
        letterSpacing: "0.01em",
      }}>
        {label}
      </div>
    </motion.div>
  );
}

function MagneticButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: "inline-flex" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}

function Ticker() {
  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "60px",
        background: "linear-gradient(to right, var(--color-base), transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "60px",
        background: "linear-gradient(to left, var(--color-base), transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />
      <motion.div
        style={{ display: "flex", gap: "0", width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "0 28px",
            whiteSpace: "nowrap",
          }}>
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-primary)", opacity: 0.5, flexShrink: 0 }} />
            <span style={{
              fontSize: "0.8rem",
              color: "var(--color-ink-tertiary)",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "0.01em",
            }}>
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const heroStyles = `
  .hero-section {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120px 24px 80px;
    position: relative;
    overflow: hidden;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    max-width: 1160px;
    width: 100%;
    margin: 0 auto;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 12px 6px 8px;
    background: var(--color-primary-subtle);
    border: 1px solid var(--color-primary-border);
    border-radius: 999px;
    cursor: default;
    width: fit-content;
    margin-bottom: 28px;
  }

  .hero-badge-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }

  .hero-badge-text {
    font-family: var(--font-display);
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--color-primary);
    letter-spacing: 0.01em;
  }

  .hero-heading {
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 4.5vw, 4rem);
    font-weight: 800;
    color: var(--color-ink);
    letter-spacing: -0.04em;
    line-height: 1.06;
    margin-bottom: 22px;
  }

  .hero-heading-accent {
    position: relative;
    display: inline-block;
    color: var(--color-primary);
  }

  .hero-heading-underline {
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--color-primary) 0%, #60A5FA 100%);
  }

  .hero-subheading {
    font-family: var(--font-body);
    font-size: clamp(1rem, 1.5vw, 1.125rem);
    color: var(--color-ink-tertiary);
    line-height: 1.7;
    margin-bottom: 36px;
    max-width: 480px;
  }

  .hero-ctas {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .hero-trust {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .hero-avatars {
    display: flex;
  }

  .hero-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid var(--color-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 0.65rem;
    font-weight: 700;
    color: white;
    margin-left: -8px;
    flex-shrink: 0;
  }

  .hero-avatars .hero-avatar:first-child { margin-left: 0; }

  .hero-trust-text {
    font-family: var(--font-body);
    font-size: 0.8rem;
    color: var(--color-ink-tertiary);
    line-height: 1.4;
  }

  .hero-trust-stars {
    display: flex;
    align-items: center;
    gap: 2px;
    margin-bottom: 2px;
  }

  .hero-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: relative;
  }

  .hero-stats {
    display: flex;
    gap: 10px;
    width: 100%;
    max-width: 380px;
  }

  .hero-ticker {
    width: 100%;
    max-width: 1160px;
    margin: 60px auto 0;
    padding: 16px 0;
    border-top: 1px solid var(--color-border-subtle);
    border-bottom: 1px solid var(--color-border-subtle);
  }

  .hero-perks {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 36px;
  }

  .hero-perk {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: var(--color-ink-secondary);
  }

  .hero-perk-icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--color-success-subtle);
    border: 1px solid var(--color-success-border);
    color: var(--color-success);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .hero-glow {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(80px);
  }

  @media (max-width: 900px) {
    .hero-section {
      padding: 100px 20px 60px;
    }
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 48px;
      text-align: center;
    }
    .hero-badge {
      margin-left: auto;
      margin-right: auto;
    }
    .hero-subheading {
      margin-left: auto;
      margin-right: auto;
    }
    .hero-ctas {
      justify-content: center;
    }
    .hero-trust {
      justify-content: center;
    }
    .hero-right {
      order: -1;
    }
    .hero-perks {
      align-items: flex-start;
      display: inline-flex;
      text-align: left;
    }
  }

  @media (max-width: 480px) {
    .hero-heading {
      font-size: 2.2rem;
    }
    .hero-ctas {
      flex-direction: column;
      align-items: stretch;
    }
    .hero-ctas > * {
      width: 100%;
    }
    .hero-stats {
      flex-direction: column;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const} },
};

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(springY, [-300, 300], [6, -6]);
  const rotateY = useTransform(springX, [-300, 300], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: heroStyles }} />

      <section className="hero-section" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <FloatingOrb x="-5%" y="10%" size={420} color="rgb(37 99 235 / 0.08)" delay={0} />
        <FloatingOrb x="60%" y="-10%" size={360} color="rgb(99 102 241 / 0.07)" delay={2} />
        <FloatingOrb x="80%" y="60%" size={300} color="rgb(20 184 166 / 0.06)" delay={4} />

        <div className="hero-grid">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="hero-badge">
              <div className="hero-badge-dot">
                <SparkleIcon />
              </div>
              <span className="hero-badge-text">AI-powered support, live in 5 minutes</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="hero-heading">
              Your customers
              <br />
              deserve answers
              <br />
              <span className="hero-heading-accent">
                right now
                <motion.div
                  className="hero-heading-underline"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-subheading">
              SupportMint drops an AI agent into your product that resolves tickets instantly — no scripts, no wait times, no burned-out support team. Embed it in minutes.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-perks">
              {["No credit card required", "14-day free trial", "Cancel anytime"].map((perk) => (
                <div key={perk} className="hero-perk">
                  <div className="hero-perk-icon">
                    <CheckIcon />
                  </div>
                  {perk}
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="hero-ctas">
              <MagneticButton variant="primary" size="lg" rightIcon={<ArrowRight />}>
                Start for free
              </MagneticButton>
              <MagneticButton variant="ghost" size="lg" leftIcon={<PlayIcon />}>
                Watch demo
              </MagneticButton>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-trust">
              <div className="hero-avatars">
                {trustAvatars.map((a) => (
                  <div key={a.initials} className="hero-avatar" style={{ background: a.color }}>
                    {a.initials}
                  </div>
                ))}
              </div>
              <div className="hero-trust-text">
                <div className="hero-trust-stars">
                  {Array(5).fill(0).map((_, i) => <StarFill key={i} />)}
                </div>
                <span>Trusted by <strong>2,400+</strong> teams worldwide</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="hero-right">
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ rotateX, rotateY, transformPerspective: 1000, width: "100%", display: "flex", justifyContent: "center" }}
            >
              <ChatWidget />
            </motion.div>

            <div className="hero-stats">
              {stats.map((s, i) => (
                <StatCard key={s.label} value={s.value} label={s.label} delay={0.5 + i * 0.1} />
              ))}
            </div>
          </div>
        </div>

        <div className="hero-ticker">
          <Ticker />
        </div>
      </section>
    </>
  );
}

export default HeroSection;
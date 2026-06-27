"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

const heroStyles = `
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
}

.hero-glow {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1100px;
  height: 680px;
  transform: translate(-50%, -42%);
  background: radial-gradient(ellipse at center, rgb(15 139 108 / 0.1), transparent 68%);
  pointer-events: none;
  z-index: -1;
}

.hero-badge-dot {
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-online);
  flex-shrink: 0;
}

.hero-badge-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--color-online);
  animation: pulse-ring 2s var(--ease-in-out) infinite;
}

.hero-preview-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 1.625rem;
  box-shadow: var(--shadow-xl);
  transition: box-shadow 0.4s var(--ease-smooth);
}

.hero-preview-card:hover {
  box-shadow: var(--glow-mint-lg);
}

.hero-bubble {
  text-align: left;
  font-size: 0.875rem;
  line-height: 1.55;
  border-radius: var(--radius-lg);
  padding: 0.6875rem 1rem;
  transition: transform 0.25s var(--ease-smooth);
  width: fit-content;
}

.hero-bubble:hover {
  transform: translateX(2px);
}

.hero-bubble-user {
  background: var(--color-base-alt);
  color: var(--color-ink-secondary);
  border-top-left-radius: var(--radius-xs);
  max-width: 80%;
}

.hero-bubble-ai {
  background: var(--color-primary-subtle);
  color: var(--color-primary-active);
  border-top-right-radius: var(--radius-xs);
  margin-left: auto;
  max-width: 85%;
}

.hero-bubble-ai:hover {
  transform: translateX(-2px);
}

.hero-typing {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: var(--color-primary-subtle);
  border-radius: var(--radius-lg);
  border-top-right-radius: var(--radius-xs);
  padding: 0.6875rem 0.875rem;
  margin-left: auto;
  width: fit-content;
}

.hero-typing-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-primary);
  opacity: 0.4;
  animation: typing-bounce 1.1s ease-in-out infinite;
}

.hero-typing-dot:nth-child(2) { animation-delay: 0.15s; }
.hero-typing-dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes typing-bounce {
  0%, 60%, 100% { opacity: 0.4; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-2px); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-badge-dot::after,
  .hero-typing-dot {
    animation: none !important;
  }
}
`;

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.96,
    filter: "blur(10px)",
  },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.25,
      delay,
      ease: easeOut,
    },
  }),
};

export function Hero() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 3);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: heroStyles }} />
      <section id="hero" className="hero-section min-h-[90vh] px-6 py-12">
        <div className="hero-glow" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex w-full max-w-[820px] flex-col items-center text-center">
          <motion.span
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[0.8125rem] font-medium text-[var(--color-ink-secondary)] shadow-[var(--shadow-sm)]"
          >
            <span className="hero-badge-dot" aria-hidden="true" />
            Now answering in 47 languages
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.25}
            className="mt-6 text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1.12] tracking-[-0.022em] text-ink"
          >
            Support that feels{" "}
            <span className="italic text-[var(--color-primary)]">human</span>,
            <br />
            powered by AI
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.55}
            className="mt-4 max-w-[520px] text-[1.1rem] leading-relaxed text-[var(--color-ink-tertiary)]"
          >
            SupportMint resolves customer questions instantly, around the
            clock, in your brand voice, without making people wait for a
            human to wake up.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.85}
            className="mt-4"
          >
            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
              Start free trial
            </Button>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1.05}
            className="mt-4 text-[0.8125rem] text-[var(--color-ink-muted)]"
          >
            No credit card required &middot; Setup in 5 minutes
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.9,
              rotateX: 10,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
              transition: {
                opacity: {
                  duration: 1.6,
                  delay: 1.2,
                  ease: easeOut,
                },
                scale: {
                  duration: 1.6,
                  delay: 1.2,
                  ease: easeOut,
                },
                rotateX: {
                  duration: 1.6,
                  delay: 1.2,
                  ease: easeOut,
                },
                filter: {
                  duration: 1.6,
                  delay: 1.2,
                },
              },
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: {
                duration: 0.35,
              },
            }}
            className="mt-8 w-full max-w-[440px]"
          >
            <div className="hero-preview-card">
              <div className="mb-4 flex items-center gap-3 border-b border-[var(--color-border-subtle)] pb-3.5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)]">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 4.5C2 3.119 3.119 2 4.5 2h7C12.881 2 14 3.119 14 4.5v4c0 1.381-1.119 2.5-2.5 2.5H8.8L5.6 13.6V11H4.5C3.119 11 2 9.881 2 8.5v-4Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--color-ink)]">
                    SupportMint AI
                  </div>
                  <div className="text-xs text-[var(--color-ink-muted)]">
                    Replies instantly
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65, ease: easeOut }}
                className="hero-bubble hero-bubble-user mb-2.5"
              >
                Hey, I never got my refund for order #4521
              </motion.div>

              <div className="min-h-[50px]">
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="typing"
                      initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.9,
                        filter: "blur(6px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                        scale: 0.9,
                        filter: "blur(6px)",
                        transition: {
                          duration: 0.45,
                        },
                      }}
                      transition={{
                        duration: 0.8,
                        ease: easeOut,
                      }}
                      className="hero-typing"
                    >
                      <span className="hero-typing-dot" />
                      <span className="hero-typing-dot" />
                      <span className="hero-typing-dot" />
                    </motion.div>
                  )}

                  {step >= 1 && (
                    <motion.div
                      key="answer"
                      initial={{
                        opacity: 0,
                        y: 35,
                       
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        scale: 0.95,
                        transition: {
                          duration: 0.45,
                        },
                      }}
                      transition={{
                        duration: 1,
                        ease: easeOut,
                      }}
                      className="hero-bubble hero-bubble-ai"
                    >
                      Found it. Your refund of $86.00 was processed and
                      lands in 3&ndash;5 business days.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Hero;
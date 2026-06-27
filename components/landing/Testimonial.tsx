"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Quote,
  Star,
  type LucideIcon,
} from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  initials: string;
  review: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sophia Martinez",
    role: "Online Shopper",
    company: "Verified Customer",
    initials: "SM",
    review:
      "I honestly couldn't tell I was chatting with an AI. My refund question was answered instantly, and I had everything I needed in less than a minute. It saved me so much time.",
  },
  {
    name: "James Walker",
    role: "Returning Customer",
    company: "Verified Customer",
    initials: "JW",
    review:
      "Usually support chats keep me waiting forever, but this experience was completely different. Every answer felt natural, accurate, and available exactly when I needed it.",
  },
  {
    name: "Ava Thompson",
    role: "Small Business Owner",
    company: "Verified Customer",
    initials: "AT",
    review:
      "The chatbot understood my issue immediately and even suggested the exact solution before I finished explaining everything. It genuinely felt like chatting with a real support agent.",
  },
  {
    name: "Ethan Brooks",
    role: "Long-time Customer",
    company: "Verified Customer",
    initials: "EB",
    review:
      "What impressed me most was how fast everything happened. No waiting, no repeating myself, and the answers were actually helpful instead of generic automated responses.",
  },
  {
    name: "Olivia Carter",
    role: "Premium Member",
    company: "Verified Customer",
    initials: "OC",
    review:
      "I contacted support late at night expecting to wait until morning, but SupportMint solved my problem immediately. It's easily one of the best customer support experiences I've had.",
  },
  {
    name: "Noah Patel",
    role: "Verified Customer",
    company: "Verified Customer",
    initials: "NP",
    review:
      "The conversation felt incredibly smooth and personal. It remembered the details I shared and guided me to the solution without making me repeat anything. That's exactly how modern support should work.",
  },
];

const testimonialStyles = `
.testimonial-glow {
  position: absolute;
  top: -140px;
  left: 50%;
  width: 1200px;
  height: 620px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgb(15 139 108 / 0.07), transparent 70%);
  pointer-events: none;
  z-index: -1;
}

.testimonial-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  transition:
    transform .45s var(--ease-smooth),
    box-shadow .45s var(--ease-smooth),
    border-color .45s var(--ease-smooth),
    background .45s var(--ease-smooth);
}

.testimonial-card::before {
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

.testimonial-card:hover {
  transform: translateY(-10px);
  border-color: var(--color-primary-border);
  background: linear-gradient(180deg, white, #fcfffd);
  box-shadow: var(--glow-mint-md);
}

.testimonial-card:hover::before {
  transform: scaleX(1);
}

.testimonial-quote {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  color: var(--color-primary);
  opacity: .08;
  transition: transform .45s var(--ease-smooth), opacity .45s var(--ease-smooth);
}

.testimonial-card:hover .testimonial-quote {
  opacity: .18;
  transform: rotate(-8deg) scale(1.08);
}

.testimonial-stars {
  display: flex;
  align-items: center;
  gap: .22rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  transition: transform .4s var(--ease-smooth);
}

.testimonial-card:hover .testimonial-stars {
  transform: translateX(2px);
}

.testimonial-text {
  flex: 1;
  font-size: .9375rem;
  line-height: 1.75;
  color: var(--color-ink-secondary);
  transition: color .4s var(--ease-smooth);
}

.testimonial-card:hover .testimonial-text {
  color: var(--color-ink);
}

.testimonial-footer {
  display: flex;
  align-items: center;
  gap: .75rem;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border-subtle);
}

.testimonial-avatar {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(155deg, var(--color-primary), var(--color-primary-hover));
  color: white;
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .03em;
  box-shadow: var(--shadow-sm);
  transition: transform .45s var(--ease-smooth), box-shadow .45s var(--ease-smooth);
}

.testimonial-card:hover .testimonial-avatar {
  transform: rotate(-6deg) scale(1.08);
  box-shadow: var(--glow-mint-sm);
}

.testimonial-name {
  font-size: .9375rem;
  font-weight: 600;
  color: var(--color-ink);
  transition: color .4s var(--ease-smooth);
}

.testimonial-card:hover .testimonial-name {
  color: var(--color-primary);
}

.testimonial-role {
  font-size: .8125rem;
  color: var(--color-ink-secondary);
}

.testimonial-company {
  font-size: .8125rem;
  color: var(--color-ink-muted);
}

@media (max-width: 640px) {
  .testimonial-card { padding: 1.25rem; }
  .testimonial-text { font-size: .9rem; }
  .testimonial-glow { width: 700px; height: 420px; }
}
`;

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.1, delay, ease: easeOut },
  }),
};

export function Testimonials() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: testimonialStyles }} />

      <section
        id="testimonials"
        className="relative mx-auto max-w-[1180px] overflow-hidden px-6 py-28"
      >
        <div className="testimonial-glow" aria-hidden />

        <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
          <motion.span
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[0.8125rem] font-medium text-[var(--color-ink-secondary)] shadow-[var(--shadow-sm)]"
          >
            <Sparkles size={13} className="text-[var(--color-primary)]" />
           Trusted by customers worldwide
          </motion.span>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0.18}
            className="mt-6 font-[var(--font-display)] text-[clamp(2rem,4vw,3.75rem)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)]"
          >
            Customer support that people
            <br />
            actually{" "}
            <span className="italic text-[var(--color-primary)]">love</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0.34}
            className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-ink-tertiary)]"
          >
            Thousands of conversations are resolved every day with SupportMint.
            Here's what teams say after making the switch.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={0.2 + index * 0.18}
              className="testimonial-card"
            >
              <Quote size={36} strokeWidth={1.6} className="testimonial-quote" />

              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>

              <p className="testimonial-text">"{testimonial.review}"</p>

              <div className="testimonial-footer">
                <div className="testimonial-avatar">{testimonial.initials}</div>
                <div>
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                  <p className="testimonial-company">{testimonial.company}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.9}
          className="mt-16 flex flex-col items-center"
        >
          <div className="h-px w-full max-w-[500px] bg-[var(--color-border)]" />
          <p className="mt-8 text-center text-[0.9375rem] text-[var(--color-ink-muted)]">
            Trusted by{" "}
            <span className="font-semibold text-[var(--color-ink)]">500+</span>{" "}
            growing companies across{" "}
            <span className="font-semibold text-[var(--color-primary)]">47 countries</span>.
          </p>
        </motion.div>
      </section>
    </>
  );
}

export default Testimonials;
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
    name: "Sarah Chen",
    role: "Head of Support",
    company: "Orbit Commerce",
    initials: "SC",
    review:
      "SupportMint transformed the way we handle customer conversations. First response time dropped from hours to seconds, while our support team finally had time to focus on complex issues instead of answering the same questions all day.",
  },
  {
    name: "Daniel Ross",
    role: "Founder",
    company: "NovaCloud",
    initials: "DR",
    review:
      "The most surprising part wasn't the automation—it was how natural every response felt. Customers genuinely believed they were talking to our own support team, and satisfaction scores increased almost immediately.",
  },
  {
    name: "Emily Parker",
    role: "Customer Experience Director",
    company: "BrightFlow",
    initials: "EP",
    review:
      "Within the first week we automated nearly 70% of incoming conversations. Our agents now spend their time solving meaningful customer problems instead of repetitive tickets.",
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
  background:
    radial-gradient(
      ellipse at center,
      rgb(15 139 108 / 0.07),
      transparent 70%
    );
  pointer-events: none;
  z-index: -1;
}

.testimonial-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 360px;
  overflow: hidden;

  padding: 2rem;

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

.testimonial-card::before{
  content:"";
  position:absolute;
  top:0;
  left:1.5rem;
  right:1.5rem;

  height:2px;

  border-radius:999px;

  background:
    linear-gradient(
      90deg,
      transparent,
      var(--color-primary),
      transparent
    );

  transform:scaleX(0);
  transform-origin:center;

  transition:
    transform .7s cubic-bezier(.22,1,.36,1);
}

.testimonial-card:hover{
  transform:translateY(-10px);

  border-color:var(--color-primary-border);

  background:
    linear-gradient(
      180deg,
      white,
      #fcfffd
    );

  box-shadow:var(--glow-mint-md);
}

.testimonial-card:hover::before{
  transform:scaleX(1);
}

.testimonial-quote{
  position:absolute;
  top:1.6rem;
  right:1.6rem;

  color:var(--color-primary);

  opacity:.08;

  transition:
    transform .45s var(--ease-smooth),
    opacity .45s var(--ease-smooth);
}

.testimonial-card:hover .testimonial-quote{
  opacity:.18;
  transform:
    rotate(-8deg)
    scale(1.08);
}

.testimonial-stars{
  display:flex;
  align-items:center;
  gap:.22rem;

  color:var(--color-primary);

  margin-bottom:1.5rem;

  transition:
    transform .4s var(--ease-smooth);
}

.testimonial-card:hover .testimonial-stars{
  transform:translateX(2px);
}

.testimonial-text{
  flex:1;

  font-size:1rem;

  line-height:1.8;

  color:var(--color-ink-secondary);

  transition:
    color .4s var(--ease-smooth);
}

.testimonial-card:hover .testimonial-text{
  color:var(--color-ink);
}

.testimonial-footer{
  display:flex;
  align-items:center;
  gap:1rem;

  margin-top:2rem;
}

.testimonial-avatar{
  width:54px;
  height:54px;

  flex-shrink:0;

  display:flex;
  align-items:center;
  justify-content:center;

  border-radius:50%;

  background:
    linear-gradient(
      155deg,
      var(--color-primary),
      var(--color-primary-hover)
    );

  color:white;

  font-size:.95rem;
  font-weight:700;
  letter-spacing:.03em;

  box-shadow:var(--shadow-md);

  transition:
    transform .45s var(--ease-smooth),
    box-shadow .45s var(--ease-smooth);
}

.testimonial-card:hover .testimonial-avatar{
  transform:
    rotate(-6deg)
    scale(1.08);

  box-shadow:var(--glow-mint-sm);
}

.testimonial-name{
  font-size:1rem;
  font-weight:600;

  color:var(--color-ink);

  transition:
    color .4s var(--ease-smooth);
}

.testimonial-card:hover .testimonial-name{
  color:var(--color-primary);
}

.testimonial-role{
  margin-top:.2rem;

  font-size:.9rem;

  color:var(--color-ink-secondary);
}

.testimonial-company{
  margin-top:.15rem;

  font-size:.86rem;

  color:var(--color-ink-muted);
}

@media (max-width:1024px){

  .testimonial-card{
    min-height:auto;
  }

}

@media (max-width:640px){

  .testimonial-card{
    padding:1.5rem;
  }

  .testimonial-text{
    font-size:.95rem;
    line-height:1.75;
  }

  .testimonial-avatar{
    width:48px;
    height:48px;
  }

  .testimonial-glow{
    width:700px;
    height:420px;
  }

}
`;
const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      delay,
      ease: easeOut,
    },
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
            <Sparkles
              size={13}
              className="text-[var(--color-primary)]"
            />
            Loved by modern support teams
          </motion.span>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0.18}
            className="mt-6 font-[var(--font-display)] text-[clamp(2.2rem,4vw,3.8rem)] font-medium leading-[1.18] tracking-[-0.025em] text-[var(--color-ink)]"
          >
            Customer support that people
            <br />
            actually <span className="italic text-[var(--color-primary)]">
              love
            </span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0.34}
            className="mt-6 max-w-[620px] text-[1.0625rem] leading-relaxed text-[var(--color-ink-tertiary)]"
          >
            Thousands of conversations are resolved every day with
            SupportMint. Here's what teams say after making the switch.
          </motion.p>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={0.25 + index * 0.18}
              className="testimonial-card"
            >
              <Quote
                size={42}
                strokeWidth={1.6}
                className="testimonial-quote"
              />

              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="testimonial-text">
                “{testimonial.review}”
              </p>

              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  {testimonial.initials}
                </div>

                <div>
                  <h4 className="testimonial-name">
                    {testimonial.name}
                  </h4>

                  <p className="testimonial-role">
                    {testimonial.role}
                  </p>

                  <p className="testimonial-company">
                    {testimonial.company}
                  </p>
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
          className="mt-20 flex flex-col items-center"
        >
          <div className="h-px w-full max-w-[500px] bg-[var(--color-border)]" />

          <p className="mt-8 text-center text-[0.95rem] text-[var(--color-ink-muted)]">
            Trusted by <span className="font-semibold text-[var(--color-ink)]">
              500+
            </span>{" "}
            growing companies across{" "}
            <span className="font-semibold text-[var(--color-primary)]">
              47 countries
            </span>
            .
          </p>
        </motion.div>
      </section>
    </>
  );
}

export default Testimonials;
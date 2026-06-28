'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import { Code2, Copy, CheckCheck, Monitor, ChevronRight } from 'lucide-react'
import ENV_SECRETS from '@/lib/ENV'

const embedStyles = `
.em-section-card {
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

.em-section-card::before {
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

.em-section-card:hover {
  border-color: var(--color-primary-border);
  box-shadow: var(--glow-mint-md);
}

.em-section-card:hover::before {
  transform: scaleX(1);
}

.em-section-icon {
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

.em-section-card:hover .em-section-icon {
  background: linear-gradient(155deg, var(--color-primary), var(--color-primary-hover));
  color: #ffffff;
  transform: rotate(-6deg) scale(1.08);
}

.em-code-block {
  position: relative;
  background: #0f1117;
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.7;
  color: #e2e8f0;
  overflow-x: auto;
  border: 1px solid rgb(255 255 255 / 0.06);
}

.em-copy-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-sm);
  background: rgb(255 255 255 / 0.08);
  border: 1px solid rgb(255 255 255 / 0.12);
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-body);
  transition: background .2s, color .2s, border-color .2s;
}

.em-copy-btn:hover {
  background: rgb(255 255 255 / 0.14);
  color: #e2e8f0;
  border-color: rgb(255 255 255 / 0.2);
}

.em-copy-btn.copied {
  background: rgb(15 139 108 / 0.2);
  border-color: var(--color-primary-border);
  color: var(--color-primary);
}

.em-step {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
}

.em-step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: var(--radius-full);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 1px;
  font-family: var(--font-body);
}

.em-step-text {
  font-size: 0.9rem;
  color: var(--color-ink-secondary);
  line-height: 1.5;
  padding-top: 3px;
}

.em-step-text code {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  background: var(--color-base-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xs);
  padding: 0.1em 0.4em;
  color: var(--color-primary);
}

.em-browser-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  height: 36px;
  background: var(--color-base-alt);
  border-bottom: 1px solid var(--color-border);
}

.em-browser-dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.em-browser-url {
  margin-left: 0.75rem;
  font-size: 0.75rem;
  color: var(--color-ink-muted);
  font-family: var(--font-mono);
}

.em-preview-canvas {
  position: relative;
  height: 280px;
  background: var(--color-base);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.em-preview-placeholder {
  font-size: 0.85rem;
  color: var(--color-ink-placeholder);
  user-select: none;
}

.em-chat-window {
  position: absolute;
  bottom: 80px;
  right: 20px;
  width: 230px;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.em-chat-header {
  background: var(--color-primary);
  padding: 9px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.em-chat-header-title {
  font-size: 0.75rem;
  font-weight: 500;
  color: #fff;
  font-family: var(--font-body);
}

.em-chat-header-close {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  background: rgb(255 255 255 / 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  color: #fff;
  cursor: pointer;
}

.em-chat-messages {
  padding: 10px;
  background: var(--color-base);
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.em-chat-bubble {
  font-size: 0.7rem;
  line-height: 1.4;
  padding: 6px 10px;
  border-radius: 10px;
  font-family: var(--font-body);
}

.em-chat-bubble.ai {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-ink);
  align-self: flex-start;
  border-radius: 10px 10px 10px 3px;
}

.em-chat-bubble.user {
  background: var(--color-primary);
  color: #fff;
  align-self: flex-end;
  border-radius: 10px 10px 3px 10px;
}

.em-trigger {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 46px;
  height: 46px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px -4px rgb(15 139 108 / 0.5);
  cursor: pointer;
}
`

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    show: (delay: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1.0, delay, ease: easeOut },
    }),
}

function EmbedClient({ ownerId }: { ownerId: string }) {
    const [copied, setCopied] = useState(false)

    const embedCode = `<script
  src="${ENV_SECRETS.BASE_URL}/chatBot.js"
  data-owner-id="${ownerId}">
</script>`

    const copyCode = () => {
        navigator.clipboard.writeText(embedCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: embedStyles }} />

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
                            Embed{" "}
                            <span className="italic text-[var(--color-primary)]">Chatbot</span>
                        </h1>
                        <p className="mt-2 text-[1rem] leading-relaxed text-[var(--color-ink-tertiary)]">
                            Add your AI support widget to any website in seconds.
                        </p>
                    </motion.div>

                    <div className="flex flex-col gap-5">

                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                            custom={0.12}
                            className="em-section-card"
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <div className="em-section-icon">
                                    <Code2 size={18} strokeWidth={2} />
                                </div>
                                <div>
                                    <h2 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                                        Embed Script
                                    </h2>
                                    <p className="mt-0.5 text-[0.8125rem] text-[var(--color-ink-tertiary)]">
                                        Copy and paste this before your closing <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: 'var(--color-base-alt)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xs)', padding: '0.1em 0.4em', color: 'var(--color-primary)' }}>&lt;/body&gt;</code> tag
                                    </p>
                                </div>
                            </div>

                            <div className="em-code-block">
                                <pre style={{ margin: 0, whiteSpace: 'pre', overflowX: 'auto' }}>{embedCode}</pre>
                                <button
                                    className={`em-copy-btn ${copied ? 'copied' : ''}`}
                                    onClick={copyCode}
                                >
                                    {copied
                                        ? <><CheckCheck size={13} strokeWidth={2} /> Copied</>
                                        : <><Copy size={13} strokeWidth={2} /> Copy</>
                                    }
                                </button>
                            </div>

                            <div className="mt-6 flex flex-col gap-3">
                                {[
                                    { num: 1, text: <>Copy the embed script above</> },
                                    { num: 2, text: <>Paste it before the closing <code>&lt;/body&gt;</code> tag in your HTML</> },
                                    { num: 3, text: <>Save and reload your website — the chat widget will appear</> },
                                ].map(({ num, text }) => (
                                    <div key={num} className="em-step">
                                        <div className="em-step-num">{num}</div>
                                        <p className="em-step-text">{text}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                            custom={0.24}
                            className="em-section-card"
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <div className="em-section-icon">
                                    <Monitor size={18} strokeWidth={2} />
                                </div>
                                <div>
                                    <h2 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                                        Live Preview
                                    </h2>
                                    <p className="mt-0.5 text-[0.8125rem] text-[var(--color-ink-tertiary)]">
                                        This is how the chatbot will appear on your website
                                    </p>
                                </div>
                            </div>

                            <div
                                style={{
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--color-border)',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-md)',
                                }}
                            >
                                <div className="em-browser-bar">
                                    <span className="em-browser-dot" style={{ background: '#fc6058' }} />
                                    <span className="em-browser-dot" style={{ background: '#fec02f' }} />
                                    <span className="em-browser-dot" style={{ background: '#2aca3e' }} />
                                    <span className="em-browser-url">your-website.com</span>
                                </div>

                                <div className="em-preview-canvas">
                                    <span className="em-preview-placeholder">Your website content</span>

                                    <div className="em-chat-window">
                                        <div className="em-chat-header">
                                            <span className="em-chat-header-title">Customer Support</span>
                                            <div className="em-chat-header-close">✕</div>
                                        </div>
                                        <div className="em-chat-messages">
                                            <div className="em-chat-bubble ai">Hi! How can I help you today? 👋</div>
                                            <div className="em-chat-bubble user">What's the return policy?</div>
                                            <div className="em-chat-bubble ai">Returns are accepted within 7 days of delivery.</div>
                                        </div>
                                    </div>

                                    <motion.div
                                        animate={{ y: [0, -7, 0] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                                        className="em-trigger"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </main>
        </>
    )
}

export default EmbedClient
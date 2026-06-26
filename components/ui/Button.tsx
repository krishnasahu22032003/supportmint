"use client";

import React, { useRef, useState, useCallback } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const styles = `
  .btn-root {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: var(--font-display);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.01em;
    white-space: nowrap;
    border: none;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    transition:
      transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 0.18s cubic-bezier(0.22, 1, 0.36, 1),
      background 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease,
      opacity 0.15s ease;
    user-select: none;
  }

  .btn-root:focus-visible {
    outline: 2.5px solid var(--color-primary);
    outline-offset: 3px;
  }

  .btn-root:disabled,
  .btn-root[aria-disabled="true"] {
    opacity: 0.42;
    cursor: not-allowed;
    pointer-events: none;
  }

  .btn-root.full-width {
    width: 100%;
  }

  /* ── Sizes ─────────────────────────────────────── */

  .btn-sm {
    font-size: 0.8125rem;
    padding: 0.4375rem 0.875rem;
    border-radius: 8px;
    gap: 0.375rem;
  }

  .btn-md {
    font-size: 0.9375rem;
    padding: 0.625rem 1.25rem;
    border-radius: 10px;
  }

  .btn-lg {
    font-size: 1rem;
    padding: 0.8125rem 1.625rem;
    border-radius: 12px;
    gap: 0.5625rem;
  }

  .btn-xl {
    font-size: 1.0625rem;
    padding: 1rem 2rem;
    border-radius: 14px;
    gap: 0.625rem;
    letter-spacing: -0.015em;
  }

  /* ── Primary ───────────────────────────────────── */

  .btn-primary {
    background: var(--color-primary);
    color: #fff;
    box-shadow:
      0 1px 2px rgb(37 99 235 / 0.25),
      inset 0 1px 0 rgb(255 255 255 / 0.14),
      inset 0 -1px 0 rgb(0 0 0 / 0.08);
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--color-primary-hover);
    transform: translateY(-2px);
    box-shadow:
      0 6px 20px rgb(37 99 235 / 0.38),
      0 2px 6px rgb(37 99 235 / 0.2),
      inset 0 1px 0 rgb(255 255 255 / 0.14),
      inset 0 -1px 0 rgb(0 0 0 / 0.08);
  }

  .btn-primary:active:not(:disabled) {
    transform: translateY(0px) scale(0.985);
    box-shadow:
      0 1px 3px rgb(37 99 235 / 0.2),
      inset 0 1px 3px rgb(0 0 0 / 0.12),
      inset 0 1px 0 rgb(255 255 255 / 0.08);
    transition-duration: 0.08s;
  }

  /* ── Secondary ─────────────────────────────────── */

  .btn-secondary {
    background: var(--color-surface);
    color: var(--color-ink);
    border: 1px solid var(--color-border);
    box-shadow:
      0 1px 2px rgb(0 0 0 / 0.05),
      inset 0 1px 0 rgb(255 255 255 / 0.9);
  }

  .btn-secondary:hover:not(:disabled) {
    background: var(--color-base-alt);
    border-color: var(--color-ink-placeholder);
    transform: translateY(-1px);
    box-shadow:
      0 4px 12px rgb(0 0 0 / 0.09),
      0 1px 3px rgb(0 0 0 / 0.05),
      inset 0 1px 0 rgb(255 255 255 / 0.9);
  }

  .btn-secondary:active:not(:disabled) {
    transform: translateY(0px) scale(0.988);
    background: var(--color-base-alt);
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.04);
    transition-duration: 0.08s;
  }

  /* ── Ghost ─────────────────────────────────────── */

  .btn-ghost {
    background: transparent;
    color: var(--color-ink-secondary);
    box-shadow: none;
  }

  .btn-ghost:hover:not(:disabled) {
    background: var(--color-base-alt);
    color: var(--color-ink);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.06);
  }

  .btn-ghost:active:not(:disabled) {
    transform: translateY(0px) scale(0.988);
    background: var(--color-border-subtle);
    transition-duration: 0.08s;
  }

  /* ── Outline ───────────────────────────────────── */

  .btn-outline {
    background: transparent;
    color: var(--color-primary);
    border: 1.5px solid var(--color-primary-border);
    box-shadow: none;
  }

  .btn-outline:hover:not(:disabled) {
    background: var(--color-primary-subtle);
    border-color: var(--color-primary);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgb(37 99 235 / 0.14);
  }

  .btn-outline:active:not(:disabled) {
    transform: translateY(0px) scale(0.988);
    background: var(--color-primary-tint);
    transition-duration: 0.08s;
  }

  /* ── Danger ────────────────────────────────────── */

  .btn-danger {
    background: var(--color-danger);
    color: #fff;
    box-shadow:
      0 1px 2px rgb(220 38 38 / 0.25),
      inset 0 1px 0 rgb(255 255 255 / 0.14),
      inset 0 -1px 0 rgb(0 0 0 / 0.08);
  }

  .btn-danger:hover:not(:disabled) {
    background: #b91c1c;
    transform: translateY(-2px);
    box-shadow:
      0 6px 20px rgb(220 38 38 / 0.38),
      0 2px 6px rgb(220 38 38 / 0.2),
      inset 0 1px 0 rgb(255 255 255 / 0.14);
  }

  .btn-danger:active:not(:disabled) {
    transform: translateY(0px) scale(0.985);
    box-shadow: 0 1px 3px rgb(220 38 38 / 0.2), inset 0 1px 3px rgb(0 0 0 / 0.12);
    transition-duration: 0.08s;
  }

  /* ── Success ───────────────────────────────────── */

  .btn-success {
    background: var(--color-success);
    color: #fff;
    box-shadow:
      0 1px 2px rgb(22 163 74 / 0.25),
      inset 0 1px 0 rgb(255 255 255 / 0.14),
      inset 0 -1px 0 rgb(0 0 0 / 0.08);
  }

  .btn-success:hover:not(:disabled) {
    background: #15803d;
    transform: translateY(-2px);
    box-shadow:
      0 6px 20px rgb(22 163 74 / 0.38),
      0 2px 6px rgb(22 163 74 / 0.2),
      inset 0 1px 0 rgb(255 255 255 / 0.14);
  }

  .btn-success:active:not(:disabled) {
    transform: translateY(0px) scale(0.985);
    box-shadow: 0 1px 3px rgb(22 163 74 / 0.2), inset 0 1px 3px rgb(0 0 0 / 0.12);
    transition-duration: 0.08s;
  }

  /* ── Shimmer sweep (primary + danger + success) ── */

  .btn-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgb(255 255 255 / 0.22) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    transition: transform 0s;
    pointer-events: none;
    border-radius: inherit;
  }

  .btn-shimmer:hover:not(:disabled)::after {
    transform: translateX(100%);
    transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── Ripple ────────────────────────────────────── */

  .btn-ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: btn-ripple-anim 0.52s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    pointer-events: none;
  }

  @keyframes btn-ripple-anim {
    to { transform: scale(4); opacity: 0; }
  }

  /* ── Loading spinner ───────────────────────────── */

  .btn-spinner {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: btn-spin 0.65s linear infinite;
    flex-shrink: 0;
  }

  @keyframes btn-spin {
    to { transform: rotate(360deg); }
  }

  .btn-content {
    display: inline-flex;
    align-items: center;
    gap: inherit;
    transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .btn-root:hover:not(:disabled) .btn-content {
    transform: translateY(0);
  }

  .btn-icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .btn-root:hover:not(:disabled) .btn-icon-right {
    transform: translateX(2px);
  }

  .btn-root:hover:not(:disabled) .btn-icon-left {
    transform: translateX(-1px);
  }

  @media (prefers-reduced-motion: reduce) {
    .btn-root,
    .btn-root::after,
    .btn-spinner,
    .btn-ripple,
    .btn-icon-wrap {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`;

const SHIMMER_VARIANTS: ButtonVariant[] = ["primary", "danger", "success"];

const RIPPLE_COLORS: Record<ButtonVariant, string> = {
  primary: "rgb(255 255 255 / 0.28)",
  secondary: "rgb(37 99 235 / 0.10)",
  ghost: "rgb(0 0 0 / 0.06)",
  outline: "rgb(37 99 235 / 0.12)",
  danger: "rgb(255 255 255 / 0.28)",
  success: "rgb(255 255 255 / 0.28)",
};

function useRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);

  const trigger = useCallback((e: React.MouseEvent<HTMLButtonElement>, color: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y, size, color }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
  }, []);

  return { ripples, trigger };
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = "",
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const { ripples, trigger } = useRipple();
  const isDisabled = disabled || loading;

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    trigger(e, RIPPLE_COLORS[variant]);
    onClick?.(e);
  }, [isDisabled, trigger, variant, onClick]);

  const classes = [
    "btn-root",
    `btn-${size}`,
    `btn-${variant}`,
    SHIMMER_VARIANTS.includes(variant) ? "btn-shimmer" : "",
    fullWidth ? "full-width" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <button
        className={classes}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        onClick={handleClick}
        {...rest}
      >
        {ripples.map(r => (
          <span
            key={r.id}
            className="btn-ripple"
            style={{
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
              background: r.color,
            }}
          />
        ))}

        <span className="btn-content">
          {loading ? (
            <span className="btn-spinner" aria-hidden="true" />
          ) : leftIcon ? (
            <span className="btn-icon-wrap btn-icon-left" aria-hidden="true">
              {leftIcon}
            </span>
          ) : null}

          {children && (
            <span>{children}</span>
          )}

          {!loading && rightIcon && (
            <span className="btn-icon-wrap btn-icon-right" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    </>
  );
}

export default Button;
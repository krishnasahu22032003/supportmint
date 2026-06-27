"use client";

import React, { useCallback } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
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
  font-family: var(--font-body);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.011em;
  white-space: nowrap;
  border: none;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  user-select: none;
}

.btn-root:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.btn-root:disabled,
.btn-root[aria-disabled="true"] {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-root.full-width {
  width: 100%;
}

.btn-sm {
  font-size: 0.8125rem;
  padding: 0.5rem 0.875rem;
  border-radius: var(--radius-sm);
}

.btn-md {
  font-size: 0.9375rem;
  padding: 0.6875rem 1.25rem;
  border-radius: var(--radius-md);
}

.btn-lg {
  font-size: 1rem;
  padding: 0.8125rem 1.625rem;
  border-radius: var(--radius-md);
}

.btn-xl {
  font-size: 1.0625rem;
  padding: 1rem 2rem;
  border-radius: var(--radius-lg);
}

.btn-primary {
  background: var(--color-primary);
  color: #ffffff;
  box-shadow: 0 1px 2px rgb(15 139 108 / 0.18), inset 0 1px 0 rgb(255 255 255 / 0.12);
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--glow-mint-md);
}

.btn-primary:active:not(:disabled) {
  background: var(--color-primary-active);
  transform: translateY(0) scale(0.985);
  box-shadow: 0 1px 2px rgb(15 139 108 / 0.2);
  transition-duration: 0.08s;
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-ink);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-xs);
}

.btn-secondary:hover:not(:disabled) {
  border-color: var(--color-ink-placeholder);
  background: var(--color-base-alt);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.btn-secondary:active:not(:disabled) {
  transform: translateY(0) scale(0.99);
  background: var(--color-border-subtle);
  transition-duration: 0.08s;
}

.btn-ghost {
  background: transparent;
  color: var(--color-ink-secondary);
}

.btn-ghost:hover:not(:disabled) {
  background: var(--color-base-alt);
  color: var(--color-ink);
}

.btn-ghost:active:not(:disabled) {
  background: var(--color-border-subtle);
  transform: scale(0.99);
  transition-duration: 0.08s;
}

.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary-border);
}

.btn-outline:hover:not(:disabled) {
  background: var(--color-primary-subtle);
  border-color: var(--color-primary);
}

.btn-outline:active:not(:disabled) {
  background: var(--color-primary-tint);
  transform: scale(0.99);
  transition-duration: 0.08s;
}

.btn-danger {
  background: var(--color-danger);
  color: #ffffff;
  box-shadow: 0 1px 2px rgb(192 57 43 / 0.18), inset 0 1px 0 rgb(255 255 255 / 0.12);
}

.btn-danger:hover:not(:disabled) {
  background: #A8321F;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px -4px rgb(192 57 43 / 0.28);
}

.btn-danger:active:not(:disabled) {
  transform: translateY(0) scale(0.985);
  transition-duration: 0.08s;
}

.btn-spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: btn-spin 0.6s linear infinite;
  flex-shrink: 0;
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
}

.btn-root:hover:not(:disabled) .btn-icon-right {
  transform: translateX(2px);
}

@media (max-width: 480px) {
  .btn-lg {
    font-size: 0.9375rem;
    padding: 0.75rem 1.375rem;
  }
  .btn-xl {
    font-size: 1rem;
    padding: 0.875rem 1.625rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-root, .btn-spinner, .btn-icon {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}
`;

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = [
    "btn-root",
    `btn-${size}`,
    `btn-${variant}`,
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
        {...rest}
      >
        {loading ? (
          <span className="btn-spinner" aria-hidden="true" />
        ) : leftIcon ? (
          <span className="btn-icon btn-icon-left" aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}

        {children && <span>{children}</span>}

        {!loading && rightIcon && (
          <span className="btn-icon btn-icon-right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    </>
  );
}

export default Button;
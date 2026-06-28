"use client";

import { useState, useEffect, useRef } from "react";
import { LogOut, ChevronDown, User, Code2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "./Button";

const dashboardHeaderStyles = `
.dash-header {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  background: rgba(251, 251, 250, 0.6);
  border-bottom: 1px solid var(--color-border-subtle);
  transition: background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
}

.dash-header.scrolled {
  background: rgba(251, 251, 250, 0.58);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom-color: rgba(228, 230, 226, 0.7);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset, 0 8px 30px -8px rgb(20 23 26 / 0.08);
}

.dash-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.dash-logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  user-select: none;
  flex-shrink: 0;
}

.dash-logo-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  box-shadow: 0 1px 2px rgb(15 139 108 / 0.2), inset 0 1px 0 rgb(255 255 255 / 0.16);
  transition: box-shadow 0.2s ease;
  flex-shrink: 0;
}

.dash-logo:hover .dash-logo-mark {
  box-shadow: var(--glow-mint-sm);
}

.dash-logo-text {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-ink);
  letter-spacing: -0.01em;
}

.dash-user-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.625rem 0.375rem 0.375rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.dash-user-btn:hover {
  border-color: var(--color-primary-border);
  background: var(--color-primary-subtle);
  box-shadow: var(--glow-mint-sm);
}

.dash-user-btn.open {
  border-color: var(--color-primary-border);
  background: var(--color-primary-subtle);
}

.dash-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(155deg, var(--color-primary), var(--color-primary-hover));
  color: #fff;
  flex-shrink: 0;
}

.dash-chevron {
  color: var(--color-ink-muted);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  flex-shrink: 0;
}

.dash-chevron.open {
  transform: rotate(180deg);
}

.dash-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 210px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: 0.375rem;
  z-index: 50;
  animation: dash-dropdown-in 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: top right;
}

@keyframes dash-dropdown-in {
  from { opacity: 0; transform: scale(0.95) translateY(-6px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.dash-dropdown-header {
  padding: 0.625rem 0.75rem 0.5rem;
  border-bottom: 1px solid var(--color-border-subtle);
  margin-bottom: 0.375rem;
}

.dash-dropdown-email {
  font-size: 0.8125rem;
  color: var(--color-ink-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dash-dropdown-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.125rem;
}

.dash-dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.625rem 0.75rem;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease, color 0.15s ease;
  color: var(--color-ink-secondary);
}

.dash-dropdown-item:hover {
  background: var(--color-base-alt);
  color: var(--color-ink);
}

.dash-dropdown-item.danger {
  color: var(--color-danger, #c0392b);
}

.dash-dropdown-item.danger:hover {
  background: rgb(192 57 43 / 0.06);
  color: var(--color-danger, #c0392b);
}

.dash-dropdown-item-icon {
  flex-shrink: 0;
}

.dash-dropdown-divider {
  height: 1px;
  background: var(--color-border-subtle);
  margin: 0.375rem 0;
}

.dash-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dash-embed-desktop {
  display: flex;
}

.dash-embed-mobile {
  display: none;
  width: 100%;
  padding: 0 0.375rem 0.375rem;
}

@media (max-width: 640px) {
  .dash-header-content {
    padding: 0.875rem 1rem;
  }

  .dash-embed-desktop {
    display: none;
  }

  .dash-embed-mobile {
    display: block;
  }
}
`;

interface DashboardHeaderProps {
  userName?: string;
  userEmail?: string;
}

export function EmbedHeader({ userName, userEmail }: DashboardHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    userName
      ?.trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "";

  const handleLogOut = () => {
    window.location.href = "/api/auth/logout";
  };

  const handleDashboard = () => {
    setDropdownOpen(false);
    router.push("/dashboard");
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: dashboardHeaderStyles }} />
      <header className={`dash-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="dash-header-content">

          <div className="dash-logo">
            <span className="dash-logo-mark" aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4.5C2 3.119 3.119 2 4.5 2h7C12.881 2 14 3.119 14 4.5v4c0 1.381-1.119 2.5-2.5 2.5H8.8L5.6 13.6V11H4.5C3.119 11 2 9.881 2 8.5v-4Z"
                  fill="white"
                />
                <circle cx="5.5" cy="6.5" r="0.9" fill="var(--color-primary)" />
                <circle cx="8" cy="6.5" r="0.9" fill="var(--color-primary)" />
                <circle cx="10.5" cy="6.5" r="0.9" fill="var(--color-primary)" />
              </svg>
            </span>
            <span className="dash-logo-text">SupportMint</span>
          </div>

          <div className="dash-right">

            <div className="dash-embed-desktop">
              <Button
                variant="secondary"
                size="md"
                leftIcon={<Code2 size={15} strokeWidth={2} />}
                onClick={handleDashboard}
              >
                Dashboard
              </Button>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                className={`dash-user-btn ${dropdownOpen ? "open" : ""}`}
                onClick={() => setDropdownOpen((v) => !v)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-label="User menu"
              >
                <span className="dash-avatar">
                  {initials ? (
                    <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>{initials}</span>
                  ) : (
                    <User size={14} strokeWidth={2} />
                  )}
                </span>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`dash-chevron ${dropdownOpen ? "open" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="dash-dropdown" role="menu">
                  <div className="dash-dropdown-header">
                    <div className="dash-dropdown-name">{userName}</div>
                    <div className="dash-dropdown-email">{userEmail}</div>
                  </div>

                  <button
                    className="dash-dropdown-item danger"
                    role="menuitem"
                    onClick={handleLogOut}
                  >
                    <LogOut size={15} strokeWidth={2} className="dash-dropdown-item-icon" />
                    Sign out
                  </button>

                  <div className="dash-dropdown-divider dash-embed-mobile" />

                  <div className="dash-embed-mobile">
                    <Button
                      variant="secondary"
                      size="md"
                      fullWidth
                      leftIcon={<Code2 size={15} strokeWidth={2} />}
                      onClick={handleDashboard}
                    >
                      Embed ChatBot
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </header>
    </>
  );
}

export default EmbedHeader;
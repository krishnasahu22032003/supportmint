(function () {
  const API_URL = "https://supportmint.krishnastack.com/api/chat";

  const scriptTag = document.currentScript;
  const ownerId = scriptTag.getAttribute("data-owner-id");

  if (!ownerId) {
    console.warn("chat-widget: data-owner-id not found");
    return;
  }

  const FONTS = document.createElement("link");
  FONTS.rel = "stylesheet";
  FONTS.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400&family=Inter:wght@300;400;500;600&display=swap";
  document.head.appendChild(FONTS);

  const STYLE = document.createElement("style");
  STYLE.textContent = `
    :root {
      --cw-base: #FBFBFA;
      --cw-surface: #FFFFFF;
      --cw-border: #E3E6E2;
      --cw-border-subtle: #EEF0ED;
      --cw-ink: #14171A;
      --cw-ink-secondary: #3F4541;
      --cw-ink-tertiary: #6C7570;
      --cw-ink-muted: #9AA39C;
      --cw-ink-placeholder: #C3CAC3;
      --cw-primary: #0F8B6C;
      --cw-primary-hover: #0B6E55;
      --cw-primary-active: #08543F;
      --cw-primary-subtle: #EFF8F4;
      --cw-primary-tint: #DCF0E6;
      --cw-primary-border: #B7E1CC;
      --cw-online: #2FBE83;
      --cw-radius-sm: 6px;
      --cw-radius-md: 10px;
      --cw-radius-lg: 14px;
      --cw-radius-xl: 20px;
      --cw-radius-full: 9999px;
      --cw-font-display: "Fraunces", serif;
      --cw-font-body: "Inter", sans-serif;
      --cw-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
      --cw-ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
    }

    #cw-trigger {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: var(--cw-radius-full);
      background: var(--cw-primary);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
      box-shadow: 0 8px 28px -6px rgba(15,139,108,0.5), 0 0 0 1px rgba(15,139,108,0.12);
      z-index: 999999;
      transition: background 0.2s var(--cw-ease-smooth), transform 0.2s var(--cw-ease-spring), box-shadow 0.2s;
      font-family: var(--cw-font-body);
    }

    #cw-trigger:hover {
      background: var(--cw-primary-hover);
      transform: scale(1.06);
      box-shadow: 0 12px 36px -6px rgba(15,139,108,0.55), 0 0 0 1px rgba(15,139,108,0.15);
    }

    #cw-trigger:active {
      background: var(--cw-primary-active);
      transform: scale(0.97);
    }

    #cw-trigger svg {
      transition: transform 0.3s var(--cw-ease-spring), opacity 0.2s;
    }

    #cw-trigger.open .cw-icon-chat { opacity: 0; transform: scale(0.6) rotate(-20deg); }
    #cw-trigger.open .cw-icon-close { opacity: 1; transform: scale(1) rotate(0deg); }
    #cw-trigger:not(.open) .cw-icon-chat { opacity: 1; transform: scale(1) rotate(0deg); }
    #cw-trigger:not(.open) .cw-icon-close { opacity: 0; transform: scale(0.6) rotate(20deg); }

    #cw-trigger .cw-icon-chat,
    #cw-trigger .cw-icon-close {
      position: absolute;
    }

    #cw-dot {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 10px;
      height: 10px;
      border-radius: var(--cw-radius-full);
      background: var(--cw-online);
      border: 2px solid var(--cw-primary);
      animation: cw-pulse 2s ease-in-out infinite;
    }

    @keyframes cw-pulse {
      0% { box-shadow: 0 0 0 0 rgba(47,190,131,0.45); }
      70% { box-shadow: 0 0 0 6px rgba(47,190,131,0); }
      100% { box-shadow: 0 0 0 0 rgba(47,190,131,0); }
    }

    #cw-box {
      position: fixed;
      bottom: 92px;
      right: 24px;
      width: 360px;
      max-width: calc(100vw - 48px);
      height: 520px;
      max-height: calc(100dvh - 120px);
      background: var(--cw-surface);
      border-radius: var(--cw-radius-xl);
      border: 1px solid var(--cw-border);
      box-shadow: 0 20px 48px -10px rgba(20,23,26,0.14), 0 8px 16px -6px rgba(20,23,26,0.08), 0 0 0 1px rgba(20,23,26,0.04);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 999998;
      font-family: var(--cw-font-body);
      transform-origin: bottom right;
      transition: opacity 0.3s var(--cw-ease-smooth), transform 0.35s var(--cw-ease-spring);
    }

    #cw-box.cw-hidden {
      opacity: 0;
      transform: scale(0.88) translateY(12px);
      pointer-events: none;
    }

    #cw-box.cw-visible {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: all;
    }

    #cw-header {
      padding: 16px 18px 14px;
      border-bottom: 1px solid var(--cw-border-subtle);
      background: var(--cw-surface);
      flex-shrink: 0;
    }

    #cw-header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    #cw-avatar {
      width: 36px;
      height: 36px;
      border-radius: var(--cw-radius-md);
      background: var(--cw-primary-tint);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    #cw-header-info {
      flex: 1;
      margin-left: 10px;
    }

    #cw-header-title {
      font-family: var(--cw-font-display);
      font-size: 15px;
      font-weight: 400;
      color: var(--cw-ink);
      letter-spacing: -0.02em;
      line-height: 1.2;
      margin: 0;
    }

    #cw-header-status {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      color: var(--cw-ink-tertiary);
      margin-top: 2px;
      font-weight: 400;
    }

    #cw-status-dot {
      width: 6px;
      height: 6px;
      border-radius: var(--cw-radius-full);
      background: var(--cw-online);
      flex-shrink: 0;
    }

    #cw-close {
      width: 28px;
      height: 28px;
      border-radius: var(--cw-radius-sm);
      border: 1px solid var(--cw-border);
      background: transparent;
      color: var(--cw-ink-tertiary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }

    #cw-close:hover {
      background: var(--cw-base);
      color: var(--cw-ink);
      border-color: var(--cw-ink-muted);
    }

    #cw-subtitle {
      font-size: 12px;
      color: var(--cw-ink-tertiary);
      line-height: 1.4;
      margin: 0;
      font-weight: 400;
    }

    #cw-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--cw-base);
      scroll-behavior: smooth;
    }

    #cw-messages::-webkit-scrollbar { width: 4px; }
    #cw-messages::-webkit-scrollbar-track { background: transparent; }
    #cw-messages::-webkit-scrollbar-thumb { background: var(--cw-border); border-radius: var(--cw-radius-full); }

    .cw-bubble-wrap {
      display: flex;
      flex-direction: column;
      animation: cw-slide-in 0.3s var(--cw-ease-smooth) both;
    }

    @keyframes cw-slide-in {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .cw-bubble-wrap.user { align-items: flex-end; }
    .cw-bubble-wrap.ai { align-items: flex-start; }

    .cw-bubble {
      max-width: 82%;
      padding: 10px 14px;
      font-size: 13.5px;
      line-height: 1.5;
      font-weight: 400;
      word-break: break-word;
    }

    .cw-bubble.user {
      background: var(--cw-primary);
      color: #fff;
      border-radius: var(--cw-radius-lg) var(--cw-radius-lg) var(--cw-radius-sm) var(--cw-radius-lg);
    }

    .cw-bubble.ai {
      background: var(--cw-surface);
      color: var(--cw-ink);
      border: 1px solid var(--cw-border);
      border-radius: var(--cw-radius-lg) var(--cw-radius-lg) var(--cw-radius-lg) var(--cw-radius-sm);
      box-shadow: 0 1px 3px rgba(20,23,26,0.05);
    }

    .cw-meta {
      font-size: 10.5px;
      color: var(--cw-ink-placeholder);
      margin-top: 3px;
      padding: 0 2px;
    }

    .cw-typing {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 10px 14px;
      background: var(--cw-surface);
      border: 1px solid var(--cw-border);
      border-radius: var(--cw-radius-lg) var(--cw-radius-lg) var(--cw-radius-lg) var(--cw-radius-sm);
      width: fit-content;
      box-shadow: 0 1px 3px rgba(20,23,26,0.05);
      animation: cw-slide-in 0.3s var(--cw-ease-smooth) both;
    }

    .cw-typing span {
      width: 6px;
      height: 6px;
      border-radius: var(--cw-radius-full);
      background: var(--cw-primary-border);
      animation: cw-bounce 1.2s ease-in-out infinite;
    }

    .cw-typing span:nth-child(2) { animation-delay: 0.18s; }
    .cw-typing span:nth-child(3) { animation-delay: 0.36s; }

    @keyframes cw-bounce {
      0%, 80%, 100% { transform: scale(1); background: var(--cw-primary-border); }
      40% { transform: scale(1.3); background: var(--cw-primary); }
    }

    #cw-footer {
      padding: 12px 14px;
      border-top: 1px solid var(--cw-border-subtle);
      background: var(--cw-surface);
      flex-shrink: 0;
    }

    #cw-input-row {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      background: var(--cw-base);
      border: 1px solid var(--cw-border);
      border-radius: var(--cw-radius-lg);
      padding: 8px 8px 8px 14px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    #cw-input-row:focus-within {
      border-color: var(--cw-primary-border);
      box-shadow: 0 0 0 3px rgba(15,139,108,0.1);
    }

    #cw-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-family: var(--cw-font-body);
      font-size: 13.5px;
      color: var(--cw-ink);
      line-height: 1.5;
      resize: none;
      min-height: 22px;
      max-height: 88px;
      overflow-y: auto;
      padding: 0;
    }

    #cw-input::placeholder {
      color: var(--cw-ink-placeholder);
    }

    #cw-send {
      width: 34px;
      height: 34px;
      border-radius: var(--cw-radius-md);
      background: var(--cw-primary);
      color: #fff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s, transform 0.15s var(--cw-ease-spring), opacity 0.15s;
    }

    #cw-send:hover { background: var(--cw-primary-hover); transform: scale(1.05); }
    #cw-send:active { background: var(--cw-primary-active); transform: scale(0.95); }
    #cw-send:disabled { background: var(--cw-border); opacity: 0.7; cursor: not-allowed; transform: none; }

    #cw-powered {
      text-align: center;
      font-size: 10.5px;
      color: var(--cw-ink-placeholder);
      margin-top: 8px;
      font-weight: 400;
    }

    @media (max-width: 420px) {
      #cw-box {
        right: 12px;
        bottom: 84px;
        width: calc(100vw - 24px);
      }
      #cw-trigger {
        right: 12px;
        bottom: 16px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #cw-trigger, #cw-box, .cw-bubble-wrap, .cw-typing { animation: none !important; transition: none !important; }
    }
  `;
  document.head.appendChild(STYLE);

  const trigger = document.createElement("button");
  trigger.id = "cw-trigger";
  trigger.setAttribute("aria-label", "Open support chat");
  trigger.innerHTML = `
    <div id="cw-dot"></div>
    <svg class="cw-icon-chat" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <svg class="cw-icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `;
  document.body.appendChild(trigger);

  const box = document.createElement("div");
  box.id = "cw-box";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Customer support chat");
  box.className = "cw-hidden";
  box.innerHTML = `
    <div id="cw-header">
      <div id="cw-header-top">
        <div style="display:flex;align-items:center;">
          <div id="cw-avatar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F8B6C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div id="cw-header-info">
            <p id="cw-header-title">Support</p>
            <div id="cw-header-status">
              <div id="cw-status-dot"></div>
              Online — typically replies instantly
            </div>
          </div>
        </div>
        <button id="cw-close" aria-label="Close chat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <p id="cw-subtitle">Ask us anything — we're here to help.</p>
    </div>

    <div id="cw-messages" role="log" aria-live="polite" aria-label="Chat messages"></div>

    <div id="cw-footer">
      <div id="cw-input-row">
        <textarea
          id="cw-input"
          rows="1"
          placeholder="Type a message…"
          aria-label="Your message"
          autocomplete="off"
          spellcheck="true"
        ></textarea>
        <button id="cw-send" aria-label="Send message" disabled>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
      <p id="cw-powered">Powered by SupportMint AI · We reply in seconds</p>
    </div>
  `;
  document.body.appendChild(box);

  const messagesEl = box.querySelector("#cw-messages");
  const inputEl = box.querySelector("#cw-input");
  const sendBtn = box.querySelector("#cw-send");
  const closeBtn = box.querySelector("#cw-close");

  let isOpen = false;
  let isBusy = false;

  function getTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function addMessage(text, from) {
    const wrap = document.createElement("div");
    wrap.className = "cw-bubble-wrap " + from;

    const bubble = document.createElement("div");
    bubble.className = "cw-bubble " + from;
    bubble.textContent = text;

    const meta = document.createElement("div");
    meta.className = "cw-meta";
    meta.textContent = getTime();

    wrap.appendChild(bubble);
    wrap.appendChild(meta);
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return wrap;
  }

  function addTyping() {
    const wrap = document.createElement("div");
    wrap.className = "cw-bubble-wrap ai";
    wrap.innerHTML = `
      <div class="cw-typing">
        <span></span><span></span><span></span>
      </div>
    `;
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return wrap;
  }

  function setOpen(open) {
    isOpen = open;
    if (open) {
      box.classList.remove("cw-hidden");
      box.classList.add("cw-visible");
      trigger.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
      trigger.setAttribute("aria-label", "Close support chat");
      setTimeout(() => inputEl.focus(), 350);
    } else {
      box.classList.remove("cw-visible");
      box.classList.add("cw-hidden");
      trigger.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-label", "Open support chat");
    }
  }

  trigger.addEventListener("click", () => setOpen(!isOpen));
  closeBtn.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) setOpen(false);
  });

  inputEl.addEventListener("input", () => {
    sendBtn.disabled = !inputEl.value.trim() || isBusy;
    inputEl.style.height = "auto";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 88) + "px";
  });

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) send();
    }
  });

  sendBtn.addEventListener("click", send);

  async function send() {
    const text = inputEl.value.trim();
    if (!text || isBusy) return;

    isBusy = true;
    sendBtn.disabled = true;
    inputEl.value = "";
    inputEl.style.height = "auto";

    addMessage(text, "user");

    const typing = addTyping();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerId, message: text }),
      });
      const data = await res.json();
      messagesEl.removeChild(typing);
      addMessage(data.reply || data || "Something went wrong. Please try again.", "ai");
    } catch (err) {
      messagesEl.removeChild(typing);
      addMessage("Couldn't connect. Check your connection and try again.", "ai");
    } finally {
      isBusy = false;
      sendBtn.disabled = !inputEl.value.trim();
    }
  }

  addMessage("Hi there 👋 How can I help you today?", "SupportMint-ai");
})();
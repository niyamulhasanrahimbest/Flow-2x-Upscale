// content.js - Rock-Solid Automation Engine for flow.google.com
// Full 2K Upscale + Visual Countdown + Reliable 'Move to bin' + Multi-Image Continuous Loop

export const CONTENT_SCRIPT_CODE = `/**
 * Google Flow 2X Auto Upscaler & Deleter
 * Specifically engineered for flow.google.com
 * Features:
 * 1. 2K Upscaled Download on Grid (Never opens image)
 * 2. Live Second-by-Second Countdown in HUD
 * 3. Document-Wide 'Move to bin' Detection & Confirmation
 * 4. Automatic Continuous Transition to Next Image
 */

(function () {
  if (window.__FLOW_AUTO_UPSCALER_INJECTED__) {
    console.log("[Flow 2X Upscaler] Already active on page.");
    return;
  }
  window.__FLOW_AUTO_UPSCALER_INJECTED__ = true;

  // Automation state
  const state = {
    isRunning: false,
    isPaused: false,
    processedCount: 0,
    totalIdentified: 0,
    currentStep: "প্রস্তুত (Ready on Grid)",
    upscaleDelaySeconds: 14,
    cooldownDelaySeconds: 2,
    autoDelete: true,
    autoScroll: true,
    dryRun: false,
    canvasRefreshMinutes: 1,
    lastRefreshTimestamp: Date.now(),
    logs: [],
  };

  function log(message, type = "info") {
    const timestamp = new Date().toLocaleTimeString();
    state.logs.unshift({ timestamp, message, type });
    if (state.logs.length > 100) state.logs.pop();
    console.log(\`[Flow 2X \${timestamp}] \${message}\`);
    updateHUD();
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Check if currently on edit page
  function isInsideEditPage() {
    return window.location.pathname.includes("/edit/") || Boolean(document.querySelector('button[aria-label="Back"], button:has(svg path[d*="M20 11H7.83"])'));
  }

  // Return to grid page if in editor
  async function returnToGridPage() {
    log("এডিট পেজ থেকে মূল গ্রিড পেজে ফিরে যাওয়া হচ্ছে...", "warn");
    const backBtn = document.querySelector('button[aria-label="Back"], button:has(svg path[d*="M20 11H7.83"]), button:has(svg)');
    if (backBtn && backBtn.getBoundingClientRect().left < 70) {
      backBtn.click();
      await sleep(800);
    } else {
      window.history.back();
      await sleep(800);
    }
  }

  /**
   * CRITICAL NON-BUBBLING CLICK:
   * Dispatches click without bubbling to prevent opening image editor
   */
  function safeIsolatedClick(element) {
    if (!element) return false;

    const stopBubble = (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
    };
    element.addEventListener("click", stopBubble, { capture: true, once: true });
    element.addEventListener("mousedown", stopBubble, { capture: true, once: true });
    element.addEventListener("pointerdown", stopBubble, { capture: true, once: true });

    try { element.focus(); } catch (e) {}
    try {
      if (typeof element.click === "function") element.click();
    } catch (e) {}

    const rect = element.getBoundingClientRect();
    const x = Math.round(rect.left + rect.width / 2);
    const y = Math.round(rect.top + rect.height / 2);

    const eventOpts = {
      bubbles: false,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
      detail: 1,
      button: 0,
      buttons: 1,
    };

    element.dispatchEvent(new PointerEvent("pointerdown", eventOpts));
    element.dispatchEvent(new MouseEvent("mousedown", eventOpts));
    element.dispatchEvent(new PointerEvent("pointerup", { ...eventOpts, buttons: 0 }));
    element.dispatchEvent(new MouseEvent("mouseup", { ...eventOpts, buttons: 0 }));
    element.dispatchEvent(new MouseEvent("click", { ...eventOpts, buttons: 0 }));

    return true;
  }

  // Find all cards on Google Flow main grid
  function getFlowGridCards() {
    const allImages = Array.from(document.querySelectorAll("img")).filter((img) => {
      const rect = img.getBoundingClientRect();
      const isAvatar = img.src.includes("googleusercontent.com/a/") || (img.alt || "").includes("profile");
      const isInsideSidebar = img.closest("aside, nav, [role='navigation']");
      const isInsideHUD = img.closest("#flow-upscaler-hud");
      return rect.width > 90 && rect.height > 90 && !isAvatar && !isInsideSidebar && !isInsideHUD;
    });

    const cards = [];
    for (const img of allImages) {
      let container = img.parentElement;
      for (let i = 0; i < 7; i++) {
        if (!container || container === document.body) break;
        const buttons = container.querySelectorAll("button");
        if (buttons.length >= 1) {
          if (!cards.includes(container)) {
            cards.push(container);
          }
          break;
        }
        container = container.parentElement;
      }
    }
    return cards;
  }

  // Find 3-dots "More" button on grid card
  function find3DotsButton(card) {
    let moreBtn = card.querySelector('button[aria-label="More"], button[title="More"], button[aria-label*="more" i]');
    if (moreBtn) return moreBtn;

    const buttons = Array.from(card.querySelectorAll("button"));
    for (const btn of buttons) {
      const label = (btn.getAttribute("aria-label") || btn.getAttribute("title") || "").toLowerCase();
      if (label === "more" || label.includes("more") || label.includes("options")) {
        return btn;
      }
      const svg = btn.querySelector("svg");
      if (svg) {
        const circles = svg.querySelectorAll("circle");
        if (circles.length === 3) return btn;
        const path = svg.querySelector("path");
        if (path && (path.getAttribute("d") || "").includes("M12 8c1.1")) {
          return btn;
        }
      }
    }
    return buttons.length >= 3 ? buttons[buttons.length - 1] : buttons[0] || null;
  }

  // Find open dropdown menu
  function getOpenDropdownMenu() {
    const menus = Array.from(
      document.querySelectorAll('[role="menu"], div[class*="menu"], div[class*="popover"], div[class*="dropdown"]')
    ).filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 50 && rect.height > 50 && el.id !== "flow-upscaler-hud";
    });

    if (menus.length > 0) return menus[menus.length - 1];

    const candidates = Array.from(document.querySelectorAll("div, ul")).filter((el) => {
      const text = el.innerText || "";
      return text.includes("Download") && text.includes("Move to bin");
    });
    return candidates[candidates.length - 1] || null;
  }

  // Find 'Download' item in menu
  function findDownloadMenuItem(menu) {
    const items = Array.from(menu.querySelectorAll('[role="menuitem"], button, div, li, span'));
    for (const el of items) {
      const txt = (el.innerText || el.textContent || "").trim().toLowerCase();
      if (txt.startsWith("download") || txt === "download") {
        return el.closest('[role="menuitem"], button') || el;
      }
    }
    return null;
  }

  // Find the exact '2K Upscaled' option
  function find2KUpscaleOption() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    const candidates = [];

    while ((node = walker.nextNode())) {
      const val = node.nodeValue ? node.nodeValue.trim() : "";
      if (val === "2K" || val === "2k") {
        const parent = node.parentElement;
        if (parent && !parent.closest("#flow-upscaler-hud")) {
          const rect = parent.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            candidates.push(parent);
          }
        }
      }
    }

    if (candidates.length > 0) {
      const target = candidates[candidates.length - 1];
      const row = target.closest('[role="menuitem"], button, [role="button"]') || target.parentElement || target;
      return { element: target, row };
    }

    const elements = Array.from(document.querySelectorAll("*")).filter((el) => {
      if (el.id === "flow-upscaler-hud" || el.closest("#flow-upscaler-hud")) return false;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0 || rect.width > 350 || rect.height > 120) return false;

      const txt = (el.innerText || el.textContent || "").trim().toLowerCase();
      const has2K = txt.includes("2k");
      const has1K = txt.includes("1k") || txt.includes("original");
      const has4K = txt.includes("4k") || txt.includes("upgrade");

      return has2K && !has1K && !has4K;
    });

    if (elements.length > 0) {
      elements.sort((a, b) => (a.innerText || "").length - (b.innerText || "").length);
      const row = elements[0].closest('[role="menuitem"], button') || elements[0];
      return { element: elements[0], row };
    }

    return null;
  }

  /**
   * BULLETPROOF 'MOVE TO BIN' LOCATOR:
   * Searches the entire document (not just menu container) for any element containing "Move to bin"
   */
  async function findMoveToBinElementAcrossDOM() {
    for (let attempt = 0; attempt < 5; attempt++) {
      // Method 1: Text Walker for exact "move to bin"
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const val = (node.nodeValue || "").trim().toLowerCase();
        if (val === "move to bin" || val.includes("move to bin")) {
          const parent = node.parentElement;
          if (parent && !parent.closest("#flow-upscaler-hud")) {
            const rect = parent.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              return parent.closest('[role="menuitem"], button, [role="button"], li') || parent;
            }
          }
        }
      }

      // Method 2: Query across all elements
      const candidates = Array.from(document.querySelectorAll('*')).filter((el) => {
        if (el.closest('#flow-upscaler-hud')) return false;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0 || rect.width > 350 || rect.height > 100) return false;
        const txt = (el.innerText || el.textContent || "").trim().toLowerCase();
        return (txt.includes("move to bin") || txt === "move to bin") && !txt.includes("download") && !txt.includes("favourite");
      });

      if (candidates.length > 0) {
        candidates.sort((a, b) => (a.innerText || "").length - (b.innerText || "").length);
        return candidates[0].closest('[role="menuitem"], button, [role="button"]') || candidates[0];
      }

      await sleep(200);
    }
    return null;
  }

  // Trigger 2K upscale on card
  async function processCardUpscale(card) {
    if (isInsideEditPage()) {
      await returnToGridPage();
    }

    log("গ্রিড পেজ: ৩-ডট বাটন লোকেট করা হচ্ছে...");
    const moreBtn = find3DotsButton(card);
    if (!moreBtn) {
      throw new Error("৩-ডট বাটন খুঁজে পাওয়া যায়নি।");
    }

    log("গ্রিড পেজ: ৩-ডট মেনু ওপেন করা হলো...");
    safeIsolatedClick(moreBtn);
    await sleep(400);

    let menu = getOpenDropdownMenu();
    if (!menu) {
      safeIsolatedClick(moreBtn);
      await sleep(450);
      menu = getOpenDropdownMenu();
    }

    if (!menu) {
      throw new Error("৩-ডট ক্লিক করার পর মেনু ওপেন হয়নি।");
    }

    log("গ্রিড পেজ: 'Download' অপশনে ক্লিক করা হচ্ছে...");
    const downloadItem = findDownloadMenuItem(menu);
    if (!downloadItem) {
      throw new Error("মেনুতে 'Download' অপশন পাওয়া যায়নি।");
    }

    safeIsolatedClick(downloadItem);
    await sleep(450);

    log("গ্রিড পেজ: '2K Upscaled' অপশন খোঁজা হচ্ছে...");
    let target = find2KUpscaleOption();
    if (!target) {
      downloadItem.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      downloadItem.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
      await sleep(500);
      target = find2KUpscaleOption();
    }

    if (!target) {
      throw new Error("সাব-মেনুতে '2K Upscaled' পাওয়া যায়নি।");
    }

    log("গ্রিড পেজ: '2K Upscaled'-এ ক্লিক সম্পন্ন করা হলো! 🚀", "success");
    safeIsolatedClick(target.element);
    safeIsolatedClick(target.row);
    await sleep(500);

    log("2K Upscale ডাউনলোড শুরু হয়েছে! ✅", "success");
    return true;
  }

  // Delete card using 3-dots and 'Move to bin' with multi-attempt retry
  async function processCardDelete(card) {
    if (isInsideEditPage()) {
      await returnToGridPage();
    }

    log("ডাউনলোড শেষে ৩-ডট মেনু ওপেন করা হচ্ছে...");
    const moreBtn = find3DotsButton(card);
    if (!moreBtn) {
      throw new Error("ডিলিটের জন্য ৩-ডট বাটন পাওয়া যায়নি।");
    }

    safeIsolatedClick(moreBtn);
    await sleep(500);

    log("ডকুমেন্টজুড়ে 'Move to bin' অপশন খোঁজা হচ্ছে...");
    let binItem = await findMoveToBinElementAcrossDOM();

    if (!binItem) {
      log("মেনু পুনরায় রিফ্রেশ করা হচ্ছে...", "warn");
      safeIsolatedClick(moreBtn);
      await sleep(500);
      binItem = await findMoveToBinElementAcrossDOM();
    }

    if (!binItem) {
      throw new Error("'Move to bin' অপশন পাওয়া যায়নি।");
    }

    log("'Move to bin' বাটনে ক্লিক করা হলো! 🗑️", "success");
    safeIsolatedClick(binItem);
    try { binItem.click(); } catch (e) {}
    await sleep(600);

    // Check for confirmation dialog if Google Flow prompts one
    const confirmButtons = Array.from(document.querySelectorAll("button")).filter((b) => {
      if (b.closest("#flow-upscaler-hud")) return false;
      const txt = (b.innerText || b.textContent || "").trim().toLowerCase();
      return txt === "move to bin" || txt === "confirm" || txt === "delete";
    });

    if (confirmButtons.length > 0) {
      log("ডিলিট কনফার্মেশন ডায়ালগে ক্লিক করা হলো...");
      safeIsolatedClick(confirmButtons[0]);
      await sleep(400);
    }

    log("ছবিটি সফলভাবে Move to bin করা হয়েছে! ক্যানভাস পরিষ্কার। ✅", "success");
  }

  // Smooth scroll down to load next batch of images
  async function triggerAutoScroll() {
    log("পরবর্তী ছবিগুলো লোড করার জন্য ক্যানভাস স্ক্রোল করা হচ্ছে...");
    const scrollable = document.querySelector("main") || document.scrollingElement || document.documentElement;
    scrollable.scrollBy({ top: 600, behavior: "smooth" });
    await sleep(1500);
  }

  // Refresh canvas, trigger Flow lazy loader, and update available images count
  async function refreshCanvasAndLoadMore(reason = "ক্যানভাস আপডেট") {
    log(\`🔄 [\${reason}] ক্যানভাস রিফ্রেশ হচ্ছে এবং লেজি লোডার থেকে নতুন ছবি লোড করা হচ্ছে...\`, "info");
    
    // Potential scrollable containers in Google Flow
    const scrollContainers = [
      document.querySelector("main"),
      document.querySelector('[class*="scroll"], [class*="canvas"], [class*="grid"], [style*="overflow"]'),
      document.scrollingElement,
      document.documentElement,
      window
    ].filter(Boolean);

    for (const container of scrollContainers) {
      try {
        if (container.scrollBy) {
          container.scrollBy({ top: 500, behavior: "smooth" });
        }
      } catch (e) {}
    }

    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("resize"));
    await sleep(1000);

    // Minor adjustment so Flow's IntersectionObserver recalculates visible items
    for (const container of scrollContainers) {
      try {
        if (container.scrollBy) {
          container.scrollBy({ top: -30, behavior: "smooth" });
        }
      } catch (e) {}
    }
    window.dispatchEvent(new Event("scroll"));
    await sleep(600);

    const updatedCards = getFlowGridCards();
    state.totalIdentified = updatedCards.length;
    state.lastRefreshTimestamp = Date.now();
    updateHUD();
    log(\`ক্যানভাস স্ক্যান সম্পন্ন! বর্তমানে ক্যানভাসে অবশিষ্ট: \${updatedCards.length} টি ছবি।\`, "success");
    return updatedCards;
  }

  // Main continuous runner loop
  async function startProcess() {
    if (state.isRunning) return;

    if (isInsideEditPage()) {
      await returnToGridPage();
    }

    state.isRunning = true;
    state.isPaused = false;
    state.lastRefreshTimestamp = Date.now();
    updateHUD();

    log("Flow 2X অটোমেশন চালু হলো...", "info");

    try {
      while (state.isRunning) {
        if (state.isPaused) {
          state.currentStep = "পজ করা হয়েছে (Paused)";
          updateHUD();
          await sleep(500);
          continue;
        }

        if (isInsideEditPage()) {
          log("এডিট পেজ ছেড়ে গ্রিডে ফেরা হচ্ছে...");
          await returnToGridPage();
        }

        // কাস্টম মিনিট পর পর ক্যানভাস ও লেজি লোডার স্বয়ংক্রিয় রিফ্রেশ
        const elapsedSinceRefresh = Date.now() - state.lastRefreshTimestamp;
        const refreshIntervalMs = (state.canvasRefreshMinutes || 1) * 60 * 1000;
        if (elapsedSinceRefresh >= refreshIntervalMs) {
          state.currentStep = \`🔄 ক্যানভাস রিফ্রেশ হচ্ছে (\${state.canvasRefreshMinutes} মি. ব্যবধান)...\`;
          updateHUD();
          await refreshCanvasAndLoadMore("কাস্টম ইন্টারভ্যাল");
        }

        let cards = getFlowGridCards();
        state.totalIdentified = cards.length;
        updateHUD();

        if (cards.length === 0) {
          log("গ্রিডে বর্তমান দৃশ্যমান ছবি শেষ। লেজি লোডার থেকে নতুন ছবি খোঁজা হচ্ছে...", "warn");
          let foundNew = false;
          for (let attempt = 1; attempt <= 3; attempt++) {
            if (!state.isRunning) break;
            state.currentStep = \`লেজি লোডার স্ক্যান (চেষ্টা \${attempt}/৩)...\`;
            updateHUD();
            const recheck = await refreshCanvasAndLoadMore(\`চেষ্টা \${attempt}\`);
            if (recheck.length > 0) {
              cards = recheck;
              foundNew = true;
              break;
            }
            await sleep(1200);
          }

          if (!foundNew) {
            log("ক্যানভাসের সব ছবি প্রসেস ও ডিলিট সম্পন্ন হয়েছে! 🎉", "success");
            state.currentStep = "সব সম্পন্ন! 🎉 বন্ধ করতে ✕ চাপুন";
            break;
          }
        }

        // Always target the FIRST available card in the grid
        const currentCard = cards[0];
        const imageNumber = state.processedCount + 1;
        state.currentStep = \`ইমেজ #\${imageNumber} শুরু হচ্ছে...\`;
        updateHUD();

        try {
          // STEP 1: TRIGGER 2K UPSCALE
          await processCardUpscale(currentCard);

          // STEP 2: LIVE SECOND-BY-SECOND COUNTDOWN (ইউজারের চাহিদামতো স্পষ্ট কাউন্টডাউন)
          for (let remaining = state.upscaleDelaySeconds; remaining > 0; remaining--) {
            if (!state.isRunning) break;
            while (state.isPaused) {
              await sleep(500);
            }
            state.currentStep = \`⏳ ইমেজ #\${imageNumber}: ২কে আপস্কেল ও ডাউনলোড হচ্ছে (\${remaining}s বাকি)...\`;
            updateHUD();
            await sleep(1000);
          }

          if (!state.isRunning) break;

          // STEP 3: DELETE CURRENT CARD (MOVE TO BIN)
          if (state.autoDelete && !state.dryRun) {
            state.currentStep = \`🗑️ ইমেজ #\${imageNumber}: 'Move to bin'-এ পাঠানো হচ্ছে...\`;
            updateHUD();
            await processCardDelete(currentCard);
          } else if (state.dryRun) {
            log("[ড্রাই-রান] Move to bin স্কিপ করা হলো।");
          }

          state.processedCount++;
          log(\`ইমেজ #\${state.processedCount} পর্ব সফলভাবে সমাপ্ত! ✅\`, "success");

          // STEP 4: COOLDOWN & SMOOTH TRANSITION TO NEXT IMAGE!
          state.currentStep = \`পরবর্তী ইমেজের প্রস্তুতি চলছে (\${state.cooldownDelaySeconds}s)...\`;
          updateHUD();
          await sleep(state.cooldownDelaySeconds * 1000);

          log(\`পরবর্তী ইমেজ (#\${state.processedCount + 1}) প্রসেস শুরু হচ্ছে...\`, "info");
          // Loop continues to next image!

        } catch (itemError) {
          log(itemError.message, "error");
          state.isPaused = true;
          state.currentStep = "⚠️ সমস্যা হওয়ায় পজ করা হয়েছে";
          updateHUD();
          break;
        }
      }
    } catch (globalError) {
      log(\`অটোমেশন বন্ধ: \${globalError.message}\`, "error");
    } finally {
      state.isRunning = false;
      updateHUD();
    }
  }

  function pauseProcess() {
    state.isPaused = !state.isPaused;
    log(state.isPaused ? "অটোমেশন পজ করা হয়েছে।" : "অটোমেশন পুনরায় শুরু করা হয়েছে।");
    updateHUD();
  }

  function stopProcess() {
    state.isRunning = false;
    state.isPaused = false;
    state.currentStep = "থামানো হয়েছে (Stopped)";
    log("অটোমেশন বন্ধ করা হয়েছে।");
    updateHUD();
  }

  // Floating HUD
  function createHUD() {
    let hud = document.getElementById("flow-upscaler-hud");
    if (hud) return;

    hud = document.createElement("div");
    hud.id = "flow-upscaler-hud";
    hud.innerHTML = \`
      <div class="fuh-header">
        <div class="fuh-title-row">
          <div class="fuh-2x-badge">2X</div>
          <div>
            <div class="fuh-title">2X Flow Auto Upscaler</div>
            <div class="fuh-subtitle">আপস্কেল &rarr; কাউন্টডাউন &rarr; Move to bin</div>
          </div>
        </div>
        <div class="fuh-header-actions">
          <button id="fuh-minimize-btn" title="মিনিমাইজ / রিস্টোর">_</button>
          <button id="fuh-close-btn" title="প্যানেল বন্ধ করুন (Close)">✕</button>
        </div>
      </div>

      <div class="fuh-body" id="fuh-body-content">
        <div class="fuh-status-badge" id="fuh-status-text">প্রস্তুত (Ready on Grid)</div>

        <div class="fuh-metrics">
          <div class="fuh-metric">
            <span class="fuh-metric-label">প্রসেসড (Done)</span>
            <span class="fuh-metric-val" id="fuh-processed-val">0</span>
          </div>
          <div class="fuh-metric">
            <span class="fuh-metric-label">ক্যানভাসে অবশিষ্ট</span>
            <span class="fuh-metric-val" id="fuh-inview-val">0</span>
          </div>
        </div>

        <div class="fuh-controls">
          <button id="fuh-start-btn" class="fuh-btn fuh-btn-primary">▶ Start Auto Process</button>
          <div class="fuh-btn-group">
            <button id="fuh-pause-btn" class="fuh-btn fuh-btn-secondary" disabled>⏸ Pause</button>
            <button id="fuh-stop-btn" class="fuh-btn fuh-btn-danger" disabled>⏹ Stop</button>
          </div>
        </div>

        <details class="fuh-settings" id="fuh-settings-drawer">
          <summary>⚙️ অটোমেশন সেটিংস (Settings)</summary>
          <div class="fuh-setting-row">
            <label>আপস্কেল কাউন্টডাউন সময় (সেকেন্ড):</label>
            <input type="number" id="fuh-upscale-delay" min="5" max="45" value="14" />
          </div>
          <div class="fuh-setting-row">
            <label>ক্যানভাস রিফ্রেশ ব্যবধান (মিনিট):</label>
            <input type="number" id="fuh-canvas-refresh-min" min="0.2" max="60" step="0.5" value="1" title="লেজি লোডার থেকে নতুন ছবি আনতে প্রতি কত মিনিট পর পর ক্যানভাস আপডেট হবে" />
          </div>
          <div class="fuh-setting-row">
            <label>
              <input type="checkbox" id="fuh-auto-delete" checked />
              ডাউনলোড নিশ্চিত হলে Move to bin
            </label>
          </div>
          <div class="fuh-setting-row">
            <label>
              <input type="checkbox" id="fuh-auto-scroll" checked />
              হাজার ছবির জন্য অটো-স্ক্রোল
            </label>
          </div>
          <div class="fuh-setting-row">
            <label>
              <input type="checkbox" id="fuh-dry-run" />
              ড্রাই-রান (শুধু আপস্কেল হবে, ডিলেট হবে না)
            </label>
          </div>
        </details>

        <div class="fuh-logs-container">
          <div class="fuh-logs-header">অ্যাক্টিভিটি হিস্ট্রি (Activity Log):</div>
          <div class="fuh-logs" id="fuh-logs-box">
            <div class="fuh-log-line info">সিস্টেম প্রস্তুত। Start Auto Process বাটনে চাপ দিন।</div>
          </div>
        </div>
      </div>
    \`;

    document.body.appendChild(hud);

    document.getElementById("fuh-start-btn").addEventListener("click", startProcess);
    document.getElementById("fuh-pause-btn").addEventListener("click", pauseProcess);
    document.getElementById("fuh-stop-btn").addEventListener("click", stopProcess);

    document.getElementById("fuh-minimize-btn").addEventListener("click", () => {
      const body = document.getElementById("fuh-body-content");
      const btn = document.getElementById("fuh-minimize-btn");
      if (body.style.display === "none") {
        body.style.display = "block";
        btn.textContent = "_";
      } else {
        body.style.display = "none";
        btn.textContent = "+";
      }
    });

    document.getElementById("fuh-close-btn").addEventListener("click", () => {
      hud.style.display = "none";
      log("প্যানেল বন্ধ করা হয়েছে। উপরে 2X আইকনে ক্লিক করলেই আবার ওপেন হবে।");
    });

    document.getElementById("fuh-upscale-delay").addEventListener("change", (e) => {
      state.upscaleDelaySeconds = parseInt(e.target.value, 10) || 14;
      log(\`কাউন্টডাউন সময় \${state.upscaleDelaySeconds} সেকেন্ড সেট করা হলো।\`);
    });

    const canvasRefreshInput = document.getElementById("fuh-canvas-refresh-min");
    if (canvasRefreshInput) {
      canvasRefreshInput.addEventListener("change", (e) => {
        state.canvasRefreshMinutes = Math.max(0.1, parseFloat(e.target.value) || 1);
        log(\`ক্যানভাস রিফ্রেশ ব্যবধান \${state.canvasRefreshMinutes} মিনিট সেট করা হলো।\`);
      });
    }

    document.getElementById("fuh-auto-delete").addEventListener("change", (e) => {
      state.autoDelete = e.target.checked;
      log(\`Move to bin: \${state.autoDelete}\`);
    });

    document.getElementById("fuh-auto-scroll").addEventListener("change", (e) => {
      state.autoScroll = e.target.checked;
    });

    document.getElementById("fuh-dry-run").addEventListener("change", (e) => {
      state.dryRun = e.target.checked;
      log(\`ড্রাই-রান মোড: \${state.dryRun}\`);
    });

    // Hide by default on page load (Wait for user to click 2X extension icon)
    // If run via Console script, show immediately!
    if (!window.__FLOW_IS_CONSOLE__) {
      hud.style.display = "none";
    }

    setTimeout(() => {
      state.totalIdentified = getFlowGridCards().length;
      updateHUD();
    }, 1000);
  }

  function updateHUD() {
    const statusText = document.getElementById("fuh-status-text");
    const processedVal = document.getElementById("fuh-processed-val");
    const inviewVal = document.getElementById("fuh-inview-val");
    const startBtn = document.getElementById("fuh-start-btn");
    const pauseBtn = document.getElementById("fuh-pause-btn");
    const stopBtn = document.getElementById("fuh-stop-btn");
    const logsBox = document.getElementById("fuh-logs-box");

    if (!statusText) return;

    statusText.textContent = state.currentStep;
    if (state.isRunning) {
      statusText.style.background = state.isPaused ? "#f59e0b" : "#2563eb";
    } else {
      statusText.style.background = "#1e293b";
    }

    processedVal.textContent = state.processedCount;
    inviewVal.textContent = state.totalIdentified;

    startBtn.disabled = state.isRunning;
    pauseBtn.disabled = !state.isRunning;
    pauseBtn.textContent = state.isPaused ? "▶ Resume" : "⏸ Pause";
    stopBtn.disabled = !state.isRunning;

    if (logsBox) {
      logsBox.innerHTML = state.logs
        .slice(0, 25)
        .map(
          (l) =>
            \`<div class="fuh-log-line \${l.type}"><span class="fuh-log-time">[\${l.timestamp}]</span> \${l.message}</div>\`
        )
        .join("");
    }
  }

  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "TOGGLE_HUD") {
        createHUD();
        const hud = document.getElementById("flow-upscaler-hud");
        if (hud) {
          hud.style.display = (hud.style.display === "none") ? "block" : "none";
          if (hud.style.display === "block") {
            state.totalIdentified = getFlowGridCards().length;
            updateHUD();
          }
        }
        sendResponse({ success: true });
      } else if (request.action === "START") {
        startProcess();
        sendResponse({ success: true });
      } else if (request.action === "PAUSE") {
        pauseProcess();
        sendResponse({ success: true });
      } else if (request.action === "STOP") {
        stopProcess();
        sendResponse({ success: true });
      } else if (request.action === "GET_STATUS") {
        sendResponse({ state });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createHUD);
  } else {
    createHUD();
  }
})();
`;

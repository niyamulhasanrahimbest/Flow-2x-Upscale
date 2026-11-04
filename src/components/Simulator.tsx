import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Trash2,
  CheckCircle,
  MoreVertical,
  ChevronRight,
  Sparkles,
  Info,
  Clock,
  Layers,
  Heart,
  Undo2,
  Folder,
  Wrench,
  Plus,
  X,
  Minus
} from "lucide-react";

interface SimCard {
  id: number;
  title: string;
  image: string;
  status: "idle" | "targeting" | "menu" | "submenu" | "upscaling" | "downloading" | "deleting" | "deleted";
}

const INITIAL_CARDS: SimCard[] = [
  {
    id: 1,
    title: "Rose flower isolated white backg...",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    status: "idle",
  },
  {
    id: 2,
    title: "Red rose close up stem petals",
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=600&q=80",
    status: "idle",
  },
  {
    id: 3,
    title: "Blooming single red rose lying flat",
    image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=600&q=80",
    status: "idle",
  },
  {
    id: 4,
    title: "Fresh red rose garden bloom",
    image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=600&q=80",
    status: "idle",
  },
];

export const Simulator: React.FC = () => {
  const [cards, setCards] = useState<SimCard[]>(INITIAL_CARDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStepText, setCurrentStepText] = useState("Ready. Click 'Start Auto Simulation' to begin.");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState<"none" | "main" | "downloadSub" | "deleteConfirm">("none");
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("Upscaling your image. Download will start automatically.");
  const [logs, setLogs] = useState<Array<{ time: string; text: string; type: "info" | "success" | "warn" }>>([
    { time: "00:00", text: "Interactive Google Flow simulator loaded. 4 cards on canvas.", type: "info" }
  ]);
  const [processedCount, setProcessedCount] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1x, 2x, 3x for faster test
  const [isHudVisible, setIsHudVisible] = useState(true);
  const [isHudMinimized, setIsHudMinimized] = useState(false);

  const isRunningRef = useRef(isRunning);
  const isPausedRef = useRef(isPaused);
  isRunningRef.current = isRunning;
  isPausedRef.current = isPaused;

  const addLog = (text: string, type: "info" | "success" | "warn" = "info") => {
    const time = new Date().toLocaleTimeString().split(" ")[0];
    setLogs((prev) => [{ time, text, type }, ...prev.slice(0, 40)]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms / speedMultiplier));

  const runSimulationLoop = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsPaused(false);
    addLog("Starting automated 2K upscale & auto-delete simulation...", "info");

    let remainingCards = cards.filter((c) => c.status !== "deleted");

    while (remainingCards.length > 0 && isRunningRef.current) {
      if (isPausedRef.current) {
        await sleep(300);
        continue;
      }

      const card = remainingCards[0];
      setActiveCardId(card.id);

      // Step 1: Target Card
      setCurrentStepText(`Image #${card.id}: Hovering card & locating 3-dots 'More' button`);
      addLog(`[Image #${card.id}] Card focused. Simulating mouse hover.`, "info");
      setActiveMenu("none");
      await sleep(1000);
      if (!isRunningRef.current) break;

      // Step 2: Open Menu
      setCurrentStepText(`Image #${card.id}: Clicking 3-dots 'More' button`);
      setActiveMenu("main");
      addLog(`[Image #${card.id}] 3-dots menu opened.`, "info");
      await sleep(1200);
      if (!isRunningRef.current) break;

      // Step 3: Hover 'Download >'
      setCurrentStepText(`Image #${card.id}: Hovering 'Download >' to reveal upscale sub-menu`);
      setActiveMenu("downloadSub");
      addLog(`[Image #${card.id}] 'Download >' hovered. Submenu expanded.`, "info");
      await sleep(1200);
      if (!isRunningRef.current) break;

      // Step 4: Click '2K Upscaled'
      setCurrentStepText(`Image #${card.id}: Clicking '2K Upscaled' 🚀`);
      addLog(`[Image #${card.id}] Clicked '2K Upscaled' (2X resolution).`, "success");
      setActiveMenu("none");
      setShowToast(true);
      setToastText("Upscaling your image. Download will start automatically.");
      await sleep(1500);
      if (!isRunningRef.current) break;

      // Step 5: Wait for upscale & browser download trigger
      setCurrentStepText(`Image #${card.id}: Generating 2K upscale & waiting for download...`);
      addLog(`[Image #${card.id}] Toast detected. Waiting for 2K file generation...`, "info");
      await sleep(2500);
      if (!isRunningRef.current) break;

      setShowToast(false);
      addLog(`[Image #${card.id}] Download complete: 'flow_rose_${card.id}_2k.png'`, "success");

      // Step 6: Re-open 3-dots and click 'Move to bin'
      setCurrentStepText(`Image #${card.id}: Re-opening 3-dots to 'Move to bin' 🗑️`);
      setActiveMenu("main");
      await sleep(1000);
      if (!isRunningRef.current) break;

      setCurrentStepText(`Image #${card.id}: Clicking 'Move to bin'...`);
      addLog(`[Image #${card.id}] Clicked 'Move to bin'. Purging from canvas.`, "warn");
      await sleep(800);
      setActiveMenu("none");

      // Step 7: Delete card
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, status: "deleted" } : c))
      );
      setProcessedCount((prev) => prev + 1);
      addLog(`[Image #${card.id}] Successfully moved to bin and removed from canvas! ✅`, "success");
      setActiveCardId(null);

      // Brief cooldown before next image
      setCurrentStepText(`Cooldown buffer before next image...`);
      await sleep(1000);

      // Refresh remaining
      remainingCards = remainingCards.slice(1);
    }

    setIsRunning(false);
    setIsPaused(false);
    setActiveCardId(null);
    setActiveMenu("none");
    setShowToast(false);
    setCurrentStepText("All images processed and cleaned into Bin! 🎉");
    addLog("Simulation batch completed successfully. All images downloaded at 2K and purged.", "success");
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => {
      const next = !prev;
      addLog(next ? "Automation simulation paused." : "Automation simulation resumed.", "info");
      return next;
    });
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setActiveMenu("none");
    setActiveCardId(null);
    setShowToast(false);
    setCurrentStepText("Simulation stopped.");
    addLog("Simulation stopped by user.", "warn");
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setActiveMenu("none");
    setActiveCardId(null);
    setShowToast(false);
    setCards(INITIAL_CARDS.map((c) => ({ ...c, status: "idle" })));
    setProcessedCount(0);
    setCurrentStepText("Reset canvas. Ready to simulate.");
    addLog("Canvas reset with 4 demo images.", "info");
  };

  const visibleCards = cards.filter((c) => c.status !== "deleted");

  return (
    <div className="space-y-6">
      {/* Simulation Control Dashboard */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-base font-bold text-white">
                Google Flow (flow.google.com) Interactive Simulator
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              আপনার আপলোড করা স্কিনশট অনুযায়ী ৩-ডট &rarr; Download &rarr; 2K Upscaled &rarr; Move to bin অটোমেশনটি এখানে লাইভ টেস্ট করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!isRunning ? (
              <button
                onClick={runSimulationLoop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" /> Start Auto Simulation
              </button>
            ) : (
              <>
                <button
                  onClick={handlePauseResume}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer"
                >
                  <Pause className="w-4 h-4" /> {isPaused ? "Resume" : "Pause"}
                </button>
                <button
                  onClick={handleStop}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Stop
                </button>
              </>
            )}

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 cursor-pointer"
              title="Reset Cards"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>

            {/* Speed toggle */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
              <span className="text-slate-500 px-2">Speed:</span>
              {[1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeedMultiplier(s)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    speedMultiplier === s ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Step Tracker Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Current Action:</span>
            <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
              {currentStepText}
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span>Processed: <strong className="text-emerald-400">{processedCount}</strong></span>
            <span>Remaining: <strong className="text-blue-400">{visibleCards.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Flow UI Mockup Window (Matches Screenshot 1 & 2) */}
      <div className="bg-[#0b0c10] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Mockup Browser Chrome Bar */}
        <div className="bg-[#15171e] px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block" />
            </div>
            <div className="ml-3 px-3 py-1 bg-black/40 rounded-md border border-slate-800 font-mono text-[11px] text-slate-300 flex items-center gap-1.5">
              <span>🔒</span>
              <span>https://flow.google.com/project/7e778282-a311-4811-88e1-e788964e52ec</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Pinned 2X Extension Icon */}
            <button
              onClick={() => {
                setIsHudVisible((v) => !v);
                addLog(!isHudVisible ? "Extension toolbar icon clicked: HUD opened on canvas." : "Extension toolbar icon clicked: HUD closed.", "info");
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-white transition-all cursor-pointer ${
                isHudVisible
                  ? "bg-blue-600/30 border-blue-400/60 shadow-md shadow-blue-500/30 ring-1 ring-blue-400/50"
                  : "bg-slate-850 border-slate-700 hover:border-blue-400/40 text-slate-400"
              }`}
              title="Click to toggle Google Flow 2X Upscaler HUD"
            >
              <span className="w-4 h-4 rounded bg-blue-600 font-black text-[9px] flex items-center justify-center text-white shadow">2X</span>
              <span className="text-[10px] font-bold text-blue-200 hidden md:inline">
                {isHudVisible ? "2X HUD Active" : "Click 2X to Open HUD"}
              </span>
            </button>
            <span className="text-[11px] text-slate-500">Google Flow Canvas UI Reproduction</span>
          </div>
        </div>

        {/* Google Flow Top Bar (Matches Screenshot) */}
        <div className="bg-[#050608] px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-200">Nov 01 - 17:09</span>
            <MoreVertical className="w-4 h-4 text-slate-500" />
          </div>

          <div className="hidden sm:flex items-center w-72 bg-[#171922] rounded-full px-3 py-1.5 text-xs text-slate-400 border border-white/5">
            <span className="mr-2">🔍</span> Search
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">PRO</span>
            <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-[11px] flex items-center justify-center">
              S
            </div>
          </div>
        </div>

        {/* Content Layout: Left Sidebar + Canvas */}
        <div className="flex min-h-[440px] bg-black relative overflow-hidden">
          {/* Flow Left Sidebar */}
          <div className="w-44 border-r border-white/5 bg-[#090a0f] p-3 hidden sm:flex flex-col justify-between text-xs text-slate-400 select-none">
            <div className="space-y-1">
              <div className="px-2.5 py-1.5 rounded-lg bg-white/10 text-white font-medium flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-blue-400" /> All media
              </div>
              <div className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-400 flex items-center gap-2 cursor-pointer">
                <span>🖼️</span> Images
              </div>
              <div className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-400 flex items-center gap-2 cursor-pointer">
                <span>👤</span> Characters
              </div>
              <div className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-400 flex items-center gap-2 cursor-pointer">
                <span>🎬</span> Scenes
              </div>
              <div className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-400 flex items-center gap-2 cursor-pointer">
                <Folder className="w-3.5 h-3.5" /> Library
              </div>
              <div className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-400 flex items-center gap-2 cursor-pointer">
                <Wrench className="w-3.5 h-3.5" /> Tools
              </div>
            </div>

            <div className="space-y-1 pt-4 border-t border-white/5">
              <div className={`px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                processedCount > 0 ? "text-rose-400 bg-rose-500/10 font-medium" : "text-slate-400"
              }`}>
                <Trash2 className="w-3.5 h-3.5" /> Bin {processedCount > 0 && `(${processedCount})`}
              </div>
              <div className="text-[10px] text-slate-600 px-2 pt-2">
                Google Flow AI Studio
              </div>
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 p-6 sm:p-8 flex items-center justify-center relative overflow-x-auto">
            {/* Top Right Toast Notification (Matching Screenshot 5) */}
            {showToast && (
              <div className="absolute top-4 right-4 z-50 bg-[#121319] border border-blue-500/40 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 max-w-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                <div className="text-xs">
                  <p className="font-medium text-slate-200">{toastText}</p>
                </div>
                <button
                  onClick={() => setShowToast(false)}
                  className="text-[10px] text-blue-400 hover:text-blue-300 ml-2 font-semibold"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* In-Canvas Cards Grid (Matches User's Demo 4 Rose Images) */}
            {visibleCards.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">All Images Processed &amp; Moved to Bin!</h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  সবগুলো ছবি সফলভাবে 2K আপস্কেল ডাউনলোডের পর বিন (Bin)-এ সরিয়ে ফেলা হয়েছে। ক্যানভাস এখন সম্পূর্ণ খালি।
                </p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
                >
                  ডেমো ছবি পুনরায় লোড করুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                {visibleCards.map((card) => {
                  const isCurrent = activeCardId === card.id;

                  return (
                    <div
                      key={card.id}
                      className={`relative rounded-2xl overflow-hidden bg-[#181920] border transition-all duration-300 group aspect-square flex flex-col justify-between ${
                        isCurrent
                          ? "border-blue-500 ring-2 ring-blue-500/40 shadow-2xl scale-[1.02]"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover absolute inset-0"
                      />

                      {/* Top Gradient & Action Buttons (Matches Screenshot 2) */}
                      <div className="relative z-10 p-2.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-end gap-1">
                        <button className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors">
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors">
                          <Undo2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className={`p-1 rounded-full transition-all cursor-pointer ${
                            isCurrent && activeMenu !== "none"
                              ? "bg-rose-500 text-white ring-2 ring-rose-300"
                              : "text-white/80 hover:text-white hover:bg-white/20"
                          }`}
                          title="More"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Dropdown Menu Popup (Matches Screenshot 3, 4, 6) */}
                      {isCurrent && activeMenu !== "none" && (
                        <div className="absolute top-10 right-2 z-40 w-44 bg-[#14151b] border border-white/15 rounded-xl shadow-2xl py-1.5 text-xs text-slate-200 animate-in fade-in zoom-in-95 duration-150">
                          <div className="px-3 py-1.5 text-slate-400 hover:bg-white/5 flex items-center gap-2">
                            <Heart className="w-3 h-3" /> Favourite
                          </div>
                          <div className="px-3 py-1.5 text-slate-400 hover:bg-white/5 flex items-center gap-2">
                            <Undo2 className="w-3 h-3" /> Reuse prompt
                          </div>
                          <div className="px-3 py-1.5 text-slate-400 hover:bg-white/5 flex items-center gap-2">
                            <span>🎬</span> Animate
                          </div>
                          <div className="px-3 py-1.5 text-slate-400 hover:bg-white/5 flex items-center gap-2">
                            <Plus className="w-3 h-3" /> Add to prompt
                          </div>

                          {/* Download Item with Submenu Trigger (Matches Screenshot 3 & 4) */}
                          <div
                            className={`px-3 py-1.5 flex items-center justify-between cursor-pointer relative transition-colors ${
                              activeMenu === "downloadSub"
                                ? "bg-blue-600 text-white font-semibold"
                                : "hover:bg-white/10 text-white"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Download className="w-3 h-3" /> Download
                            </span>
                            <ChevronRight className="w-3 h-3" />

                            {/* Submenu (Matches Screenshot 4) */}
                            {activeMenu === "downloadSub" && (
                              <div className="absolute left-full top-0 ml-1 w-36 bg-[#161720] border border-white/15 rounded-xl shadow-2xl py-1.5 text-xs z-50 animate-in fade-in slide-in-from-left-2">
                                <div className="px-3 py-1.5 text-slate-400 hover:bg-white/5 flex flex-col">
                                  <span className="font-medium text-slate-300">1K</span>
                                  <span className="text-[10px] text-slate-500">Original size</span>
                                </div>
                                <div className="px-3 py-1.5 bg-blue-600/30 text-blue-200 border-l-2 border-blue-400 flex flex-col">
                                  <div className="flex items-center justify-between font-bold text-white">
                                    <span>2K</span>
                                    <span className="text-[9px] bg-blue-500 text-white px-1 rounded">Target</span>
                                  </div>
                                  <span className="text-[10px] text-blue-300">Upscaled</span>
                                </div>
                                <div className="px-3 py-1.5 text-slate-500 flex items-center justify-between opacity-60">
                                  <div>
                                    <span>4K</span>
                                    <span className="block text-[9px]">Upscaled</span>
                                  </div>
                                  <span className="text-[9px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded">Upgrade</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="px-3 py-1.5 text-slate-400 hover:bg-white/5">Copy</div>
                          <div className="px-3 py-1.5 text-slate-400 hover:bg-white/5">Rename</div>
                          <div className="px-3 py-1.5 text-slate-400 hover:bg-white/5">Share</div>

                          <div className="my-1 border-t border-white/10" />

                          {/* Move to Bin (Matches Screenshot 6) */}
                          <div
                            className={`px-3 py-1.5 text-rose-400 flex items-center gap-2 cursor-pointer transition-colors ${
                              currentStepText.includes("Move to bin")
                                ? "bg-rose-500/30 text-rose-200 font-bold border-l-2 border-rose-400"
                                : "hover:bg-rose-500/10"
                            }`}
                          >
                            <Trash2 className="w-3 h-3 text-rose-400" /> Move to bin
                          </div>
                        </div>
                      )}

                      {/* Bottom Gradient & Prompt Text (Matches Screenshot 1) */}
                      <div className="relative z-10 p-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <div className="text-[10px] text-white/90 truncate font-sans">
                          {card.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Realistic Floating HUD Overlay (Matches User's Screenshots image_2714f4f8.png) */}
            {isHudVisible ? (
              <div className="absolute bottom-4 right-4 z-40 w-72 bg-[#121218]/95 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl text-white font-sans overflow-hidden transition-all duration-200">
                {/* HUD Header */}
                <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center font-black text-white text-[11px] border border-blue-300/40 shadow">
                      2X
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">2X Flow Auto Upscaler</div>
                      <div className="text-[9px] text-slate-400">আপস্কেল &rarr; কাউন্টডাউন &rarr; Move to bin</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsHudMinimized((v) => !v)}
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 text-xs font-bold"
                      title="Minimize / Restore"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        setIsHudVisible(false);
                        addLog("HUD ✕ button clicked: Panel closed. Click 2X in toolbar to reopen.", "info");
                      }}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-colors cursor-pointer"
                      title="প্যানেল বন্ধ করুন (Close)"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {!isHudMinimized && (
                  <div className="p-3 space-y-2.5 text-xs">
                    {/* Status Badge */}
                    <div
                      className={`px-2.5 py-1.5 rounded-lg text-center font-semibold text-[11px] truncate border ${
                        isRunning
                          ? isPaused
                            ? "bg-amber-600/30 text-amber-200 border-amber-500/40"
                            : "bg-blue-600 text-white border-blue-400/50 shadow"
                          : "bg-slate-800 text-slate-200 border-white/10"
                      }`}
                    >
                      {currentStepText}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                        <span className="block text-[9px] text-slate-400 uppercase tracking-wider">প্রসেসড (Done)</span>
                        <span className="text-base font-bold text-sky-400">{processedCount}</span>
                      </div>
                      <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                        <span className="block text-[9px] text-slate-400 uppercase tracking-wider">ক্যানভাসে অবশিষ্ট</span>
                        <span className="text-base font-bold text-sky-400">{visibleCards.length}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-1.5">
                      <button
                        onClick={runSimulationLoop}
                        disabled={isRunning}
                        className="w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" /> Start Auto Process
                      </button>

                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={handlePauseResume}
                          disabled={!isRunning}
                          className="py-1 px-2 rounded-lg bg-white/10 hover:bg-white/15 disabled:opacity-40 text-slate-200 font-semibold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Pause className="w-3 h-3" /> {isPaused ? "Resume" : "Pause"}
                        </button>
                        <button
                          onClick={handleStop}
                          disabled={!isRunning}
                          className="py-1 px-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 disabled:opacity-40 text-rose-300 border border-rose-500/30 font-semibold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                        >
                          Stop
                        </button>
                      </div>
                    </div>

                    <div className="pt-1 text-[10px] text-slate-400 text-center border-t border-white/5">
                      💡 উপরে টুলবারের <strong>2X</strong> আইকন বা <strong>✕</strong> চাপলে প্যানেল বন্ধ হবে
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsHudVisible(true);
                  addLog("Floating HUD opened on canvas.", "info");
                }}
                className="absolute bottom-4 right-4 z-40 px-3 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-bold shadow-xl flex items-center gap-1.5 border border-blue-400/40 cursor-pointer animate-in fade-in"
                title="টুলবারে ক্লিক করার মতোই HUD ওপেন করুন"
              >
                <span className="w-3.5 h-3.5 rounded bg-white text-blue-700 text-[8px] font-black flex items-center justify-center">2X</span>
                Open Flow HUD
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Simulator Execution Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            Simulator Execution Log (সিমুলেটর অ্যাক্টিভিটি হিস্ট্রি)
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {logs.length} events logged
          </span>
        </div>
        <div className="h-32 overflow-y-auto font-mono text-xs space-y-1.5 p-2 bg-[#090b10] rounded-lg border border-slate-800/80 scrollbar-thin">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`leading-relaxed ${
                log.type === "success"
                  ? "text-emerald-400"
                  : log.type === "warn"
                  ? "text-rose-400"
                  : "text-slate-400"
              }`}
            >
              <span className="text-slate-600">[{log.time}]</span> {log.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

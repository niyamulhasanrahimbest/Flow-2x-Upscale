import React from "react";
import { Download, Sparkles, CheckCircle2, Bot, Layers } from "lucide-react";

interface HeaderProps {
  onDownloadZip: () => void;
  isDownloading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onDownloadZip,
  isDownloading,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold text-lg">
              2X
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Google Flow Auto 2X Upscaler &amp; Cleaner
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Ready for Chrome
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                flow.google.com-এর জন্য স্বয়ংক্রিয় ২কে আপস্কেল ডাউনলোড ও অটো &quot;Move to bin&quot; এক্সটেনশন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onDownloadZip}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Generating ZIP..." : "Download Extension (.ZIP)"}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-2 border-t border-slate-800/80 pt-1 overflow-x-auto scrollbar-none">
          {[
            { id: "overview", label: "Overview & Screenshots", icon: Layers },
            { id: "simulator", label: "Live Visual Simulator", icon: Bot },
            { id: "console", label: "1-Click Console Script", icon: Sparkles },
            { id: "install", label: "ইনস্টলেশন গাইড (Setup Guide)", icon: CheckCircle2 },
            { id: "code", label: "Extension Source Code", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "border-blue-500 text-blue-400 bg-blue-500/5"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

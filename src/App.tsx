import React, { useState } from "react";
import { Header } from "./components/Header";
import { ScreenshotGallery } from "./components/ScreenshotGallery";
import { Simulator } from "./components/Simulator";
import { ConsoleRunnerTab } from "./components/ConsoleRunnerTab";
import { InstallGuideTab } from "./components/InstallGuideTab";
import { CodeViewerTab } from "./components/CodeViewerTab";
import { generateExtensionZip } from "./utils/zipGenerator";
import { CheckCircle2, Download, Zap, Sparkles } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      const zipBlob = await generateExtensionZip();
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "google-flow-upscaler-extension.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadSuccessToast(true);
      setTimeout(() => setDownloadSuccessToast(false), 5000);
    } catch (err) {
      console.error("Failed to generate zip:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Header
        onDownloadZip={handleDownloadZip}
        isDownloading={isDownloading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Download Success Floating Toast */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/40 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">ZIP ডাউনলোড শুরু হয়েছে!</div>
            <div className="text-xs text-slate-300">
              ফাইলটি আনজিপ করে chrome://extensions-এ Load unpacked করুন।
            </div>
          </div>
          <button
            onClick={() => {
              setActiveTab("install");
              setDownloadSuccessToast(false);
            }}
            className="ml-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
          >
            গাইড দেখুন
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === "overview" && (
          <ScreenshotGallery
            onGoToSimulator={() => setActiveTab("simulator")}
            onDownloadZip={handleDownloadZip}
          />
        )}

        {activeTab === "simulator" && <Simulator />}

        {activeTab === "console" && <ConsoleRunnerTab />}

        {activeTab === "install" && (
          <InstallGuideTab
            onDownloadZip={handleDownloadZip}
            isDownloading={isDownloading}
          />
        )}

        {activeTab === "code" && (
          <CodeViewerTab
            onDownloadZip={handleDownloadZip}
            isDownloading={isDownloading}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-slate-400 font-medium">Google Flow 2X Auto Upscaler &amp; Cleaner</span>
            <span>&bull;</span>
            <span>Manifest V3 Compliant</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab("simulator")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              সিমুলেটর টেস্ট
            </button>
            <span>&bull;</span>
            <button
              onClick={() => setActiveTab("console")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              কনসোল স্ক্রিপ্ট
            </button>
            <span>&bull;</span>
            <button
              onClick={() => setActiveTab("install")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ইনস্টলেশন গাইড
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

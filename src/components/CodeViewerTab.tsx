import React, { useState } from "react";
import { FileCode, Copy, Check, DownloadCloud } from "lucide-react";
import { EXTENSION_MANIFEST } from "../extension-files/manifest";
import { CONTENT_SCRIPT_CODE } from "../extension-files/contentScript";
import { CONTENT_CSS_CODE } from "../extension-files/contentCss";
import { BACKGROUND_SCRIPT_CODE, POPUP_HTML_CODE, POPUP_JS_CODE } from "../extension-files/backgroundAndPopup";

interface CodeViewerTabProps {
  onDownloadZip: () => void;
  isDownloading: boolean;
}

export const CodeViewerTab: React.FC<CodeViewerTabProps> = ({
  onDownloadZip,
  isDownloading,
}) => {
  const [activeFile, setActiveFile] = useState<string>("content.js");
  const [copied, setCopied] = useState(false);

  const filesMap: Record<string, { code: string; language: string; desc: string }> = {
    "content.js": {
      code: CONTENT_SCRIPT_CODE,
      language: "javascript",
      desc: "Primary automation engine: handles card detection, 3-dots menu click, Download hover, 2K Upscaled click, toast detection, and 'Move to bin' deletion.",
    },
    "manifest.json": {
      code: JSON.stringify(EXTENSION_MANIFEST, null, 2),
      language: "json",
      desc: "Chrome Extension Manifest V3 configuration matching permissions for flow.google.com.",
    },
    "content.css": {
      code: CONTENT_CSS_CODE,
      language: "css",
      desc: "Styles for the floating HUD widget injected onto the flow.google.com canvas.",
    },
    "background.js": {
      code: BACKGROUND_SCRIPT_CODE,
      language: "javascript",
      desc: "Service worker that monitors browser downloads and notifies the active tab.",
    },
    "popup.html": {
      code: POPUP_HTML_CODE,
      language: "html",
      desc: "Chrome extension popup toolbar interface.",
    },
    "popup.js": {
      code: POPUP_JS_CODE,
      language: "javascript",
      desc: "Popup click handlers and quick launcher.",
    },
  };

  const currentFileData = filesMap[activeFile] || filesMap["content.js"];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFileData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            এক্সটেনশন সোর্স কোড ইন্সপেক্টর (Source Code)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            এক্সটেনশনের প্রতিটি ফাইলের সম্পূর্ণ এবং স্বচ্ছ সোর্স কোড এখানে দেখতে পারেন।
          </p>
        </div>

        <button
          onClick={onDownloadZip}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow cursor-pointer self-start sm:self-auto"
        >
          <DownloadCloud className="w-4 h-4" />
          {isDownloading ? "Generating..." : "Download Entire ZIP"}
        </button>
      </div>

      {/* File Selector Tabs */}
      <div className="flex space-x-1 border-b border-slate-800 overflow-x-auto scrollbar-none pb-1">
        {Object.keys(filesMap).map((fileName) => (
          <button
            key={fileName}
            onClick={() => setActiveFile(fileName)}
            className={`flex items-center gap-2 px-3 py-2 rounded-t-lg text-xs font-mono transition-colors cursor-pointer ${
              activeFile === fileName
                ? "bg-slate-800 text-blue-400 font-bold border-t-2 border-blue-500"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            {fileName}
          </button>
        ))}
      </div>

      {/* Code Display Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="font-mono font-semibold text-white">{activeFile}</span>
            <span className="text-slate-500 text-[11px] ml-2 hidden sm:inline">{currentFileData.desc}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy File"}
          </button>
        </div>

        <div className="p-4 overflow-x-auto max-h-[500px] text-xs font-mono text-slate-300 bg-[#090b10] leading-relaxed scrollbar-thin">
          <pre>{currentFileData.code}</pre>
        </div>
      </div>
    </div>
  );
};

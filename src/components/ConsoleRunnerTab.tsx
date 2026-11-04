import React, { useState } from "react";
import { Copy, Check, Terminal, ExternalLink, AlertCircle, Sparkles } from "lucide-react";
import { STANDALONE_BOOKMARKLET_CODE } from "../extension-files/bookmarkletCode";

export const ConsoleRunnerTab: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(STANDALONE_BOOKMARKLET_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Solution Banner for Page 2 & 2K Click Issue */}
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <Check className="w-5 h-5 bg-emerald-500/20 p-0.5 rounded-full" />
          ২নং ক্যানভাস পেজে ফিক্স সম্পন্ন (Strict Page #2 Execution)
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          আপনার পাঠানো স্ক্রিনশট (<code className="text-emerald-400 font-mono">image_876fc154.png</code> এবং <code className="text-emerald-400 font-mono">image_2b132ca7.png</code>) থেকে বোঝা গেছে স্ক্রিপ্টটি কার্ডে ক্লিক করায় গুগল ফ্লো মূল ক্যানভাস পেজ (২নং পেজ) ছেড়ে এডিট পেজে চলে গিয়েছিল।
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
            <strong className="text-white">কেন এডিট পেজে যাচ্ছিল?</strong>
            <p className="text-slate-400">কোড কার্ডের ওপর ক্লিক করায় গুগল ফ্লো ভেবেছিল ব্যবহারকারী ছবিটি এডিট করতে চায়, ফলে ক্যানভাস থেকে এডিট পেজে ঢুকে গিয়েছিল।</p>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
            <strong className="text-white">এখন যেভাবে ২নং পেজে সমাধান করা হয়েছে:</strong>
            <p className="text-slate-400">কার্ডের ওপর যেকোনো ক্লিক সম্পূর্ণ নিষিদ্ধ করা হয়েছে! শুধুমাত্র ৩-ডট বাটন, Download ও 2K অপশনে ক্লিক করা হচ্ছে যাতে ২নং মূল ক্যানভাস পেজেই সব কাজ হয়।</p>
          </div>
        </div>
      </div>

      {/* Introduction Card */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-2">
          <Sparkles className="w-4 h-4" /> ইনস্ট্যান্ট টেস্ট মেথড (No Extension Installation Needed)
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          ১-ক্লিকে ব্রাউজার কনসোলে চালিয়ে সরাসরি টেস্ট করুন
        </h2>
        <p className="text-slate-300 text-sm mt-2 leading-relaxed">
          যদি আপনি এক্সটেনশন ইনস্টল করার ঝামেলা ছাড়াই এখনই আপনার <span className="text-blue-400 font-mono">flow.google.com</span> প্রজেক্টে
          অটোমেশনটি পরীক্ষা করতে চান, তবে নিচের কোডটি কপি করে ব্রাউজার কনসোলে পেস্ট করে এন্টার চাপুন। এটি পেজে সরাসরি
          <strong> Floating HUD কন্ট্রোল প্যানেল</strong> যুক্ত করে দেবে!
        </p>

        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            {copied ? "কোড কপি হয়েছে! (Copied)" : "সম্পূর্ণ স্ক্রিপ্ট কপি করুন (Copy Script)"}
          </button>
          <a
            href="https://flow.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700"
          >
            Open flow.google.com <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Step by step visual instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 font-bold flex items-center justify-center text-sm border border-blue-500/20">
            1
          </div>
          <h4 className="font-semibold text-white text-sm">গুগল ফ্লো পেজে যান</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            ক্রোম ব্রাউজারে <code className="text-blue-400">flow.google.com/project/...</code> যে প্রজেক্টে শত শত ছবি রয়েছে সেটি ওপেন করুন।
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center text-sm border border-indigo-500/20">
            2
          </div>
          <h4 className="font-semibold text-white text-sm">কনসোল ওপেন করুন</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            কীবোর্ডে <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-200 text-[11px]">F12</kbd> অথবা{" "}
            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-200 text-[11px]">Ctrl+Shift+J</kbd> (Mac: Cmd+Option+J) চেপে <strong className="text-slate-200">Console</strong> ট্যাবে যান।
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/20">
            3
          </div>
          <h4 className="font-semibold text-white text-sm">পেস্ট করে এন্টার দিন</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            নিচের কপি করা কোডটি পেস্ট করে <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-200 text-[11px]">Enter</kbd> চাপুন। স্ক্রিনে Floating HUD ভেসে উঠবে!
          </p>
        </div>
      </div>

      {/* Code Snippet Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-mono">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>google-flow-auto-runner.js (Ready to Paste)</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="p-4 overflow-x-auto max-h-96 text-xs font-mono text-slate-300 bg-[#090b10] leading-relaxed scrollbar-thin">
          <pre>{STANDALONE_BOOKMARKLET_CODE}</pre>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/90 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
        <div>
          <strong>টিপস:</strong> আপনি যদি স্থায়ীভাবে এক্সটেনশন হিসেবে ব্রাউজারে রাখতে চান, তবে &quot;ইনস্টলেশন গাইড (Setup Guide)&quot; ট্যাবটি দেখুন।
          আর সাময়িক পরীক্ষার জন্য উপরের কনসোল কোডটিই যথেষ্ট!
        </div>
      </div>
    </div>
  );
};

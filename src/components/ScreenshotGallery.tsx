import React from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Trash2, DownloadCloud } from "lucide-react";

interface ScreenshotGalleryProps {
  onGoToSimulator: () => void;
  onDownloadZip: () => void;
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({
  onGoToSimulator,
  onDownloadZip,
}) => {
  const steps = [
    {
      num: 1,
      title: "1. Google Flow Canvas (Demo Images)",
      bnTitle: "১. গুগল ফ্লো ক্যানভাসে ছবি সনাক্তকরণ",
      desc: "Detects all image cards on flow.google.com canvas. Handles 10 to 1,000+ items with smooth auto-scroll.",
      image: "/assets/aistudio/image_cce19794.png",
      tag: "Canvas Detection",
    },
    {
      num: 2,
      title: "2. Triggering 3-Dots 'More' Menu",
      bnTitle: "২. ৩-ডট 'More' বাটন ক্লিক",
      desc: "Simulates hover over the image card and clicks the vertical 3-dots button (aria-label='More') automatically.",
      image: "/assets/aistudio/image_a209871a.png",
      tag: "Menu Trigger",
    },
    {
      num: 3,
      title: "3. Hovering 'Download >'",
      bnTitle: "৩. 'Download' অপশনে মাউস পয়েন্টার হোভার",
      desc: "Locates the 'Download' item in the dropdown popup menu and hovers to expand upscale options.",
      image: "/assets/aistudio/image_7faf278c.png",
      tag: "Submenu Trigger",
    },
    {
      num: 4,
      title: "4. Selecting '2K Upscaled'",
      bnTitle: "৪. '2K Upscaled' সিলেক্ট করা",
      desc: "Clicks '2K Upscaled' to trigger high-resolution 2X upscaling without touching the paid 4K option.",
      image: "/assets/aistudio/image_8dbe76a6.png",
      tag: "2X Upscale Action",
    },
    {
      num: 5,
      title: "5. Upscale & Download Wait Buffer",
      bnTitle: "৫. আপস্কেল টোস্ট নোটিফিকেশন ও ডাউনলোড অপেক্ষা",
      desc: "Detects toast: 'Upscaling your image. Download will start automatically.' Waits for file generation.",
      image: "/assets/aistudio/image_271b9011.png",
      tag: "Toast & Download",
    },
    {
      num: 6,
      title: "6. Auto Clean: 'Move to bin'",
      bnTitle: "৬. ডাউনলোড শেষে অটো 'Move to bin' ডিলিট",
      desc: "Immediately re-opens 3-dots and clicks 'Move to bin' to purge downloaded image, keeping workspace clean!",
      image: "/assets/aistudio/image_03aa5831.png",
      tag: "Auto Bin Cleanup",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-950/40 via-slate-900/60 to-slate-950 border border-blue-500/20 p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Zap className="w-3.5 h-3.5" /> 100% Matching Your 6 Screenshots
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            আপনার পাঠানো ৬টি স্ক্রিনশটের প্রতিটি স্টেপ হুবহু অটোমেট করার জন্য তৈরি এক্সটেনশন
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Google Flow (<span className="text-blue-400 font-mono">flow.google.com</span>) এ থাকা শত শত বা হাজার হাজার ছবিকে
            একে একে <strong>2K Upscaled</strong> করে ডাউনলোড করবে এবং ডাউনলোড হওয়া মাত্রই সেই ছবিটি <strong>&quot;Move to bin&quot;</strong> করে
            মুছে ফেলে ক্যানভাস পরিষ্কার রাখবে।
          </p>

          <div className="flex items-center gap-3 p-3 bg-blue-950/40 rounded-xl border border-blue-500/30 max-w-fit">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex flex-col items-center justify-center font-black text-white text-base shadow-md shadow-blue-500/30 border border-blue-400/40 shrink-0">
              <span>2X</span>
              <span className="text-[6px] text-sky-200 tracking-wider -mt-1 font-bold">FLOW</span>
            </div>
            <div>
              <div className="text-xs font-bold text-white">ব্র্যান্ডেড &quot;2X&quot; আইকন সর্বত্র সেট করা হয়েছে</div>
              <div className="text-[11px] text-blue-300">ক্রোম টুলবার ও এক্সটেনশন লিস্টে নীল 2X লোগো দেখেই চিনতে পারবেন এটি Flow Upscaler</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onDownloadZip}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <DownloadCloud className="w-4 h-4" /> Download Ready Extension (.ZIP)
            </button>
            <button
              onClick={onGoToSimulator}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              টেস্ট সিমুলেটর দেখুন <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Full 2X Upscale Flow</h4>
              <p className="text-xs text-slate-400 mt-0.5">৩ ডট &rarr; Download &rarr; 2K Upscaled নিখুঁতভাবে ক্লিক করে।</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Trash2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Zero Clutter Auto-Bin</h4>
              <p className="text-xs text-slate-400 mt-0.5">ডাউনলোড শেষ হলেই সাথে সাথে &quot;Move to bin&quot; করে দেয়।</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Batch &amp; 1000+ Scroll Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">হাজার হাজার ছবি লোড করার জন্য অটো-স্ক্রোলিং ব্যবস্থা রয়েছে।</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Step Visual Breakdown Matching Screenshots */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
              আপনার দেওয়া ৬টি স্ক্রিনশটের ওয়ার্কফ্লো ম্যাপিং
            </h3>
            <p className="text-xs text-slate-400">
              এক্সটেনশনটি কিভাবে এই ৬টি স্কিনশটের ধাপে ধাপে কাজ করে তা নিচে দেখে নিন:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/40 transition-all flex flex-col group shadow-md"
            >
              <div className="relative aspect-video bg-black overflow-hidden border-b border-slate-800/80">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/80 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                  {step.tag}
                </span>
                <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow">
                  {step.num}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h4>
                  <div className="text-xs font-medium text-blue-300/90 mt-0.5 mb-2">
                    {step.bnTitle}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

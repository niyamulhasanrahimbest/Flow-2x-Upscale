import React from "react";
import { DownloadCloud, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";

interface InstallGuideTabProps {
  onDownloadZip: () => void;
  isDownloading: boolean;
}

export const InstallGuideTab: React.FC<InstallGuideTabProps> = ({
  onDownloadZip,
  isDownloading,
}) => {
  return (
    <div className="space-y-10">
      {/* Permanent Fixed Protection Banner */}
      <div className="bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900 border-2 border-blue-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl shadow-blue-950/40">
        <div className="flex items-center gap-2.5 text-blue-400 font-bold text-sm sm:text-base">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>কম্পিউটার বা ব্রাউজার রিস্টার্টের পরও এক্সটেনশন স্থায়ী (Permanent Fixed) রাখার উপায়</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          আপনার অনুরোধ অনুযায়ী এক্সটেনশনের <code className="text-blue-300 font-mono">manifest.json</code>-এ স্থায়ী ক্রিপ্টোগ্রাফিক কি (Permanent RSA Key) যুক্ত করে দেওয়া হয়েছে যাতে ক্রোম ব্রাউজার এটাকে আজীবনের জন্য একটি নির্দিষ্ট স্থায়ী আইডি দেয়। পিসি বা ব্রাউজার বন্ধ করলেও যেন এটি কখনো না হারায়, তার জন্য নিচের ৩টি বিষয় শুধু খেয়াল রাখুন:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div className="p-3.5 bg-black/50 rounded-xl border border-blue-500/20 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">১</span>
              স্থায়ী ফোল্ডারে রাখুন
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              জিপটি আনজিপ করে আপনার কম্পিউটারের কোনো ড্রাইভের স্থায়ী জায়গায় রাখুন (যেমন: <code className="text-slate-200">D:\GoogleFlow2X</code> বা <code className="text-slate-200">Documents\Extensions</code>)। <strong>ঐ ফোল্ডারটি কখনো ডিলেট বা সরানো যাবে না</strong>, কারণ ক্রোম সরাসরি ঐ পাথ থেকেই রান করে।
            </p>
          </div>

          <div className="p-3.5 bg-black/50 rounded-xl border border-blue-500/20 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">২</span>
              টুলবারে পিন (📌 Pin) করুন
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              ব্রাউজার রিস্টার্ট দিলে ক্রোম অনেক সময় আইকনটি উপরের 🧩 (পাজল) চিহ্নের ভেতর লুকিয়ে রাখে। আপনি শুধু 🧩 আইকনে চাপ দিয়ে <strong>2X</strong>-এর পাশের 📌 পিন বাটনে চাপ দিলেই নীল 2X আইকনটি টুলবারে স্থায়ীভাবে ফিক্সড থাকবে!
            </p>
          </div>

          <div className="p-3.5 bg-black/50 rounded-xl border border-blue-500/20 space-y-1.5">
            <div className="flex items-center gap-2 text-sky-400 font-bold">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center text-[11px]">৩</span>
              স্থায়ী আইডি নিশ্চিত
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              কোডের ভেতরে ইউনিক ফিক্সড কী যুক্ত থাকায় ব্রাউজার রিস্টার্ট দিলে এটি আর কখনো &quot;নতুন এক্সটেনশন&quot; ভাববে না বা নিষ্ক্রিয় করবে না। একবার লোড করলেই আজীবন কার্যকর থাকবে।
            </p>
          </div>
        </div>
      </div>

      {/* Step by step guide */}
      <div>
        <div className="max-w-2xl mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            ক্রোম ব্রাউজারে এক্সটেনশন ইনস্টল করার সহজ নিয়ম
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            মাত্র ২ মিনিট সময় নিয়ে নিচের ৫টি ধাপ অনুসরণ করুন। এটি Google Chrome, Brave, Edge যেকোনো ব্রাউজারে নিখুঁতভাবে চলবে।
          </p>
        </div>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-base shadow-md shadow-blue-600/30">
              1
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-base font-semibold text-white">
                ধাপ ১: এক্সটেনশন জিপ ফাইলটি ডাউনলোড করুন এবং আনজিপ করুন
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                প্রথমে নিচের বাটনটিতে ক্লিক করে <code className="text-blue-400 font-mono">google-flow-upscaler-extension.zip</code> ফাইলটি ডাউনলোড করুন।
                ডাউনলোড শেষে ফাইলটি আপনার কম্পিউটারের একটি <strong>স্থায়ী ড্রাইভে</strong> (যেমন: <code className="text-emerald-400">Documents\Extensions</code> বা <code className="text-emerald-400">D:\Extensions</code>) আনজিপ (Extract All) করুন। মনে রাখবেন, আনজিপ করার পর এই ফোল্ডারটি কখনো ডিলিট বা সরানো যাবে না, কারণ ক্রোম সরাসরি ঐ ফোল্ডার থেকেই ফাইলগুলো রিড করে।
              </p>
              <div className="pt-1">
                <button
                  onClick={onDownloadZip}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow cursor-pointer"
                >
                  <DownloadCloud className="w-3.5 h-3.5" />
                  {isDownloading ? "Generating..." : "Download Extension ZIP"}
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-base shadow-md shadow-indigo-600/30">
              2
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-base font-semibold text-white">
                ধাপ ২: ক্রোম এক্সটেনশন পেজে যান
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                আপনার গুগল ক্রোম ব্রাউজারের অ্যাড্রেস বারে টাইপ করুন:{" "}
                <kbd className="px-2 py-0.5 bg-slate-950 border border-slate-700 rounded text-blue-400 font-mono text-xs">
                  chrome://extensions
                </kbd>{" "}
                এবং Enter চাপুন। (অথবা ব্রাউজারের ৩-ডট মেনু &rarr; Extensions &rarr; Manage Extensions)
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-base shadow-md shadow-purple-600/30">
              3
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-base font-semibold text-white">
                ধাপ ৩: &quot;Developer mode&quot; চালু করুন
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code className="text-blue-300 font-mono">chrome://extensions</code> পেজের একদম ডানপাশের উপরে একটি টগল বাটন দেখতে পাবেন:{" "}
                <strong className="text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Developer mode</strong>।
                সেটিকে চালু (ON) করে দিন।
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-base shadow-md shadow-emerald-600/30">
              4
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-base font-semibold text-white">
                ধাপ ৪: &quot;Load unpacked&quot; বাটনে ক্লিক করে ফোল্ডার সিলেক্ট করুন
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Developer mode অন করার পর বামপাশের উপরে একটি নতুন বাটন আসবে:{" "}
                <strong className="text-emerald-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Load unpacked</strong>।
                সেটিতে ক্লিক করে আপনি ধাপ ১ এ যে ফোল্ডারে ফাইলগুলো আনজিপ করেছিলেন, সেই পুরো ফোল্ডারটি নির্বাচন করে দিন।
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> সাথে সাথে নীল রঙের &quot;2X&quot; আইকনসহ &quot;Google Flow 2X Auto Upscaler &amp; Deleter&quot; এক্সটেনশন যুক্ত হয়ে যাবে!
              </div>

              {/* 2X Visual Card Preview */}
              <div className="mt-3 p-3.5 bg-black/60 rounded-xl border border-blue-500/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex flex-col items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/30 border border-blue-400/40 shrink-0">
                  <span>2X</span>
                  <span className="text-[7px] text-sky-200 tracking-wider -mt-1 font-bold">FLOW</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs sm:text-sm">Google Flow 2X Auto Upscaler &amp; Deleter</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30 font-mono">1.0.0</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    ক্রোমের এক্সটেনশন লিস্ট ও টুলবারে ঠিক এই নীল রঙের <strong>2X</strong> আইকনটি প্রদর্শিত হবে।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white font-bold flex items-center justify-center shrink-0 text-base shadow-md shadow-rose-600/30">
              5
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-base font-semibold text-white">
                ধাপ ৫: flow.google.com-এ যান এবং ক্রোম টুলবারের নীল &quot;2X&quot; আইকনে ক্লিক করুন
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                আপনার Google Flow প্রজেক্ট পেজে যান। আপনার চাহিদামতো প্যানেলটি সারাক্ষণ স্ক্রিনে থাকবে না—আপনি যখনই ক্রোম ব্রাউজারের উপরের টুলবারে থাকা নীল <strong>2X</strong> আইকনে ক্লিক করবেন, তখনই Floating HUD কন্ট্রোল প্যানেলটি ভেসে উঠবে! কাজ শেষে বা যেকোনো সময় ডানপাশের উপরে <strong>✕ (Cross)</strong> বাটনে ক্লিক করলেই প্যানেলটি বন্ধ হয়ে যাবে।
              </p>
              <div className="p-3 bg-blue-950/40 rounded-lg border border-blue-500/20 text-xs text-blue-300">
                <strong>ব্যবহার:</strong> প্যানেলে শুধু <strong>&quot;▶ Start Auto Process&quot;</strong> চাপুন। এটি লাইভ কাউন্টডাউনসহ 2K আপস্কেল &rarr; ডাউনলোড &rarr; Move to bin &rarr; পরবর্তী ছবি প্রসেস একের পর এক চালাতে থাকবে!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-400" />
          গুরুত্বপূর্ণ প্রশ্নোত্তর ও সিস্টেম পারফরম্যান্স (FAQ &amp; Reliability)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <h4 className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              একসাথে কতগুলো ইমেজ প্রসেস করা যাবে?
            </h4>
            <p className="text-slate-300 leading-relaxed">
              <strong>উত্তর:</strong> আপনি চাইলে <strong>১টি থেকে শুরু করে ৫০০, ১,০০০ বা কয়েক হাজার ইমেজ</strong> পর্যন্ত একসাথে সম্পূর্ণ অটোমেটিকভাবে প্রসেস করতে পারবেন! এতে কোনো লিমিট বা সীমাবদ্ধতা নেই। এটি ব্যাচ-বাই-ব্যাচ একের পর এক ছবি প্রসেস করে এবং দৃশ্যমান ছবি শেষ হলে স্বয়ংক্রিয়ভাবে নিচে স্ক্রোল করে পরবর্তী ছবিগুলো লোড করে নেয়।
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <h4 className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              প্রসেস করার সময় ব্রাউজার বা পিসি হ্যাং হওয়ার কোনো সুযোগ আছে কি?
            </h4>
            <p className="text-slate-300 leading-relaxed">
              <strong>উত্তর:</strong> না, একদমই কোনো হ্যাং বা ল্যাগ হবে না! কারণ স্ক্রিপ্টটিতে অ্যাসিঙ্ক মেমরি-সেফ আর্কিটেকচার (Non-blocking Async Loop) ব্যবহার করা হয়েছে। ব্রাউজার কখনোই ফ্রিজ হবে না। তাছাড়া প্রতিটি আপস্কেল ও ডাউনলোডের পর ২ সেকেন্ডের কুলডাউন সেফটি পজ থাকায় গুগল সার্ভার বা ব্রাউজার মেমোরির ওপর অতিরিক্ত চাপ পড়ে না।
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <h4 className="font-semibold text-white">
              ইন্টারনেট বা নেটওয়ার্ক ড্রপ হলে কি ইরোর আসবে?
            </h4>
            <p className="text-slate-400 leading-relaxed">
              <strong>উত্তর:</strong> যদি হঠাৎ নেট স্লো হওয়ার কারণে কোনো ছবি লোড বা ডাউনলোড হতে দেরি হয়, তবে স্বয়ংক্রিয় সেফটি গার্ড থাকায় এটি তাড়াহুড়ো করে ছবি ডিলিট করবে না। বরং সিস্টেমে <strong>স্বয়ংক্রিয় সেফটি পজ (Auto Safety Pause)</strong> হয়ে যাবে এবং ইউজারকে নোটিফাই করবে, যাতে আপনি Resume বাটনে চাপ দিয়ে যেকোনো সময় চালু রাখতে পারেন।
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <h4 className="font-semibold text-white">
              প্যানেল বন্ধ বা ওপেন করার উপায় কী?
            </h4>
            <p className="text-slate-400 leading-relaxed">
              <strong>উত্তর:</strong> ব্রাউজারের উপরের টুলবারে থাকা নীল রঙের <strong>2X</strong> আইকনে ক্লিক করলেই প্যানেল অন বা অফ (Toggle) হবে। এছাড়া প্যানেলের উপরের ডান কোণার <strong>✕ (Cross)</strong> বাটনে ক্লিক করলে তা নিমিষেই হাইড হয়ে যাবে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

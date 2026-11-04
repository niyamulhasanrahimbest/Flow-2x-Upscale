import JSZip from "jszip";
import { EXTENSION_MANIFEST } from "../extension-files/manifest";
import { CONTENT_SCRIPT_CODE } from "../extension-files/contentScript";
import { CONTENT_CSS_CODE } from "../extension-files/contentCss";
import { BACKGROUND_SCRIPT_CODE, POPUP_HTML_CODE, POPUP_JS_CODE } from "../extension-files/backgroundAndPopup";

// Generate high-resolution, ultra-crisp 2X brand icon for Chrome Extension toolbar and manager
export function create2XIconBlob(size: number): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Background rounded rectangle
      const radius = Math.round(size * 0.22);
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, radius);

      // Deep vibrant gradient
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, "#2563eb"); // Royal blue
      grad.addColorStop(0.5, "#1d4ed8");
      grad.addColorStop(1, "#0f172a"); // Deep navy
      ctx.fillStyle = grad;
      ctx.fill();

      // Outer glowing rim
      ctx.lineWidth = Math.max(1, Math.round(size * 0.04));
      ctx.strokeStyle = "rgba(147, 197, 253, 0.6)"; // Light blue glow
      ctx.stroke();

      // Bold white "2X" Typography
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (size >= 48) {
        // High-res icon with "2X" and "FLOW" accent
        ctx.font = `900 ${Math.round(size * 0.46)}px system-ui, -apple-system, sans-serif`;
        ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
        ctx.shadowBlur = Math.round(size * 0.08);
        ctx.shadowOffsetY = Math.round(size * 0.03);

        ctx.fillText("2X", size / 2, size * 0.42);

        // Subtitle "FLOW" pill
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.font = `bold ${Math.round(size * 0.16)}px system-ui, -apple-system, sans-serif`;
        ctx.fillStyle = "#38bdf8"; // Sky blue
        ctx.fillText("FLOW", size / 2, size * 0.76);
      } else {
        // Toolbar icon (16px, 32px) - Maximum contrast bold "2X"
        ctx.font = `900 ${Math.round(size * 0.6)}px system-ui, -apple-system, sans-serif`;
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
        ctx.shadowBlur = 2;
        ctx.fillText("2X", size / 2, size / 2 + 1);
      }
    }

    canvas.toBlob((blob) => {
      resolve(blob || new Blob([]));
    }, "image/png");
  });
}

export async function generateExtensionZip(): Promise<Blob> {
  const zip = new JSZip();

  // 1. manifest.json
  zip.file("manifest.json", JSON.stringify(EXTENSION_MANIFEST, null, 2));

  // 2. content.js
  zip.file("content.js", CONTENT_SCRIPT_CODE);

  // 3. content.css
  zip.file("content.css", CONTENT_CSS_CODE);

  // 4. background.js
  zip.file("background.js", BACKGROUND_SCRIPT_CODE);

  // 5. popup.html & popup.js
  zip.file("popup.html", POPUP_HTML_CODE);
  zip.file("popup.js", POPUP_JS_CODE);

  // 6. 2X Brand Icons in all standard Chrome extension sizes
  const icon128 = await create2XIconBlob(128);
  const icon48 = await create2XIconBlob(48);
  const icon32 = await create2XIconBlob(32);
  const icon16 = await create2XIconBlob(16);

  zip.file("icon-128.png", icon128);
  zip.file("icon-48.png", icon48);
  zip.file("icon-32.png", icon32);
  zip.file("icon-16.png", icon16);

  // 7. README.md with Bengali & English instructions
  const readmeContent = `# Google Flow 2X Auto Upscaler & Deleter Extension (2X Flow)

Official Chrome Extension with high-visibility **2X** icon for Google Flow (\`https://flow.google.com\`).
Automates downloading 2K upscaled images and auto-purging them into 'Move to bin'.

## কম্পিউটার/ব্রাউজার বন্ধের পরও এক্সটেনশন স্থায়ী (Permanent) রাখার নিয়ম:

১. **স্থায়ী ফোল্ডারে রাখুন:** জিপ ফাইলটি আনজিপ করে আপনার কম্পিউটারের একটি স্থায়ী জায়গায় রাখুন (যেমন: \`C:\\GoogleFlowExtension\` অথবা \`Documents\\Extensions\`)। ডাউনলোড শেষ হওয়ার পর সেই ফোল্ডারটি কখনো ডিলেট বা রিনেম করবেন না, কারণ ক্রোম সরাসরি ঐ ফোল্ডার থেকেই ফাইলগুলো রিড করে।
২. **ক্রোমে লোড করুন:** \`chrome://extensions\`-এ গিয়ে Developer mode চালু করে "Load unpacked" দিয়ে সেই স্থায়ী ফোল্ডারটি সিলেক্ট করুন। (এতে পার্মানেন্ট কী যুক্ত থাকায় ক্রোম আইডি কখনো পরিবর্তন বা রিমুভ হবে না)।
৩. **টুলবারে পিন (📌 Pin) করে রাখুন:** ক্রোমের উপরের ডানপাশের এক্সটেনশন (🧩 puzzle) আইকনে ক্লিক করে "2X" আইকনের পাশের পিন বাটনে ক্লিক করে দিন। এতে ব্রাউজার বা পিসি রিস্টার্টের পরও নীল 2X আইকনটি টুলবারে সবসময় ফিক্সড থাকবে!
৪. **ফ্লো পেজে যান:** \`flow.google.com\` প্রজেক্ট পেজে গিয়ে নীল **2X** আইকনে ক্লিক করলেই অটোমেশন প্যানেল ভেসে উঠবে।
`;
  zip.file("README.md", readmeContent);

  return await zip.generateAsync({ type: "blob" });
}

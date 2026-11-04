// Standalone script for Google Flow DevTools Console / Bookmarklet
import { CONTENT_SCRIPT_CODE } from "./contentScript";
import { CONTENT_CSS_CODE } from "./contentCss";

export const STANDALONE_BOOKMARKLET_CODE = `/**
 * Google Flow 2X Auto Upscaler & Deleter - Direct Console Script
 * Open https://flow.google.com/project/...
 * Press F12 -> Console -> Paste this entire script -> Press Enter!
 */
(function() {
  // Inject CSS
  const style = document.createElement("style");
  style.id = "flow-upscaler-injected-css";
  style.textContent = ${JSON.stringify(CONTENT_CSS_CODE)};
  document.head.appendChild(style);

  // Execute Content Logic
  ${CONTENT_SCRIPT_CODE}
})();
`;

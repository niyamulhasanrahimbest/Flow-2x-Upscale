// Chrome Extension Manifest V3 configuration for Google Flow 2X Auto Upscaler & Deleter

export const EXTENSION_MANIFEST = {
  manifest_version: 3,
  name: "Google Flow 2X Auto Upscaler & Deleter",
  version: "1.0.0",
  description: "Automates 2K upscaled downloads and auto-cleans processed images into bin for Google Flow (flow.google.com).",
  key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzybqxlDsdl3dVBJhrZI48iw7cuPmH8e9egH0hp5xrD/tF32vX6LMJ5PAGqSUVEhhditkpp5GUQ/MoTHZ2JsP/AL0dKGBAjdZiL0nHWsCL8xr8KKpO8JXmFtsfd0WEwVKFgu8VqIrS+kAreIj9AjGYzh2f8BpFPIMNgIEERC4wjIcfsJr2F9Zz49dNNhH1JkLgl99XR0qMQVks+iTDqIpzfd9blnOCVyxxgndEBoM8qF7ESPvtnkvRtaMwN8Q+TYxjeTsgBZOQfmVIs8y8IPP0zPkVzppW3RtoyzkCX1kkx5wx0EYeNECPe+Z9PQMSGoGKdlNPwpNCo4GZECAckYoZwIDAQAB",
  icons: {
    "16": "icon-16.png",
    "32": "icon-32.png",
    "48": "icon-48.png",
    "128": "icon-128.png"
  },
  permissions: [
    "storage",
    "downloads",
    "tabs"
  ],
  host_permissions: [
    "https://flow.google.com/*"
  ],
  background: {
    service_worker: "background.js"
  },
  content_scripts: [
    {
      matches: ["https://flow.google.com/*"],
      js: ["content.js"],
      css: ["content.css"],
      run_at: "document_idle"
    }
  ],
  action: {
    default_title: "Google Flow 2X Auto Upscaler & Deleter",
    default_icon: {
      "16": "icon-16.png",
      "32": "icon-32.png",
      "48": "icon-48.png",
      "128": "icon-128.png"
    }
  }
};

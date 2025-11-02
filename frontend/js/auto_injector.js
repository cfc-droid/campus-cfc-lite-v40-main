/* =========================================================
✅ CFC_FUNC_5_1_AUTOLOAD_V20251102_FINAL — Inyección global LITE + CFC-PLUS
📄 Archivo: /frontend/js/auto_injector.js
🔒 CFC-SYNC V7.9E | QA-SYNC V41.7
========================================================= */

(function () {
  const base = window.location.hostname.includes("pages.dev")
    ? "/frontend/js/"
    : "../js/";

  const injectScript = (file) => {
    const s = document.createElement("script");
    s.src = base + file;
    s.defer = true;
    document.head.appendChild(s);
  };

  // 🧩 Núcleo base
  injectScript("theme.js?v=20251102");
  injectScript("theme_chapter.js?v=20251102");

  // 🟡 CFC-PLUS Extras
  injectScript("daily-review.js?v=20251102"); // Overlay diario motivacional
  injectScript("badge.js?v=20251102");        // Badge motivacional persistente
  injectScript("backup.js?v=20251102");       // Sistema de backup/restore local

  console.log("🧩 CFC_SYNC checkpoint: auto_injector.js | CFC-PLUS activo (badge + overlay + backup)", new Date().toLocaleString());
})();

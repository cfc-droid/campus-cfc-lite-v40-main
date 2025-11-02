/* =========================================================
   ✅ CFC_FUNC_5_1_AUTOLOAD_V20251102 — Inyección global de theme.js, theme_chapter.js y daily-review.js
   📄 Archivo: /frontend/js/auto_injector.js
   🔒 CFC-SYNC V7.9D | QA-SYNC V41.5
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

  // 🧩 Inyección global base (LITE)
  injectScript("theme.js?v=20251102");
  injectScript("theme_chapter.js?v=20251102");

  // 🟡 CFC-PLUS extras
  injectScript("daily-review.js?v=20251102"); // Overlay diario motivacional
  injectScript("badge.js?v=20251102");        // Badge motivacional persistente

  console.log(
    "🧩 CFC_SYNC checkpoint: auto_injector.js activo con CFC-PLUS (badge + overlay)",
    new Date().toLocaleString()
  );
})();

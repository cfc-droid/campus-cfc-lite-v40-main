/* =========================================================
   ✅ CFC_FUNC_5_1_AUTOLOAD_V20251102 — Inyección global de theme.js y theme_chapter.js
   📄 Archivo: /frontend/js/auto_injector.js
   🔒 CFC-SYNC V7.9D | QA-SYNC V41.5
   ========================================================= */

(function () {
  const base = window.location.hostname.includes("pages.dev")
    ? "/js/"
    : "../js/";

  const injectScript = (file) => {
    const s = document.createElement("script");
    s.src = base + file;
    s.defer = true;
    document.head.appendChild(s);
  };

  // Inyectar archivos reales (según build Cloudflare)
  injectScript("theme.js?v=20251102");
  injectScript("theme_chapter.js?v=20251102");

  console.log("🧩 CFC_SYNC checkpoint:", "auto_injector.js activo desde", base);

  <!-- ✅ CFC_FUNC_10_2_20251029 — Overlay de revisión diaria -->
<script src="../../js/daily-review.js?v=20251102" defer></script>
 
})();

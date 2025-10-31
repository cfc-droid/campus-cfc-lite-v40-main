/* =========================================================
✅ CFC_FUNC_5_1_AUTOLOAD_20251102 — Inyección global de theme.js
Archivo: /frontend/js/auto_injector.js
========================================================= */

(function() {
  const base = window.location.pathname.includes("/frontend/")
    ? "/frontend/"
    : window.location.pathname.startsWith("/modules/")
      ? "../"
      : "./";

  const scriptId = "cfc-theme-autoload";
  if (!document.getElementById(scriptId)) {
    const s = document.createElement("script");
    s.id = scriptId;
    s.src = base + "js/theme.js?v=20251102";
    s.defer = true;
    document.head.appendChild(s);
    console.log("🧩 CFC_SYNC:", "auto_injector.js → theme.js inyectado desde", base);
  } else {
    console.log("🧩 CFC_SYNC:", "theme.js ya presente, no se duplica.");
  }
})();

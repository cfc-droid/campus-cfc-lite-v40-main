/* ==========================================================
   ✅ CFC — AUTO-INJECTOR GLOBAL V2.4 (QA-SYNC 2025-11-01)
   Función: Inserta progress_v2.js automáticamente
   en todos los capítulos y exámenes que no lo tengan cargado.
   ========================================================== */

(function () {
  const path = window.location.pathname;

  // 👉 Solo actuar en capítulos o exámenes
  if (!/\/modules\/\d+\/(cap\d+|exam)\.html$/i.test(path)) return;

  // Evitar inyección duplicada
  const scripts = Array.from(document.scripts).map(s => s.src);
  if (scripts.some(src => src.includes("progress_v2.js"))) return;

  // Crear script dinámico
  const script = document.createElement("script");
  script.defer = true;

  /* =====================================================
     🔍 Detección de profundidad dinámica (compatible Cloudflare)
     - Si el path contiene /modules/x/, subir DOS niveles: ../../js/
     - Si se ejecuta desde entorno raíz o staging: js/
     ===================================================== */
  const depth = (path.match(/\//g) || []).length;
  script.src =
    depth >= 4
      ? "../../js/progress_v2.js?v=20251030"
      : "js/progress_v2.js?v=20251030";

  // Inyectar al final del body
  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(script);
    console.log("✅ CFC_SYNC AutoInjector — progress_v2.js añadido dinámicamente");
  });
})();

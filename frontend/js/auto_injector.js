/* =========================================================
✅ CFC_FUNC_5_1_AUTOLOAD_V20251106_SAFEFIX — Inyección global LITE + CFC-PLUS (con manejo seguro)
📄 Archivo: /frontend/js/auto_injector.js
🔒 CFC-SYNC V8.0 | QA-SYNC V10.6 — Cristian F. Choqui — 2025-11-06
---------------------------------------------------------
✔️ Corrige errores 404 de scripts inexistentes (daily-review.js / backup.js)
✔️ Mantiene ejecución completa (no bloquea chapter_nav.js)
✔️ Compatible con entorno local y Cloudflare Pages
========================================================= */

(function () {
  // =========================================================
  // 🧩 1️⃣ Base dinámica (local o Cloudflare)
  // =========================================================
  const base = window.location.hostname.includes("pages.dev")
    ? "/frontend/js/"
    : "../js/";

  // =========================================================
  // 🧩 2️⃣ Función de inyección segura
  // =========================================================
  const injectScript = (file, description = "") => {
    const s = document.createElement("script");
    s.src = base + file;
    s.defer = true;
    s.onerror = () => {
      console.warn(
        `⚠️ [CFC_FUNC_5_1_SAFEFIX] Script omitido (${file}) — no afecta flujo principal.`,
        description
      );
    };
    document.head.appendChild(s);
  };

  // =========================================================
  // 🧩 3️⃣ Núcleo base
  // =========================================================
  injectScript("theme.js?v=20251102", "Tema global");
  injectScript("theme_chapter.js?v=20251102", "Modo claro/oscuro modular");

  // =========================================================
  // 🧩 4️⃣ CFC-PLUS Extras (overlay, badge, backup)
  // =========================================================
  // Estos archivos pueden no existir en builds LITE; se manejan con fallback automático
  injectScript("badge.js?v=20251102", "Badge motivacional persistente");

  // 💤 Desactivados temporalmente para evitar errores 404
  // injectScript("daily-review.js?v=20251102", "Overlay motivacional diario");
  // injectScript("backup.js?v=20251102", "Sistema de backup/restore local");

  // =========================================================
  // 🧩 5️⃣ Protección global ante scripts dañados o HTML 404
  // =========================================================
  window.addEventListener(
    "error",
    (e) => {
      if (e.message && e.message.includes("Unexpected token '<'")) {
        console.warn(
          "⚠️ [CFC-SYNC V10.6] Error de script ignorado (archivo HTML en lugar de JS):",
          e.filename
        );
        e.preventDefault(); // Evita frenar otros scripts (como chapter_nav.js)
        return false;
      }
    },
    true
  );

  // =========================================================
  // 🧩 6️⃣ Log de control QA-SYNC
  // =========================================================
  console.log(
    "🧩 CFC_SYNC checkpoint: auto_injector.js | SAFEFIX activo (LITE build) — QA-SYNC V10.6",
    new Date().toLocaleString()
  );
})();

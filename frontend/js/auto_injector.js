/* =========================================================
✅ CFC_FUNC_5_1_AUTOLOAD_V20251104_SAFE — Inyección global LITE + CFC-PLUS (con manejo de errores)
📄 Archivo: /frontend/js/auto_injector.js
🔒 CFC-SYNC V7.9E | QA-SYNC V10.4
========================================================= */

(function () {
  // =========================================================
  // 🧩 1️⃣ Definición de base dinámica (entorno local o Cloudflare)
  // =========================================================
  const base = window.location.hostname.includes("pages.dev")
    ? "/frontend/js/"
    : "../js/";

  // =========================================================
  // 🧩 2️⃣ Función genérica de inyección
  // =========================================================
  const injectScript = (file) => {
    const s = document.createElement("script");
    s.src = base + file;
    s.defer = true;
    document.head.appendChild(s);
  };

  // =========================================================
  // 🧩 3️⃣ Núcleo base
  // =========================================================
  injectScript("theme.js?v=20251102");
  injectScript("theme_chapter.js?v=20251102");

  // =========================================================
  // 🧩 4️⃣ CFC-PLUS Extras (overlay, badge, backup)
  // =========================================================
  injectScript("daily-review.js?v=20251102"); // Overlay motivacional diario
  injectScript("badge.js?v=20251102");        // Badge motivacional persistente
  injectScript("backup.js?v=20251102");       // Sistema de backup/restore local

  // =========================================================
  // 🧩 5️⃣ Protección global ante scripts inexistentes o dañados
  // =========================================================
  window.addEventListener(
    "error",
    (e) => {
      if (e.message && e.message.includes("Unexpected token '<'")) {
        console.warn(
          "⚠️ [CFC-SYNC V10.4] Error de script ignorado: posible archivo faltante o 404 HTML devuelto.",
          e.filename
        );
        e.preventDefault(); // evita detener el resto del JS
        return true;
      }
    },
    true
  );

  // =========================================================
  // 🧩 6️⃣ Log de control QA-SYNC
  // =========================================================
  console.log(
    "🧩 CFC_SYNC checkpoint: auto_injector.js | CFC-PLUS activo (badge + overlay + backup) — QA-SYNC V10.4",
    new Date().toLocaleString()
  );
})();

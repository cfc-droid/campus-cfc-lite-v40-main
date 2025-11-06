/* ==========================================================
✅ CFC_FUNC_9_7_FIX_FINAL_V41.16_RETRYASYNC_SAFE
📄 Archivo: /frontend/js/chapter_nav.js
🔒 QA-SYNC V10.7 — Cristian F. Choqui — 2025-11-06
----------------------------------------------------------
✔ Inserción garantizada aunque otros scripts bloqueen el DOM.
✔ Reintenta 30 veces cada 300 ms hasta encontrar <main>.
✔ Compatible con audio bell-gold.wav y diseño dorado.
========================================================== */

(function () {
  const insertNextChapterButton = () => {
    try {
      const path = window.location.pathname;
      const match = path.match(/modules\/(\d+)\/cap(\d+)\.html$/);
      if (!match) return false;

      const module = parseInt(match[1]);
      const chapter = parseInt(match[2]);
      const nextChapter = chapter + 1;
      const maxChapters = 4;

      const main = document.querySelector("main");
      if (!main) return false; // DOM no disponible todavía

      // Evita duplicados
      if (main.querySelector(".next-chapter-btn")) return true;

      const footer = main.querySelector("footer.firma-cfc");

      const btn = document.createElement("button");
      btn.className = "next-chapter-btn";
      btn.innerHTML =
        chapter < maxChapters
          ? `Continuar al Capítulo ${nextChapter} ▶`
          : "Ir al Examen Final 🏁";

      // 🎨 Estilo visual
      Object.assign(btn.style, {
        display: "block",
        margin: "40px auto 30px",
        padding: "14px 36px",
        fontSize: "1rem",
        fontWeight: "700",
        background: "linear-gradient(90deg,#ffd700,#f0c03d)",
        color: "#000",
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 0 16px rgba(255,215,0,0.45)",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        zIndex: "9999",
      });

      btn.addEventListener("mouseover", () => {
        btn.style.transform = "scale(1.05)";
        btn.style.boxShadow = "0 0 24px rgba(255,215,0,0.6)";
      });
      btn.addEventListener("mouseout", () => {
        btn.style.transform = "scale(1)";
        btn.style.boxShadow = "0 0 16px rgba(255,215,0,0.45)";
      });

      // 🔊 Acción al hacer clic
      btn.addEventListener("click", () => {
        const sound = new Audio("../../media/audio/bell-gold.wav");
        sound.play().catch(() => {});
        btn.disabled = true;
        btn.textContent = "Cargando...";

        const nextUrl =
          chapter < maxChapters
            ? `cap${nextChapter}.html`
            : "../../examen/examen.html";

        setTimeout(() => (window.location.href = nextUrl), 900);
      });

      // 🧩 Inserta antes del footer si existe
      if (footer && footer.parentNode === main) main.insertBefore(btn, footer);
      else main.appendChild(btn);

      console.log(
        `🧩 CFC_SYNC checkpoint: NEXTCHAPTER insertado correctamente — módulo ${module} cap ${chapter}`
      );
      return true;
    } catch (err) {
      console.warn("⚠️ Error en insertNextChapterButton:", err);
      return false;
    }
  };

  // 🔁 Reintento cada 300 ms hasta 30 veces (≈9 segundos)
  let attempts = 0;
  const maxAttempts = 30;
  const retry = setInterval(() => {
    const done = insertNextChapterButton();
    if (done || attempts > maxAttempts) clearInterval(retry);
    attempts++;
  }, 300);

  // 🔒 Fallback final: segundo intento al DOMContentLoaded
  document.addEventListener("DOMContentLoaded", insertNextChapterButton);
})();

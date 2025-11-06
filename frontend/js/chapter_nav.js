/* ==========================================================
✅ CFC_FUNC_9_8_FINAL_V41.18_DOMSAFE — Inserción garantizada del botón “Continuar al capítulo siguiente”
📄 Archivo: /frontend/js/chapter_nav.js
🔒 QA-SYNC V10.8 | CFC-SYNC V8.1 — Cristian F. Choqui — 2025-11-06
----------------------------------------------------------
✔️ Detecta automáticamente <main>, <section> o <div.container-chapter>
✔️ Inserta antes del footer “Volver al módulo”
✔️ Reintenta hasta 10 s si el DOM carga diferido
✔️ Compatible con audio bell-gold.wav + animación dorada
========================================================== */

(function () {
  const insertNextButton = () => {
    try {
      // Detectar módulo y capítulo
      const match = window.location.pathname.match(/modules\/(\d+)\/cap(\d+)\.html$/);
      if (!match) return false;

      const module = parseInt(match[1]);
      const chapter = parseInt(match[2]);
      const next = chapter + 1;
      const max = 4;

      // Buscar contenedor válido
      const container =
        document.querySelector("main") ||
        document.querySelector("section") ||
        document.querySelector(".container-chapter") ||
        document.body;
      if (!container) return false;

      // Evitar duplicado
      if (document.querySelector(".next-chapter-btn")) return true;

      // Crear botón
      const btn = document.createElement("button");
      btn.className = "next-chapter-btn";
      btn.textContent =
        chapter < max ? `Continuar al Capítulo ${next} ▶` : "Ir al Examen Final 🏁";

      // Estilo
      Object.assign(btn.style, {
        display: "block",
        margin: "45px auto 35px",
        padding: "14px 34px",
        fontWeight: "700",
        fontSize: "1rem",
        color: "#000",
        background: "linear-gradient(90deg,#d4af37,#ffd700)",
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 0 18px rgba(212,175,55,0.5)",
        cursor: "pointer",
        transition: "all 0.25s ease",
      });

      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.05)";
        btn.style.boxShadow = "0 0 25px rgba(212,175,55,0.75)";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
        btn.style.boxShadow = "0 0 18px rgba(212,175,55,0.5)";
      });

      // Acción click
      btn.addEventListener("click", () => {
        const audio = new Audio("../../media/audio/bell-gold.wav");
        audio.volume = 0.7;
        audio.play().catch(() => {});
        btn.disabled = true;
        btn.innerText = "Cargando... ⚡";
        const dest =
          chapter < max
            ? `cap${next}.html`
            : "../../examen/examen.html";
        setTimeout(() => (window.location.href = dest), 900);
      });

      // Insertar antes del footer si existe
      const footer = document.querySelector("footer.firma-cfc");
      footer
        ? footer.parentNode.insertBefore(btn, footer)
        : container.appendChild(btn);

      console.log(
        `🧩 CFC_SYNC checkpoint: botón “Continuar al Capítulo” insertado — módulo ${module}, cap ${chapter}`
      );
      return true;
    } catch (err) {
      console.warn("⚠️ chapter_nav.js — error:", err);
      return false;
    }
  };

  // 🔁 Reintento hasta 10 s
  let tries = 0;
  const timer = setInterval(() => {
    if (insertNextButton() || tries++ > 40) clearInterval(timer);
  }, 250);

  document.addEventListener("DOMContentLoaded", insertNextButton);
})();

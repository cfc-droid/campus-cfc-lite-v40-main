/* ==========================================================
✅ CFC_FUNC_9_5_FIX_FINAL_V41.14_NEXTCHAPTER_RETRYSAFE
🧩 Inserción garantizada — incluso si otros scripts bloquean DOMContentLoaded
🔒 QA-SYNC V10.5 — Cristian F. Choqui — 2025-11-06
========================================================== */

(function () {
  const insertNextChapterButton = () => {
    const path = window.location.pathname;
    const match = path.match(/modules\/(\d+)\/cap(\d+)\.html$/);
    if (!match) return;

    const module = parseInt(match[1]);
    const chapter = parseInt(match[2]);
    const nextChapter = chapter + 1;
    const maxChapters = 4;

    const main = document.querySelector("main");
    if (!main) return false; // DOM no listo

    // Evita duplicados
    if (main.querySelector(".next-chapter-btn")) return true;

    const footer = main.querySelector("footer.firma-cfc");
    const btn = document.createElement("button");
    btn.className = "next-chapter-btn";
    btn.innerHTML =
      chapter < maxChapters
        ? `Continuar al Capítulo ${nextChapter} ▶`
        : "Ir al Examen Final 🏁";

    Object.assign(btn.style, {
      display: "block",
      margin: "40px auto 20px",
      padding: "14px 32px",
      fontSize: "1rem",
      fontWeight: "700",
      background: "linear-gradient(90deg,#ffd700,#f0c03d)",
      color: "#000",
      border: "none",
      borderRadius: "12px",
      boxShadow: "0 0 16px rgba(255,215,0,0.45)",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      zIndex: "999",
    });

    btn.addEventListener("mouseover", () => {
      btn.style.transform = "scale(1.05)";
      btn.style.boxShadow = "0 0 24px rgba(255,215,0,0.6)";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.transform = "scale(1)";
      btn.style.boxShadow = "0 0 16px rgba(255,215,0,0.45)";
    });

    btn.addEventListener("click", () => {
      const sound = new Audio("../../media/audio/bell-gold.wav");
      sound.play().catch(() => {});
      const nextUrl =
        chapter < maxChapters
          ? `cap${nextChapter}.html`
          : "../../examen/examen.html";
      btn.disabled = true;
      btn.textContent = "Cargando...";
      setTimeout(() => (window.location.href = nextUrl), 900);
    });

    // Inserta antes del footer o al final de main
    if (footer && footer.parentNode === main) main.insertBefore(btn, footer);
    else main.appendChild(btn);

    console.log(
      `🧩 CFC_SYNC checkpoint: NEXTCHAPTER insertado correctamente — módulo ${module} cap ${chapter}`
    );
    return true;
  };

  // Ejecución inicial + reintentos si DOM no está listo
  let tries = 0;
  const tryInsert = () => {
    if (insertNextChapterButton() || tries > 20) clearInterval(retry);
    tries++;
  };
  const retry = setInterval(tryInsert, 300);

  // Seguridad adicional si DOMContentLoaded se dispara correctamente
  document.addEventListener("DOMContentLoaded", insertNextChapterButton);
})();

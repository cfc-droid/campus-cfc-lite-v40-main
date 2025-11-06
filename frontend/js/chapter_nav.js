/* ==========================================================
   ✅ CFC_FUNC_9_4_FIX_V41.13_NEXTCHAPTER_ABOVE_BACKBUTTON
   🧩 Inserción garantizada — Botón “Continuar al capítulo X / Ir al examen 🏁”
   🔒 QA-SYNC V10.3 — Build V41.13 — Cristian F. Choqui
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  try {
    const path = window.location.pathname;
    const match = path.match(/modules\/(\d+)\/cap(\d+)\.html$/);
    if (!match) return;

    const module = parseInt(match[1]);
    const chapter = parseInt(match[2]);
    const nextChapter = chapter + 1;
    const maxChapters = 4; // 👈 ajustar si cambia la cantidad

    // Localizar contenedores
    const main = document.querySelector("main") || document.body;
    const footer = main.querySelector("footer.firma-cfc");

    // Crear botón
    const btn = document.createElement("button");
    btn.className = "next-chapter-btn";
    btn.innerHTML =
      chapter < maxChapters
        ? `Continuar al Capítulo ${nextChapter} ▶`
        : "Ir al Examen Final 🏁";

    // Estilo inline para asegurar visibilidad
    btn.style.display = "block";
    btn.style.margin = "30px auto 15px auto";
    btn.style.padding = "14px 30px";
    btn.style.fontSize = "1rem";
    btn.style.fontWeight = "700";
    btn.style.background =
      "linear-gradient(90deg, #ffd700, #f0c03d)";
    btn.style.color = "#000";
    btn.style.border = "none";
    btn.style.borderRadius = "12px";
    btn.style.boxShadow = "0 0 16px rgba(255,215,0,0.45)";
    btn.style.cursor = "pointer";
    btn.style.transition = "all 0.3s ease-in-out";

    btn.addEventListener("mouseover", () => {
      btn.style.transform = "scale(1.05)";
      btn.style.boxShadow = "0 0 24px rgba(255,215,0,0.6)";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.transform = "scale(1)";
      btn.style.boxShadow = "0 0 16px rgba(255,215,0,0.45)";
    });

    // Acción al hacer clic
    btn.addEventListener("click", () => {
      const sound = new Audio("../../media/audio/bell-gold.wav");
      sound.play().catch(() => {});
      const nextUrl =
        chapter < maxChapters
          ? `cap${nextChapter}.html`
          : "../../examen/examen.html";
      btn.disabled = true;
      btn.textContent = "Cargando...";
      btn.style.opacity = "0.8";
      setTimeout(() => {
        window.location.href = nextUrl;
      }, 900);
    });

    // Inserción final (justo antes del footer)
    if (footer && footer.parentNode === main) {
      main.insertBefore(btn, footer);
    } else {
      main.appendChild(btn);
    }

    console.log(
      `🧩 CFC_SYNC checkpoint: NEXTCHAPTER visible arriba de footer — módulo ${module} cap ${chapter}`,
      new Date().toLocaleString()
    );
  } catch (err) {
    console.error("❌ CFC_FUNC_9_4_FIX_V41.13_NEXTCHAPTER_ABOVE_BACKBUTTON:", err);
  }
});

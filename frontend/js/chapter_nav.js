/* ==========================================================
   ✅ CFC_FUNC_9_3_FIX_FINAL_NEXTCHAPTER
   🧩 Solución definitiva — Botón “Continuar al capítulo X / Ir al examen 🏁”
   🔒 QA-SYNC V10.2 — Build V41.12 — Cristian F. Choqui
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  try {
    const path = window.location.pathname;
    const match = path.match(/modules\/(\d+)\/cap(\d+)\.html$/);
    if (!match) return;

    const module = parseInt(match[1]);
    const chapter = parseInt(match[2]);
    const nextChapter = chapter + 1;
    const maxChapters = 4; // 👈 ajustar si cambia la cantidad por módulo

    // Localizar el contenedor de inserción
    const main = document.querySelector("main") || document.body;
    if (!main) {
      console.warn("⚠️ No se encontró contenedor para el botón siguiente capítulo.");
      return;
    }

    // Crear botón
    const btn = document.createElement("button");
    btn.className = "next-chapter-btn gold-btn";
    btn.textContent = chapter < maxChapters
      ? `Continuar al Capítulo ${nextChapter} ▶`
      : "Ir al Examen Final 🏁";

    // Acción al click
    btn.addEventListener("click", () => {
      const sound = new Audio("../../media/audio/bell-gold.wav");
      sound.play().catch(() => {});
      const nextUrl =
        chapter < maxChapters
          ? `cap${nextChapter}.html`
          : "../../examen/examen.html";
      btn.disabled = true;
      btn.textContent = "Cargando...";
      setTimeout(() => {
        window.location.href = nextUrl;
      }, 800);
    });

    // Insertar en el DOM
    const footer = main.querySelector("footer") || main;
    footer.appendChild(btn);

    // Confirmar visualmente
    console.log(
      `🧩 CFC_SYNC checkpoint: Botón NEXTCHAPTER generado — módulo ${module} cap ${chapter}`,
      new Date().toLocaleString()
    );
  } catch (err) {
    console.error("❌ CFC_FUNC_9_3_FIX_FINAL_NEXTCHAPTER error:", err);
  }
});

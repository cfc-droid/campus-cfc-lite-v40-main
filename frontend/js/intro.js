/* =========================================================
   ✅ CFC_FUNC_7_3B_V43_GOLDENFLASH — Overlay + efecto dorado
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("videoOverlay");
  const video = document.getElementById("welcomeVideo");
  const closeBtn = document.getElementById("closeOverlay");
  const flash = document.getElementById("goldenFlash");

  if (!overlay || !video || !closeBtn || !flash) return;

  // Mostrar solo en primer acceso
  if (!localStorage.getItem("firstVisit")) {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    video.play().catch(() => console.warn("🔇 Autoplay bloqueado por navegador"));
    localStorage.setItem("firstVisit", "true");
  }

  // Botón para cerrar overlay con transición dorada
  closeBtn.addEventListener("click", () => {
    flash.classList.add("active");
    setTimeout(() => {
      overlay.classList.add("fade-out");
    }, 200);
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = "auto";
      flash.classList.remove("active");
    }, 800);
  });
});

// 🔒 QA-SYNC — Verificación visual final
console.log("🧩 CFC_SYNC checkpoint:", "intro.js — CFC_FUNC_7_3B_V43_GOLDENFLASH activo", new Date().toLocaleString());

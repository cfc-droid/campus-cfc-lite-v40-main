/* =========================================================
   ✅ CFC_FUNC_7_3_V43_OVERLAY — Control visual premium
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("videoOverlay");
  const video = document.getElementById("welcomeVideo");
  const closeBtn = document.getElementById("closeOverlay");

  if (!overlay || !video || !closeBtn) return;

  // Mostrar solo en primer acceso
  if (!localStorage.getItem("firstVisit")) {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    video.play().catch(() => console.warn("🔇 Autoplay bloqueado por navegador"));
    localStorage.setItem("firstVisit", "true");
  }

  // Botón para cerrar overlay
  closeBtn.addEventListener("click", () => {
    overlay.classList.add("fade-out");
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = "auto";
    }, 600);
  });
});

// 🔒 QA-SYNC — Verificación de control inicial
console.log("🧩 CFC_SYNC checkpoint:", "intro.js — Overlay premium activo (V43.3)", new Date().toLocaleString());

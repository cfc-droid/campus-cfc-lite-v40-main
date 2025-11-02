/* =========================================================
   ✅ CFC_FUNC_7_3C_V43_FIX — Overlay + Flash + Audio
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("videoOverlay");
  const video = document.getElementById("welcomeVideo");
  const closeBtn = document.getElementById("closeOverlay");
  const flash = document.getElementById("goldenFlash");

  if (!overlay || !video || !closeBtn || !flash) {
    console.warn("⚠️ Elementos no encontrados en intro.html");
    return;
  }

  // 🧠 Mostrar solo primer acceso
  if (!localStorage.getItem("firstVisit")) {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    try {
      video.play();
    } catch (e) {
      console.warn("🔇 Autoplay bloqueado:", e);
    }
    localStorage.setItem("firstVisit", "true");
  } else {
    console.log("👀 Primer acceso ya registrado, no mostrar overlay.");
  }

  // 🎵 Efecto sonoro dorado (opcional)
  const goldSound = new Audio("../audio/bell-gold.wav");
  goldSound.volume = 0.7;

  // 🎬 Cerrar con transición dorada
  closeBtn.addEventListener("click", () => {
    flash.classList.add("active");
    goldSound.play().catch(() => console.warn("🔇 Audio bloqueado por política del navegador."));
    setTimeout(() => {
      overlay.classList.add("fade-out");
    }, 150);
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = "auto";
      flash.classList.remove("active");
    }, 800);
  });
});

console.log("🧩 CFC_SYNC checkpoint:", "intro.js — CFC_FUNC_7_3C_V43_FIX activo", new Date().toLocaleString());

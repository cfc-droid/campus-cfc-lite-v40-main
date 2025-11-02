// ✅ CFC_FUNC_7_2_20251102 — Control de visualización inicial aplicado
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("welcomeVideo");
  if (!video) return;

  if (!localStorage.getItem("firstVisit")) {
    video.style.display = "block";
    video.play().catch(() => console.log("🔇 Autoplay bloqueado por el navegador."));
    localStorage.setItem("firstVisit", "true");
  } else {
    video.style.display = "none";
  }
});

console.log("🧩 CFC_SYNC checkpoint:", "intro.js", "Punto 7.2 actualizado", new Date().toLocaleString());

/* ============================================================
   ✅ CFC_FUNC_1_1_3_20251101 — Intro Premium Splash sincronizado
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  // Frases motivacionales aleatorias
  const frases = [
    "El control es la verdadera libertad 🧠",
    "El mercado premia la paciencia 🕰️",
    "Disciplina hoy, libertad mañana 💰",
    "Ganá cuando mantenés la calma en el caos 🌙"
  ];

  const fraseEl = document.getElementById("frase");
  if (fraseEl) fraseEl.textContent = frases[Math.floor(Math.random() * frases.length)];

  // 🔹 Efecto fade-out + redirección automática a index.html (4 s)
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 1000);
    }
  }, 4000);

  // 🔹 Botón manual (permite entrar antes de los 4 s)
  const btn = document.getElementById("enterBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const loader = document.getElementById("loader");
      if (loader) loader.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 500);
    });
  }

  console.log("🧩 CFC_SYNC checkpoint:", "Intro Premium Splash activo", new Date().toLocaleString());
});

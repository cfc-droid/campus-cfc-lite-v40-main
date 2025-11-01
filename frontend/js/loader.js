/* ============================================================
   ✅ CFC_FUNC_1_1_2_20251101 — Loader optimizado (compatible con intro)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Frases motivacionales rotativas
  const frases = [
    "El control es la verdadera libertad 🧠",
    "Ganá cuando mantenés la calma en el caos 🌙",
    "Disciplina es hacer lo correcto, incluso cuando no querés ⚡",
    "El mercado premia la paciencia 🕰️"
  ];

  const quote = document.getElementById("quote");
  if (quote) quote.textContent = frases[Math.floor(Math.random() * frases.length)];

  // 🔹 Ajuste de logo
  const logo = document.getElementById("logoCFC");
  if (logo) {
    logo.style.width = "25%";
    logo.style.maxWidth = "250px";
    logo.style.height = "auto";
  }

  // 🔹 Animación de salida
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => loader.style.display = "none", 800);
    }, 3000);
  }

  // 🔹 Botón manual
  const btn = document.getElementById("enterBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      loader.classList.add("fade-out");
      setTimeout(() => loader.style.display = "none", 800);
    });
  }

  console.log("🧩 CFC_SYNC checkpoint:", "loader.js | Compatible con intro.html", new Date().toLocaleString());
});

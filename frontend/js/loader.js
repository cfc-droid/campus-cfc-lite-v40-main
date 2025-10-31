/* ============================================================
   CFC_FUNC_1_1_1_20251029 — Loader motivacional inicial (ajuste real)
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
  const random = frases[Math.floor(Math.random() * frases.length)];
  if (quote) quote.textContent = random;

  // 🔹 Ajuste dinámico de logo (reducción visual segura)
  const logo = document.getElementById("logoCFC");
  if (logo) {
    logo.style.width = "25%";
    logo.style.maxWidth = "250px";
    logo.style.height = "auto";
  }

  // 🔹 Mostrar loader 3s y desvanecer
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";
      }, 1000);
    }, 3000);
  }

  // 🔹 Botón manual “Entrar al Campus”
  const btn = document.getElementById("enterBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";
      }, 800);
    });
  }

  console.log("🧩 CFC_SYNC checkpoint:", "loader.js", "Punto 1.1 actualizado", new Date().toLocaleString());
});

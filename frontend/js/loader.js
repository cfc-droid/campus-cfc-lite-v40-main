/* ============================================================
   ✅ CFC_FUNC_1_1_5_V41.5 — Intro Splash Integrado + Fade
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const frases = [
    "El control es la verdadera libertad 🧠",
    "El mercado premia la paciencia 🕰️",
    "Disciplina hoy, libertad mañana 💰",
    "Ganá cuando mantenés la calma en el caos 🌙"
  ];

  const phrase = document.getElementById("splash-phrase");
  if (phrase) phrase.textContent = frases[Math.floor(Math.random() * frases.length)];

  const splash = document.getElementById("intro-splash");
  const btn = document.getElementById("enterSplash");

  const cerrarSplash = () => {
    if (!splash) return;
    splash.classList.add("fade-out");
    setTimeout(() => splash.remove(), 1000);
  };

  // Redirección automática (4 s)
  setTimeout(cerrarSplash, 4000);

  // Botón manual
  if (btn) btn.addEventListener("click", cerrarSplash);

  console.log("🧩 CFC_SYNC:", "Intro Splash activo | Auto-fade 4 s", new Date().toLocaleString());
});

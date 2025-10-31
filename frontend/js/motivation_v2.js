/* =========================================================
   ✅ CFC_FUNC_4_1_20251031 — Motivador diario creado
   📄 Archivo: /frontend/js/motivation_v2.js
   🔒 CFC-SYNC V7.5 | QA-SYNC V9.8C | Build V40-REALISTA
   ========================================================= */

const frases = [
  "Sigue adelante 💪",
  "Cada fallo te acerca al éxito 🌟",
  "Disciplina es libertad 🔥",
  "Tu progreso no se mide en días, sino en constancia 📈",
  "Haz hoy lo que te acerca al mañana que deseas ⚡"
];

const lastDate = localStorage.getItem("lastDate");
const today = new Date().toDateString();

if (lastDate !== today) {
  const frase = frases[Math.floor(Math.random() * frases.length)];
  localStorage.setItem("lastDate", today);
  localStorage.setItem("lastFrase", frase);

  const el = document.getElementById("dailyMotivation");
  if (el) el.textContent = frase;
} else {
  const saved = localStorage.getItem("lastFrase") || frases[0];
  const el = document.getElementById("dailyMotivation");
  if (el) el.textContent = saved;
}

console.log(
  "🧩 CFC_SYNC checkpoint:",
  "motivation_v2.js",
  "Punto 4.1 actualizado",
  new Date().toLocaleString()
);

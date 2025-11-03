/* ==========================================================
✅ CFC_FUNC_8_1_FIX_20251105 — Analítica interna de progreso (sincronizada con progress_v2.js + activity_tracker)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnStats");
  if (!btn) return;

  btn.addEventListener("click", openStatsModal);
});

function openStatsModal() {
  // 🧩 Leer datos del objeto progressData
  let modules = 0;
  let exams = 0;
  let time = 0;
  let days = 1;
  let totalDays = 1;

  try {
    const progressData = JSON.parse(localStorage.getItem("progressData") || "{}");
    if (progressData.completed && Array.isArray(progressData.completed)) {
      modules = progressData.completed.length;
    }
  } catch (err) {
    console.warn("⚠️ CFC-STATS: No se pudo leer progressData:", err);
  }

  // 🧩 Compatibilidad con claves antiguas
  const legacyModules = parseInt(localStorage.getItem("CFC_modulesCompleted") || 0);
  const legacyExams = parseInt(localStorage.getItem("CFC_examsPassed") || 0);
  const legacyTime = parseFloat(localStorage.getItem("CFC_time") || 0);
  const legacyDays = parseInt(localStorage.getItem("CFC_days") || 1);
  const legacyTotalDays = parseInt(localStorage.getItem("CFC_totalDays") || 1);

  // Combinar valores
  modules = Math.max(modules, legacyModules);
  exams = legacyExams;
  time = legacyTime / 3600; // convertir a horas
  days = legacyDays;
  totalDays = legacyTotalDays;

  // Si hay examResult pendiente, sincronizarlo también
  const examResult = localStorage.getItem("examResult");
  if (examResult) {
    try {
      const parsed = JSON.parse(examResult);
      if (parsed.passed) exams += 1;
    } catch {}
  }

  // 🧼 Eliminar si ya hay otro modal abierto
  document.querySelector(".stats-modal")?.remove();

  // 🪶 Crear modal con datos actuales
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="stats-modal">
      <h3>📊 Tu progreso</h3>
      <p>Módulos completados: <b>${modules}/20</b></p>
      <p>Exámenes aprobados: <b>${exams}/20</b></p>
      <p>Horas activas: <b>${time.toFixed(1)} h</b></p>
      <p>Días consecutivos de estudio: <b>${days}</b></p>
      <p>Días totales de estudio: <b>${totalDays}</b></p>
      <button onclick="document.querySelector('.stats-modal').remove()">Cerrar</button>
    </div>`
  );

  // 🔍 Log de control
  console.log(
    `CFC-STATS V1 — Módulos:${modules}, Exámenes:${exams}, Horas:${time.toFixed(
      1
    )}, Consecutivos:${days}, Totales:${totalDays}`
  );
}

/* ==========================================================
🔒 CFC-SYNC
# ✅ CFC_FUNC_8_1_FIX_20251105 — Lectura sincronizada con progressData y activity_tracker
echo "🧩 CFC_SYNC checkpoint: CFC-STATS V1 con días totales activos"
========================================================== */

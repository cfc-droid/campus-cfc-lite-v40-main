/* ==========================================================
✅ CFC_FUNC_8_1_FIX_20251105b — Analítica interna (con minutos activos)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnStats");
  if (!btn) return;
  btn.addEventListener("click", openStatsModal);
});

function openStatsModal() {
  // 🧩 Leer progreso general
  let modules = 0, exams = 0, hours = 0, minutes = 0, days = 1, totalDays = 1;

  try {
    const progressData = JSON.parse(localStorage.getItem("progressData") || "{}");
    if (progressData.completed && Array.isArray(progressData.completed)) {
      modules = progressData.completed.length;
    }
  } catch (err) {
    console.warn("⚠️ CFC-STATS: No se pudo leer progressData:", err);
  }

  // 🧩 Variables locales
  const legacyModules = parseInt(localStorage.getItem("CFC_modulesCompleted") || 0);
  const legacyExams = parseInt(localStorage.getItem("CFC_examsPassed") || 0);
  const legacyTime = parseFloat(localStorage.getItem("CFC_time") || localStorage.getItem("CFC_time_temp") || 0);
  const legacyDays = parseInt(localStorage.getItem("CFC_days") || 1);
  const legacyTotalDays = parseInt(localStorage.getItem("CFC_totalDays") || 1);

  modules = Math.max(modules, legacyModules);
  exams = legacyExams;
  const tempTime = parseFloat(localStorage.getItem("CFC_time_temp") || 0);
  const totalTime = Math.max(legacyTime, tempTime);
  hours = totalTime / 3600;
  minutes = totalTime / 60;
  days = legacyDays;
  totalDays = legacyTotalDays;

  // 🧩 Sincronización examen aprobado
  const examResult = localStorage.getItem("examResult");
  if (examResult) {
    try {
      const parsed = JSON.parse(examResult);
      if (parsed.passed) exams += 1;
    } catch {}
  }

  // 🧼 Eliminar modal previo
  document.querySelector(".stats-modal")?.remove();

  // 🪶 Crear modal
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="stats-modal">
      <h3>📊 Tu progreso</h3>
      <p>Módulos completados: <b>${modules}/20</b></p>
      <p>Horas activas: <b>${hours.toFixed(1)} h</b> (<b>${minutes.toFixed(0)} min</b>)</p>
      <p>Días consecutivos de estudio: <b>${days}</b></p>
      <p>Días totales de estudio: <b>${totalDays}</b></p>
      <button onclick="document.querySelector('.stats-modal').remove()">Cerrar</button>
    </div>`
  );

  console.log(
    `CFC-STATS FIX — Módulos:${modules}, Exámenes:${exams}, Horas:${hours.toFixed(
      1
    )}, Min:${minutes.toFixed(0)}, Consecutivos:${days}, Totales:${totalDays}`
  );
}

/* ==========================================================
🔒 CFC-SYNC
# ✅ CFC_FUNC_8_1_FIX_20251105b — Incluye minutos activos y días totales reales
echo "🧩 CFC_SYNC checkpoint: CFC-STATS FIX V1.1 con minutos visibles"
========================================================== */

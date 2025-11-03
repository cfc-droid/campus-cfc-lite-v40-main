/* ==========================================================
✅ CFC_FUNC_8_1_20251105 — Analítica interna de progreso
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnStats");
  if (!btn) return;

  btn.addEventListener("click", openStatsModal);
});

function openStatsModal() {
  const modules = parseInt(localStorage.getItem("CFC_modulesCompleted") || 0);
  const exams = parseInt(localStorage.getItem("CFC_examsPassed") || 0);
  const time = parseFloat(localStorage.getItem("CFC_time") || 0) / 3600;
  const days = parseInt(localStorage.getItem("CFC_days") || 1);

  // eliminar si hay otro modal abierto
  document.querySelector(".stats-modal")?.remove();

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="stats-modal">
      <h3>📊 Tu progreso</h3>
      <p>Módulos completados: <b>${modules}/20</b></p>
      <p>Exámenes aprobados: <b>${exams}/20</b></p>
      <p>Horas activas: <b>${time.toFixed(1)} h</b></p>
      <p>Días consecutivos de estudio: <b>${days}</b></p>
      <button onclick="document.querySelector('.stats-modal').remove()">Cerrar</button>
    </div>`
  );
}
/* ==========================================================
🔒 CFC-SYNC
# ✅ CFC_FUNC_8_1_20251105 — Panel de progreso agregado
echo "🧩 CFC_SYNC checkpoint: CFC-STATS V1 activo — P8 actualizado"
========================================================== */

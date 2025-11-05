/* ==========================================================
   ✅ CFC-STATS V10.1 REAL — Sincronización total con progress_v2.js V9.9
   ----------------------------------------------------------
   • Lee datos reales desde studyStats + progressData
   • Reinicio total efectivo (detecta localStorage vacío)
   • Porcentaje, horas y días actualizados dinámicamente
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnStats");
  if (!btn) return;
  btn.addEventListener("click", openStatsModal);
});

function openStatsModal() {
  /* 🧭 Variables base */
  let modules = 0, hours = 0, minutes = 0, daysConsec = 0, daysTotal = 0;

  /* =====================================================
     BLOQUE 1 — Detectar reinicio total
     ===================================================== */
  if (!localStorage.length) {
    console.log("🧹 CFC-STATS → Reinicio total detectado: mostrando valores 0.");
    showStatsModal(0, 0, 0, 0, 0);
    return;
  }

  /* =====================================================
     BLOQUE 2 — Leer progreso de módulos
     ===================================================== */
  try {
    const progressData = JSON.parse(localStorage.getItem("progressData") || "{}");
    if (progressData.completed && Array.isArray(progressData.completed)) {
      modules = progressData.completed.length;
    }
  } catch (err) {
    console.warn("⚠️ CFC-STATS → Error leyendo progressData:", err);
  }

  /* =====================================================
     BLOQUE 3 — Leer estadísticas de estudio reales
     ===================================================== */
  try {
    const study = JSON.parse(localStorage.getItem("studyStats") || "{}");
    if (study.minutesActive) {
      minutes = parseInt(study.minutesActive);
      hours = minutes / 60;
    }
    if (study.sessions) {
      daysConsec = study.sessions;     // sesiones = días consecutivos de estudio aprox
      daysTotal = study.sessions;      // mismo valor inicial hasta implementar tracking diario real
    }
  } catch (err) {
    console.warn("⚠️ CFC-STATS → Error leyendo studyStats:", err);
  }

  /* =====================================================
     BLOQUE 4 — Calcular porcentaje global
     ===================================================== */
  const percentage = Math.min(100, Math.round((modules / 20) * 100));

  /* =====================================================
     BLOQUE 5 — Mostrar modal
     ===================================================== */
  showStatsModal(modules, hours, minutes, daysConsec, daysTotal, percentage);
}

/* =====================================================
   FUNCIÓN — Renderizar modal visual
   ===================================================== */
function showStatsModal(modules, hours, minutes, daysConsec, daysTotal, percentage = 0) {
  document.querySelector(".stats-modal")?.remove();

  const html = `
    <div class="stats-modal" style="
      position:fixed;inset:0;background:rgba(0,0,0,0.85);
      display:flex;flex-direction:column;justify-content:center;align-items:center;
      color:#FFD700;font-family:'Poppins',sans-serif;z-index:99999;
      padding:20px;text-align:center;border:2px solid rgba(255,215,0,0.25);
      backdrop-filter:blur(6px);border-radius:14px;">
      <h3 style="margin-bottom:14px;">📊 Tu progreso</h3>
      <p>Módulos completados: <b>${modules}/20</b> (<b>${percentage}%</b>)</p>
      <p>Horas activas: <b>${hours.toFixed(1)} h</b> (<b>${minutes.toFixed(0)} min</b>)</p>
      <p>Días consecutivos de estudio: <b>${daysConsec}</b></p>
      <p>Días totales de estudio: <b>${daysTotal}</b></p>
      <button id="closeStats" style="
        margin-top:20px;padding:10px 20px;
        background:linear-gradient(90deg,#FFD700,#FFEC8B);
        border:none;border-radius:10px;font-weight:700;color:#000;cursor:pointer;
        box-shadow:0 0 12px rgba(255,215,0,0.4);">
        Cerrar
      </button>
    </div>`;

  document.body.insertAdjacentHTML("beforeend", html);
  document.getElementById("closeStats").onclick = () => document.querySelector(".stats-modal")?.remove();

  console.log(`🧩 CFC-STATS V10.1 → Mód:${modules}, Horas:${hours.toFixed(1)}, Min:${minutes.toFixed(0)}, DíasC:${daysConsec}, DíasT:${daysTotal}, %:${percentage}`);
}

/* =====================================================
   🔒 CFC_LOCK: V10.1-stats_fullsync-20251106
   ===================================================== */

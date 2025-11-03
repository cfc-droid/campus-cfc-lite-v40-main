/* ==========================================================
✅ CFC_FUNC_8_2_20251105 — Tracker de actividad (horas y días)
Sistema persistente localStorage para Campus CFC LITE V41 REAL
========================================================== */

(function () {
  // 🕒 Timestamp de inicio de sesión actual
  const startTime = Date.now();

  // 📅 Fecha actual en formato YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // 🧩 Lectura inicial
  let totalSeconds = parseFloat(localStorage.getItem("CFC_time") || 0);
  let lastDate = localStorage.getItem("CFC_lastDate") || today;
  let consecutiveDays = parseInt(localStorage.getItem("CFC_days") || 1);
  let totalDays = parseInt(localStorage.getItem("CFC_totalDays") || 0);

  // 📆 Verificación diaria
  if (today !== lastDate) {
    const diffDays =
      (new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24);

    // Días consecutivos o reinicio
    if (diffDays === 1) consecutiveDays += 1;
    else consecutiveDays = 1;

    // Sumar día total de estudio (único por fecha)
    totalDays += 1;

    // Actualizar última fecha registrada
    localStorage.setItem("CFC_lastDate", today);
  }

  // 💾 Guardar días actualizados
  localStorage.setItem("CFC_days", consecutiveDays);
  localStorage.setItem("CFC_totalDays", totalDays);

  // 🕐 Al salir, calcular tiempo total acumulado
  window.addEventListener("beforeunload", () => {
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const newTotal = totalSeconds + elapsedSeconds;
    localStorage.setItem("CFC_time", newTotal);
    console.log(
      `🕒 CFC-ACTIVITY — Sesión guardada (${(elapsedSeconds / 60).toFixed(
        1
      )} min) | Total ${(newTotal / 3600).toFixed(2)} h`
    );
  });

  // 🧠 Log de control
  console.log(
    `✅ CFC-ACTIVITY V1 — Día:${today} | Consecutivos:${consecutiveDays} | Totales:${totalDays} | Tiempo acumulado:${(
      totalSeconds / 3600
    ).toFixed(2)} h`
  );
})();

/* ==========================================================
🔒 CFC-SYNC
# ✅ CFC_FUNC_8_2_20251105 — Sistema de tiempo y días activo
echo "🧩 CFC_SYNC checkpoint: CFC-ACTIVITY V1 sincronizado"
========================================================== */

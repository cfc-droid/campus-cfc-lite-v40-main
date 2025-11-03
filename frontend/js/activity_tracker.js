/* ==========================================================
✅ CFC_FUNC_8_2_20251105 — Tracker de actividad (horas y días)
   Sistema persistente localStorage para Campus CFC LITE
========================================================== */

(function () {
  // Timestamp de inicio de sesión actual
  const startTime = Date.now();

  // Obtener fecha actual en formato YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Leer valores previos del almacenamiento
  let totalSeconds = parseFloat(localStorage.getItem("CFC_time") || 0);
  let lastDate = localStorage.getItem("CFC_lastDate") || today;
  let consecutiveDays = parseInt(localStorage.getItem("CFC_days") || 1);
  let totalDays = parseInt(localStorage.getItem("CFC_totalDays") || 0);

  // Verificar si es un nuevo día de estudio
  if (today !== lastDate) {
    const diffDays =
      (new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24);

    // Si pasó un día, sumar consecutivo, si más de uno, reiniciar
    if (diffDays === 1) {
      consecutiveDays += 1;
    } else {
      consecutiveDays = 1;
    }

    // Aumentar días totales de estudio (único por fecha)
    totalDays += 1;

    // Actualizar registro de fecha
    localStorage.setItem("CFC_lastDate", today);
  }

  // Guardar cambios de días
  localStorage.setItem("CFC_days", consecutiveDays);
  localStorage.setItem("CFC_totalDays", totalDays);

  // Calcular tiempo activo al salir de la página
  window.addEventListener("beforeunload", () => {
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const newTotal = totalSeconds + elapsedSeconds;
    localStorage.setItem("CFC_time", newTotal);
    console.log(
      `🕒 CFC-ACTIVITY — Sesión guardada (${(elapsedSeconds / 60).toFixed(
        1
      )} min) | Total: ${(newTotal / 3600).toFixed(2)} h`
    );
  });

  // Log de control
  console.log(
    `✅ CFC-ACTIVITY V1 — Día:${today} | Consecutivos:${consecutiveDays} | Totales:${totalDays} | Tiempo acumulado:${(
      totalSeconds / 3600
    ).toFixed(2)} h`
  );
})();

/* ==========================================================
🔒 CFC-SYNC
# ✅ CFC_FUNC_8_2_20251105 — Sistema de tiempo y días integrado
echo "🧩 CFC_SYNC checkpoint: CFC-ACTIVITY V1 activo y sincronizado"
========================================================== */

/* ==========================================================
✅ CFC_FUNC_8_3_FIX_20251105 — Tracker de actividad avanzado
Sistema persistente localStorage + minutos activos visibles
========================================================== */

(function () {
  const startTime = Date.now();
  const today = new Date().toISOString().split("T")[0];

  // 🧩 Cargar valores previos o inicializar
  let totalSeconds = parseFloat(localStorage.getItem("CFC_time") || 0);
  let lastDate = localStorage.getItem("CFC_lastDate") || today;
  let consecutiveDays = parseInt(localStorage.getItem("CFC_days") || 1);
  let totalDays = parseInt(localStorage.getItem("CFC_totalDays") || 0);

  // 📆 Si es el primer acceso o el primer día registrado
  if (!localStorage.getItem("CFC_lastDate")) {
    localStorage.setItem("CFC_lastDate", today);
    totalDays = 1;
  }

  // 📅 Verificación de cambio de día
  if (today !== lastDate) {
    const diffDays =
      (new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) consecutiveDays += 1;
    else consecutiveDays = 1;

    totalDays += 1;
    localStorage.setItem("CFC_lastDate", today);
  }

  // 💾 Guardar los valores actualizados de días
  localStorage.setItem("CFC_days", consecutiveDays);
  localStorage.setItem("CFC_totalDays", totalDays);

  // 🔄 Cálculo en vivo cada 10 segundos (mantiene consistencia)
  setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    const currentTotal = totalSeconds + elapsed;
    localStorage.setItem("CFC_time_temp", currentTotal);
  }, 10000);

  // 🕐 Al cerrar o recargar, guardar tiempo total persistente
  window.addEventListener("beforeunload", () => {
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const newTotal = totalSeconds + elapsedSeconds;
    localStorage.setItem("CFC_time", newTotal);
    localStorage.removeItem("CFC_time_temp");
    console.log(
      `🕒 CFC-ACTIVITY — Sesión guardada (${(elapsedSeconds / 60).toFixed(
        1
      )} min) | Total ${(newTotal / 3600).toFixed(2)} h`
    );
  });

  // 🧠 Log de control
  console.log(
    `✅ CFC-ACTIVITY FIX — Día:${today} | Consecutivos:${consecutiveDays} | Totales:${totalDays} | Tiempo acumulado:${(
      totalSeconds / 3600
    ).toFixed(2)} h`
  );
})();

/* ==========================================================
🔒 CFC-SYNC
# ✅ CFC_FUNC_8_3_FIX_20251105 — Tracker avanzado (horas, minutos, días)
echo "🧩 CFC_SYNC checkpoint: CFC-ACTIVITY FIX V1.1 activo"
========================================================== */

/* ==========================================================
✅ CFC_FUNC_8_4_FIX_20251105 — Tracker de actividad + Indicador visual
Sistema persistente localStorage + minutos activos visibles en tiempo real
========================================================== */

(function () {
  const startTime = Date.now();
  const today = new Date().toISOString().split("T")[0];

  // 🧩 Lectura previa de datos persistentes
  let totalSeconds = parseFloat(localStorage.getItem("CFC_time") || 0);
  let lastDate = localStorage.getItem("CFC_lastDate") || today;
  let consecutiveDays = parseInt(localStorage.getItem("CFC_days") || 1);
  let totalDays = parseInt(localStorage.getItem("CFC_totalDays") || 0);

  // 🕓 Inicialización del primer día
  if (!localStorage.getItem("CFC_lastDate")) {
    localStorage.setItem("CFC_lastDate", today);
    totalDays = 1;
  }

  // 📅 Verificación de cambio de fecha
  if (today !== lastDate) {
    const diffDays =
      (new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) consecutiveDays += 1;
    else consecutiveDays = 1;

    totalDays += 1;
    localStorage.setItem("CFC_lastDate", today);
  }

  // 💾 Guardar datos de días actualizados
  localStorage.setItem("CFC_days", consecutiveDays);
  localStorage.setItem("CFC_totalDays", totalDays);

  /* ==========================================================
     🟡 Indicador visual de sesión activa (SUBPASO 3/3)
  ========================================================== */

  // Crear y mostrar el indicador
  const indicator = document.createElement("div");
  indicator.id = "cfc-session-indicator";
  indicator.innerHTML = "⏱ Sesión activa: 0 min 00 s";
  Object.assign(indicator.style, {
    position: "fixed",
    bottom: "20px",
    right: "25px",
    background: "rgba(255, 215, 0, 0.15)",
    border: "1px solid rgba(255, 215, 0, 0.4)",
    padding: "6px 14px",
    borderRadius: "12px",
    color: "#FFD700",
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9rem",
    letterSpacing: "0.5px",
    zIndex: "9999",
    boxShadow: "0 0 8px rgba(255, 215, 0, 0.2)",
    backdropFilter: "blur(4px)",
  });
  document.body.appendChild(indicator);

  // ⏱ Actualizador visual en tiempo real
  const liveInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    indicator.innerHTML = `⏱ Sesión activa: ${minutes} min ${seconds
      .toString()
      .padStart(2, "0")} s`;
  }, 1000);

  // 🔄 Guardado temporal cada 10 segundos
  const tempInterval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    const currentTotal = totalSeconds + elapsed;
    localStorage.setItem("CFC_time_temp", currentTotal);
  }, 10000);

  // 🕐 Al cerrar la pestaña, guardar el tiempo final
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
    clearInterval(liveInterval);
    clearInterval(tempInterval);
  });

  // 🧠 Log de control inicial
  console.log(
    `✅ CFC-ACTIVITY FIX — Día:${today} | Consecutivos:${consecutiveDays} | Totales:${totalDays} | Tiempo acumulado:${(
      totalSeconds / 3600
    ).toFixed(2)} h`
  );
})();

/* ==========================================================
🔒 CFC-SYNC
# ✅ CFC_FUNC_8_4_FIX_20251105 — Indicador de sesión activa (V1 REAL)
echo "🧩 CFC_SYNC checkpoint: CFC-ACTIVITY V1.2 + Visual en tiempo real OK"
========================================================== */

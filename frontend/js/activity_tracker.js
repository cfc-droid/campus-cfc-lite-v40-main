/* ==========================================================
✅ CFC_FUNC_8_3_FIX_V1.3_20251105 — Tracker de actividad avanzado + autosync
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
    consecutiveDays = diffDays === 1 ? consecutiveDays + 1 : 1;
    totalDays += 1;
    localStorage.setItem("CFC_lastDate", today);
  }

  // 💾 Guardar los valores actualizados de días
  localStorage.setItem("CFC_days", consecutiveDays);
  localStorage.setItem("CFC_totalDays", totalDays);

  // 🕓 Indicador visual de sesión activa
  const indicator = document.createElement("div");
  indicator.id = "sessionIndicator";
  indicator.style.position = "fixed";
  indicator.style.bottom = "10px";
  indicator.style.right = "20px";
  indicator.style.background = "rgba(255,215,0,0.15)";
  indicator.style.color = "#FFD700";
  indicator.style.padding = "6px 14px";
  indicator.style.border = "1px solid #FFD700";
  indicator.style.borderRadius = "12px";
  indicator.style.fontSize = "0.9rem";
  indicator.style.fontFamily = "Poppins, sans-serif";
  indicator.style.zIndex = "9999";
  indicator.style.backdropFilter = "blur(6px)";
  document.body.appendChild(indicator);

  function updateVisualTime() {
    const elapsed = (Date.now() - startTime) / 1000;
    const minutes = Math.floor(elapsed / 60);
    const seconds = Math.floor(elapsed % 60);
    indicator.textContent = `🕒 Sesión activa: ${minutes} min ${seconds
      .toString()
      .padStart(2, "0")} s`;
  }

  setInterval(updateVisualTime, 1000);

   // 🔄 Guardado temporal cada 30 segundos
  setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    localStorage.setItem("CFC_time_temp", totalSeconds + elapsed);
  }, 30000);

  // 🧠 Sincronización automática cada 60 s (total persistente)
  setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    const newTotal = totalSeconds + elapsed;
    totalSeconds = newTotal; // 🔥 sincroniza variable base
    localStorage.setItem("CFC_time", newTotal);
    localStorage.removeItem("CFC_time_temp");
    console.log(`💾 AutoSync — Tiempo total ${(newTotal / 60).toFixed(1)} min`);
  }, 60000);

  // 🕐 Guardado al cerrar o recargar
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

  // 🧩 Log de control
  console.log(
    `✅ CFC-ACTIVITY FIX V1.3 — Día:${today} | Consecutivos:${consecutiveDays} | Totales:${totalDays} | Tiempo acumulado:${(
      totalSeconds / 3600
    ).toFixed(2)} h`
  );
})();

/* ==========================================================
🔒 CFC-SYNC
# ✅ CFC_FUNC_8_3_FIX_V1.3_20251105 — Tracker avanzado (autosync 60s + visual)
echo "🧩 CFC_SYNC checkpoint: CFC-ACTIVITY V1.3 REAL QA-SYNC OK"
========================================================== */

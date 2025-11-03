/* ==========================================================
✅ CFC_FUNC_8_3_FIX_V1.7_REALTIME_QA_SAFE_20251106
Tracker de actividad avanzado + corrección de duplicado por CFC_time_temp residual
========================================================== */

(function () {
  let startTime = Date.now();
  const today = new Date().toISOString().split("T")[0];

  // 🧼 Limpieza inicial para evitar arrastre de tiempo fantasma
  localStorage.removeItem("CFC_time_temp");

  // 🧩 Cargar valores previos o inicializar
  let totalSeconds = parseFloat(localStorage.getItem("CFC_time") || 0);
  let lastDate = localStorage.getItem("CFC_lastDate") || today;
  let consecutiveDays = parseInt(localStorage.getItem("CFC_days") || 1);
  let totalDays = parseInt(localStorage.getItem("CFC_totalDays") || 0);

  if (!localStorage.getItem("CFC_lastDate")) {
    localStorage.setItem("CFC_lastDate", today);
    totalDays = 1;
  }

  if (today !== lastDate) {
    const diffDays =
      (new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24);
    consecutiveDays = diffDays === 1 ? consecutiveDays + 1 : 1;
    totalDays += 1;
    localStorage.setItem("CFC_lastDate", today);
  }

  localStorage.setItem("CFC_days", consecutiveDays);
  localStorage.setItem("CFC_totalDays", totalDays);

  // 🕓 Indicador visual
  const indicator = document.createElement("div");
  indicator.id = "sessionIndicator";
  Object.assign(indicator.style, {
    position: "fixed",
    bottom: "10px",
    right: "20px",
    background: "rgba(255,215,0,0.15)",
    color: "#FFD700",
    padding: "6px 14px",
    border: "1px solid #FFD700",
    borderRadius: "12px",
    fontSize: "0.9rem",
    fontFamily: "Poppins, sans-serif",
    zIndex: "9999",
    backdropFilter: "blur(6px)",
  });
  document.body.appendChild(indicator);

  // 🧮 Actualización visual
  function updateVisualTime() {
    const elapsed = (Date.now() - startTime) / 1000;
    const minutes = Math.floor(elapsed / 60);
    const seconds = Math.floor(elapsed % 60);
    indicator.textContent = `🕒 Sesión activa: ${minutes} min ${seconds
      .toString()
      .padStart(2, "0")} s`;
  }
  setInterval(updateVisualTime, 1000);

  // 💾 Sincronización cada 10 s
  setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    const newTotal = totalSeconds + elapsed;
    totalSeconds = newTotal;
    localStorage.setItem("CFC_time", newTotal);
    localStorage.removeItem("CFC_time_temp");

    // 🧠 Reset de base temporal
    startTime = Date.now();

    // 🔍 Log de QA (visible solo en consola)
    console.log(
      `[${new Date().toLocaleTimeString()}] +${(elapsed / 60).toFixed(
        1
      )} min → Total ${(newTotal / 60).toFixed(1)} min`
    );
  }, 10000);

  // 🕐 Guardado al cerrar
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

  console.log(
    `✅ CFC-ACTIVITY FIX V1.7 — Día:${today} | Consecutivos:${consecutiveDays} | Totales:${totalDays} | Tiempo acumulado:${(
      totalSeconds / 3600
    ).toFixed(2)} h`
  );
})();

/* ==========================================================
🔒 CFC-SYNC
# ✅ CFC_FUNC_8_3_FIX_V1.7_REALTIME_QA_SAFE_20251106 — Limpieza inicial + QA log visible
echo "🧩 CFC_SYNC checkpoint: ACTIVITY V1.7 REALTIME QA SAFE OK"
========================================================== */

/* ==========================================================
   ✅ CFC_ACTIVITY_V10.9_REAL_TOTALTRACK — 2025-11-06
   ----------------------------------------------------------
   • Acumulación total de tiempo: lectura + exámenes + perfil
   • Sincronización con progress_v2.js y stats_v1.js
   • Persistencia automática en CFC_time_total
   ========================================================== */

(function () {
  const today = new Date().toISOString().split("T")[0];
  let startTime = Date.now();
  let totalSeconds = parseFloat(localStorage.getItem("CFC_time_total") || 0);

  // 🗓️ Control de días
  let lastDate = localStorage.getItem("CFC_lastDate") || today;
  let consecutiveDays = parseInt(localStorage.getItem("CFC_days") || 1);
  let totalDays = parseInt(localStorage.getItem("CFC_totalDays") || 1);
  if (today !== lastDate) {
    const diff = (new Date(today) - new Date(lastDate)) / 86400000;
    consecutiveDays = diff === 1 ? consecutiveDays + 1 : 1;
    totalDays += 1;
    localStorage.setItem("CFC_lastDate", today);
  }
  localStorage.setItem("CFC_days", consecutiveDays);
  localStorage.setItem("CFC_totalDays", totalDays);

  // 🎯 Indicador visual inferior
  const indicator = document.createElement("div");
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
    fontFamily: "Poppins,sans-serif",
    zIndex: "9999",
    backdropFilter: "blur(6px)"
  });
  document.body.appendChild(indicator);

  const updateIndicator = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    const min = Math.floor(elapsed / 60);
    const sec = Math.floor(elapsed % 60);
    indicator.textContent = `🕒 Sesión activa: ${min} min ${sec.toString().padStart(2, "0")} s`;
  };
  setInterval(updateIndicator, 1000);

  // 🔄 Sync cada 10 s
  const sync = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    startTime = Date.now();
    totalSeconds += elapsed;
    localStorage.setItem("CFC_time_total", totalSeconds);
    localStorage.setItem("CFC_time", totalSeconds); // compatibilidad vieja

    const study = JSON.parse(localStorage.getItem("studyStats") || "{}");
    study.minutesActive = Math.floor(totalSeconds / 60);
    study.sessions = totalDays;
    localStorage.setItem("studyStats", JSON.stringify(study));

    console.log(`🧩 CFC_SYNC → +${(elapsed / 60).toFixed(1)} min | Total ${(totalSeconds / 60).toFixed(1)} min`);
  };
  const syncInterval = setInterval(sync, 10000);

  // 💾 Guardar al cerrar pestaña
  window.addEventListener("beforeunload", sync);

  // 📘 Incluir duración de examen automáticamente
  window.addEventListener("examCompleted", (e) => {
    const data = e.detail;
    if (!data || !data.duracionSegundos) return;
    totalSeconds += data.duracionSegundos;
    localStorage.setItem("CFC_time_total", totalSeconds);
    console.log(`📘 CFC_SYNC exam → +${(data.duracionSegundos / 60).toFixed(1)} min`);
  });

  // ⚙️ Reinicio global (desde progress_v2.js)
  window.addEventListener("storage", (e) => {
    if (e.key === "progressData" || e.key === null) {
      console.warn("🧹 Reinicio global detectado — limpiando tiempo total");
      totalSeconds = 0;
      startTime = Date.now();
      localStorage.setItem("CFC_time_total", 0);
      localStorage.setItem("studyStats", JSON.stringify({ minutesActive: 0, sessions: 0 }));
      indicator.textContent = "🕒 Sesión activa: 0 min 00 s";
    }
  });

  console.log(`✅ CFC_ACTIVITY_V10.9_REAL_TOTALTRACK — Día:${today} | Total ${(totalSeconds / 3600).toFixed(2)} h`);
})();

/* ==========================================================
🔒 CFC_LOCK: V10.9-REAL_TOTALTRACK-20251106
========================================================== */

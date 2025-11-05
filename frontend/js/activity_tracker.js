/* ==========================================================
   ✅ CFC_ACTIVITY_V10.8_REAL_FIX — 2025-11-06
   ----------------------------------------------------------
   • Reinicio duro de tiempo (RAM + localStorage)
   • Evita reescrituras fantasma tras reinicio
   • Sincronizado con progress_v2.js V10.7 REAL
   • Resetea contador visual al instante (sin recargar)
   ========================================================== */

(function () {
  const today = new Date().toISOString().split("T")[0];
  let startTime = Date.now();
  let totalSeconds = 0;

  /* 🧩 Reinicio duro si localStorage está vacío */
  if (!localStorage.getItem("progressData")) {
    console.log("🧹 CFC_ACTIVITY → Reinicio duro detectado, reseteando variables internas...");
    localStorage.setItem("CFC_time", 0);
    localStorage.setItem("studyStats", JSON.stringify({ minutesActive: 0, sessions: 0 }));
    totalSeconds = 0;
  } else {
    totalSeconds = parseFloat(localStorage.getItem("CFC_time") || 0);
  }

  /* 🗓️ Control de cambio de día */
  let lastDate = localStorage.getItem("CFC_lastDate") || today;
  let consecutiveDays = parseInt(localStorage.getItem("CFC_days") || 1);
  let totalDays = parseInt(localStorage.getItem("CFC_totalDays") || 1);

  if (today !== lastDate) {
    const diff = (new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24);
    consecutiveDays = diff === 1 ? consecutiveDays + 1 : 1;
    totalDays += 1;
    localStorage.setItem("CFC_lastDate", today);
  }
  localStorage.setItem("CFC_days", consecutiveDays);
  localStorage.setItem("CFC_totalDays", totalDays);

  /* =====================================================
     BLOQUE 1 — Indicador visual
     ===================================================== */
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

  const updateVisualTime = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    const minutes = Math.floor(elapsed / 60);
    const seconds = Math.floor(elapsed % 60);
    indicator.textContent = `🕒 Sesión activa: ${minutes} min ${seconds
      .toString()
      .padStart(2, "0")} s`;
  };
  setInterval(updateVisualTime, 1000);

  /* =====================================================
     BLOQUE 2 — Sincronización cada 10 s
     ===================================================== */
  const syncInterval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    startTime = Date.now();
    totalSeconds += elapsed;
    localStorage.setItem("CFC_time", totalSeconds);

    const study = JSON.parse(localStorage.getItem("studyStats") || "{}");
    const prev = parseInt(study.minutesActive || 0);
    study.minutesActive = prev + Math.floor(elapsed / 60);
    study.sessions = totalDays;
    localStorage.setItem("studyStats", JSON.stringify(study));

    console.log(
      `🧩 CFC_SYNC → +${(elapsed / 60).toFixed(1)} min | Total ${(totalSeconds / 60).toFixed(1)} min`
    );
  }, 10000);

  /* =====================================================
     BLOQUE 3 — Guardar al cerrar pestaña
     ===================================================== */
  window.addEventListener("beforeunload", () => {
    const elapsed = (Date.now() - startTime) / 1000;
    totalSeconds += elapsed;
    localStorage.setItem("CFC_time", totalSeconds);

    const study = JSON.parse(localStorage.getItem("studyStats") || "{}");
    const prev = parseInt(study.minutesActive || 0);
    study.minutesActive = prev + Math.floor(elapsed / 60);
    study.sessions = totalDays;
    localStorage.setItem("studyStats", JSON.stringify(study));

    console.log(
      `🕒 CFC-ACTIVITY → Guardado final ${(elapsed / 60).toFixed(1)} min | Total ${(totalSeconds / 3600).toFixed(2)} h`
    );
  });

  /* =====================================================
     BLOQUE 4 — Escucha de reinicio explícito (RAM + UI)
     ===================================================== */
  window.addEventListener("storage", (e) => {
    if (e.key === "progressData" || e.key === null) {
      console.log("🧹 CFC_ACTIVITY → Reinicio detectado vía storage, limpiando RAM + UI...");
      totalSeconds = 0;
      startTime = Date.now();
      clearInterval(syncInterval);

      localStorage.setItem("CFC_time", 0);
      localStorage.setItem("studyStats", JSON.stringify({ minutesActive: 0, sessions: 0 }));

      // 🧭 Reiniciar visual al instante
      indicator.textContent = "🕒 Sesión activa: 0 min 00 s";

      // 🧱 Reiniciar temporizador de sync
      setTimeout(() => {
        console.log("♻️ CFC_ACTIVITY → Sincronización reactivada tras reinicio global.");
        startTime = Date.now();
        setInterval(() => {
          const elapsed = (Date.now() - startTime) / 1000;
          startTime = Date.now();
          totalSeconds += elapsed;
          localStorage.setItem("CFC_time", totalSeconds);
        }, 10000);
      }, 1500);
    }
  });

  console.log(
    `✅ CFC_ACTIVITY_V10.8_REAL_FIX — Día:${today} | Consecutivos:${consecutiveDays} | Totales:${totalDays} | Tiempo ${(totalSeconds / 3600).toFixed(2)} h`
  );
})();

/* ==========================================================
🔒 CFC_LOCK: V10.8-REAL_FIX-activity_persistente-20251106
========================================================== */

/* ==========================================================
   ✅ CFC_ACTIVITY_V10.5_FULLSYNC_REAL — 2025-11-06
   Integración total con progress_v2.js y stats_v1.js
   ----------------------------------------------------------
   • Acumula tiempo en capítulos, perfil y exámenes
   • Guarda minutos activos en studyStats.minutesActive
   • Reinicio total efectivo con localStorage.clear()
   • Logs QA visibles + indicador visual real
   ========================================================== */

(function () {
  const today = new Date().toISOString().split("T")[0];
  let startTime = Date.now();

  /* 🧼 Limpieza inicial (por si quedó tiempo fantasma) */
  localStorage.removeItem("CFC_time_temp");

  /* 🧩 Cargar valores previos */
  let totalSeconds = parseFloat(localStorage.getItem("CFC_time") || 0);
  let lastDate = localStorage.getItem("CFC_lastDate") || today;
  let consecutiveDays = parseInt(localStorage.getItem("CFC_days") || 1);
  let totalDays = parseInt(localStorage.getItem("CFC_totalDays") || 1);

  /* 🗓️ Control de cambio de día */
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
    fontFamily: "Poppins, sans-serif",
    zIndex: "9999",
    backdropFilter: "blur(6px)"
  });
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

  /* =====================================================
     BLOQUE 2 — Sincronización cada 10 s
     ===================================================== */
  setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    startTime = Date.now();
    totalSeconds += elapsed;
    localStorage.setItem("CFC_time", totalSeconds);

    /* 🧠 Guardar también en estructura unificada studyStats */
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
      `🕒 CFC-ACTIVITY — Guardado final ${(elapsed / 60).toFixed(1)} min | Total ${(totalSeconds / 3600).toFixed(2)} h`
    );
  });

  /* =====================================================
     BLOQUE 4 — Detección de reinicio total
     ===================================================== */
  window.addEventListener("storage", (e) => {
    if (e.key === null || e.key === "progressData") {
      const study = { minutesActive: 0, sessions: 0 };
      localStorage.setItem("studyStats", JSON.stringify(study));
      localStorage.setItem("CFC_time", 0);
      console.log("🧹 CFC_SYNC → Reinicio total detectado: tiempo puesto en 0.");
    }
  });

  console.log(
    `✅ CFC-ACTIVITY_V10.5_FULLSYNC_REAL — Día:${today} | Consecutivos:${consecutiveDays} | Totales:${totalDays} | Total:${(
      totalSeconds / 3600
    ).toFixed(2)} h`
  );
})();

/* ==========================================================
🔒 CFC_LOCK: V10.5-activity_fullsync-20251106
========================================================== */

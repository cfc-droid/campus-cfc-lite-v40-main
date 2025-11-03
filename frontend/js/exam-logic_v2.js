/* ==========================================================
   CFC — EXAM LOGIC V2 (SYNC FIX v6.4 FINAL + AUDIO + HISTORIAL FUNCIONAL)
   ========================================================== */
// ✅ CFC_FUNC_3_2_EXAM_SOUND_V9.3 — QA-SYNC 2025-11-03

document.addEventListener("DOMContentLoaded", () => {
  const examBtn = document.querySelector("button[onclick='enviarExamen()']");
  if (!examBtn) return;

  // 🎧 Sonidos
  const successSound = new Audio("../../sounds/success.wav");
  const errorSound   = new Audio("../../sounds/error.wav");
  successSound.volume = 0.6;
  errorSound.volume   = 0.6;

  document.body.addEventListener("click", () => {
    successSound.play().then(() => {
      successSound.pause(); successSound.currentTime = 0;
      console.log("🧩 AudioContext habilitado — QA-SYNC V9.3");
    }).catch(()=>{});
    errorSound.play().then(() => {
      errorSound.pause(); errorSound.currentTime = 0;
    }).catch(()=>{});
  }, { once:true });

  /* ==========================================================
     📘 EVENTO PRINCIPAL — Al hacer clic en ENVIAR EXAMEN
     ========================================================== */
  examBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const form = document.querySelector("#exam-form");
    if (!form) return;

    const formData = new FormData(form);
    let totalQuestions = 0;
    let correctAnswers = 0;

    formData.forEach((value, key) => {
      totalQuestions++;
      const correct = document.querySelector(`input[name="${key}"][data-correct="true"]`);
      if (correct && correct.value === value) correctAnswers++;
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = score >= 70;

    // 💾 Guardar datos inmediatos del examen
    localStorage.setItem("lastExamScore", score);
    localStorage.setItem("lastExamDate", new Date().toISOString());

    const msg = passed
      ? `✅ ¡Aprobado! Obtuviste ${correctAnswers}/${totalQuestions} (${score}%).`
      : `❌ Reprobado. Obtuviste ${correctAnswers}/${totalQuestions} (${score}%).`;

    alert(msg);

    // 🔊 Audio
    setTimeout(() => {
      const snd = passed ? successSound : errorSound;
      snd.currentTime = 0;
      snd.play().catch(() => {});
    }, 300);

    /* ==========================================================
       🧠 BLOQUE CFC SYNC GLOBAL — Progreso y desbloqueos
       ========================================================== */
    const moduleNumber = parseInt(document.body.dataset.module || localStorage.getItem("currentModule") || 1);

    const syncEvent = new CustomEvent("examCompleted", {
      detail: { moduleNumber, score, passed },
    });
    window.dispatchEvent(syncEvent);

    if (typeof showMotivationModal === "function") showMotivationModal(passed);

    localStorage.setItem(`module${moduleNumber}_passed`, passed ? "true" : "false");
    if (passed) {
      localStorage.setItem(`mod${moduleNumber + 1}_unlocked`, "true");
      const modules = JSON.parse(localStorage.getItem("completedModules") || "[]");
      if (!modules.includes(moduleNumber)) {
        modules.push(moduleNumber);
        localStorage.setItem("completedModules", JSON.stringify(modules));
      }
    }

    /* ==========================================================
       🧾 BLOQUE HISTORIAL DE EXÁMENES — Guardado correcto
       ========================================================== */
    try {
      const examResults = JSON.parse(localStorage.getItem("examResults")) || [];
      const moduleName = `Módulo ${moduleNumber}`;
      const date = new Date().toLocaleDateString("es-AR");

      // Evitar duplicados
      const filtered = examResults.filter(r => r.module !== moduleName);

      filtered.push({
        module: moduleName,
        date,
        score,
        status: passed ? "✅ Aprobado" : "❌ Reprobado"
      });

      localStorage.setItem("examResults", JSON.stringify(filtered));
      console.log("🧩 Historial actualizado — QA-SYNC v6.4", filtered);

    } catch (err) {
      console.error("❌ Error guardando historial:", err);
    }
  });
});

/* ==========================================================
   CFC — EXAM LOGIC V2 (SYNC FIX v6.2 + AUDIO V9.2 FINAL + HISTORIAL OK)
   ========================================================== */
// ✅ CFC_FUNC_3_2_EXAM_SOUND_V9.2 — Solución definitiva audio examen + historial — QA-SYNC 2025-11-03

document.addEventListener("DOMContentLoaded", () => {
  const examForm = document.querySelector("#exam-form");
  if (!examForm) return;

  // 🎧 Pre-cargar sonidos y desbloquear contexto al primer click
  const successSound = new Audio("../../sounds/success.wav");
  const errorSound   = new Audio("../../sounds/error.wav");
  successSound.volume = 0.6;
  errorSound.volume   = 0.6;

  document.body.addEventListener("click", () => {
    successSound.play().then(() => {
      successSound.pause(); successSound.currentTime = 0;
      console.log("🧩 CFC_SYNC checkpoint: AudioContext habilitado — QA-SYNC V9.2");
    }).catch(()=>{});
    errorSound.play().then(() => {
      errorSound.pause(); errorSound.currentTime = 0;
    }).catch(()=>{});
  }, { once:true });

  /* ==========================================================
     📘 EVENTO PRINCIPAL — Al enviar examen
     ========================================================== */
  examForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(examForm);
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

    // ✅ Mostrar resultado
    const msg = passed
      ? `✅ ¡Aprobado! Obtuviste ${correctAnswers}/${totalQuestions} (${score}%).`
      : `❌ Reprobado. Obtuviste ${correctAnswers}/${totalQuestions} (${score}%).`;

    console.log("🧩 CFC_SYNC checkpoint: antes del alert() — QA-SYNC V9.2");
    alert(msg);
    console.log("🧩 CFC_SYNC checkpoint: después del alert() — QA-SYNC V9.2");

    // 🔊 Reproducción controlada posterior al alert()
    setTimeout(() => {
      const snd = passed ? successSound : errorSound;
      snd.currentTime = 0;
      snd.play()
        .then(() => console.log(`🧩 CFC_SYNC checkpoint: ${(passed ? "success" : "error")}.wav reproducido — QA-SYNC V9.2`))
        .catch(err => console.warn("Audio playback bloqueado:", err));
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
       🧾 BLOQUE HISTORIAL DE EXÁMENES — Guardado local
       ========================================================== */
    try {
      const examResults = JSON.parse(localStorage.getItem("examResults")) || [];
      const moduleName = `Módulo ${moduleNumber}`;
      const date = new Date().toLocaleDateString("es-AR");

      examResults.push({
        module: moduleName,
        date,
        score,
      });

      localStorage.setItem("examResults", JSON.stringify(examResults));
      console.log("🧩 CFC_SYNC checkpoint: historial actualizado — QA-SYNC P3.2 OK", examResults);
    } catch (err) {
      console.error("❌ Error guardando historial:", err);
    }
  });
});

/* ==========================================================
   🧩 [CFC-SYNC INSERT] — Emisor automático de evento examCompleted
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button[onclick='enviarExamen()']");
  if (!btn) return;
  btn.addEventListener("click", () => {
    setTimeout(() => {
      const aprobado = (localStorage.getItem("lastExamScore") || 0) >= 70;
      const modulo = document.body.dataset.module || 1;
      const evento = new CustomEvent("examCompleted", {
        detail: { moduleNumber: modulo, passed: aprobado }
      });
      window.dispatchEvent(evento);
      console.log("🧩 CFC_SYNC checkpoint: examCompleted emitido — QA-SYNC V7.6", new Date().toLocaleString());
    }, 500);
  });
});

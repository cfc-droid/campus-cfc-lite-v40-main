/* ==========================================================
   CFC — EXAM LOGIC V2 (SYNC FIX v10.0 FINAL + AUDIO V9.2 + HISTORIAL OK)
   ========================================================== */
// ✅ CFC_FUNC_3_2_EXAM_SOUND_V9.2 — Audio examen + historial en vivo — QA-SYNC 2025-11-03

document.addEventListener("DOMContentLoaded", () => {
  // 🔍 Soporta cualquier ID válido de formulario (exam1, exam2, exam3, etc.)
  const examForm =
    document.querySelector("#exam-form") ||
    document.querySelector("form[id^='exam']");

  if (!examForm) {
    console.warn("⚠️ No se encontró el formulario del examen — QA-SYNC V10.0");
    return;
  }

  // 🎧 Sonidos
  const successSound = new Audio("../../sounds/success.wav");
  const errorSound   = new Audio("../../sounds/error.wav");
  successSound.volume = 0.6;
  errorSound.volume   = 0.6;

  // 🔊 Desbloquear contexto de audio
  document.body.addEventListener("click", () => {
    [successSound, errorSound].forEach(snd => {
      snd.play().then(() => {
        snd.pause(); snd.currentTime = 0;
      }).catch(()=>{});
    });
    console.log("🧩 CFC_SYNC checkpoint: AudioContext habilitado — QA-SYNC V10.0");
  }, { once:true });

  /* ==========================================================
     📘 EVENTO PRINCIPAL — Envío del examen
     ========================================================== */
  const sendExam = () => {
    const formData = new FormData(examForm);
    let total = 0, correctas = 0;

    formData.forEach((value, key) => {
      total++;
      const correcta = document.querySelector(
        `input[name="${key}"][data-correct="true"]`
      );
      if (correcta && correcta.value === value) correctas++;
    });

    const score = Math.round((correctas / total) * 100);
    const passed = score >= 70;
    const msg = passed
      ? `✅ ¡Aprobado! Obtuviste ${correctas}/${total} (${score}%).`
      : `❌ Reprobado. Obtuviste ${correctas}/${total} (${score}%).`;

    alert(msg);

    // 🎵 Audio
    setTimeout(() => {
      const snd = passed ? successSound : errorSound;
      snd.currentTime = 0;
      snd.play().catch(()=>{});
    }, 300);

    /* ==========================================================
       🧠 CFC SYNC — Progreso global
       ========================================================== */
    const moduleNumber = parseInt(
      document.body.dataset.module ||
      localStorage.getItem("currentModule") ||
      1
    );

    window.dispatchEvent(
      new CustomEvent("examCompleted", {
        detail: { moduleNumber, score, passed },
      })
    );

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
       🧾 HISTORIAL DE EXÁMENES — Guardado local
       ========================================================== */
    try {
      const examResults = JSON.parse(localStorage.getItem("examResults")) || [];
      const moduleName = `Módulo ${moduleNumber}`;
      const date = new Date().toLocaleDateString("es-AR");

      // Eliminar duplicados
      const filtered = examResults.filter(r => r.module !== moduleName);

      filtered.push({
        module: moduleName,
        date,
        score,
        status: passed ? "✅ Aprobado" : "❌ Reprobado"
      });

      localStorage.setItem("examResults", JSON.stringify(filtered));
      console.log("🧩 CFC_SYNC checkpoint: historial actualizado — QA-SYNC V10.0", filtered);

      // 🔁 Si results.html está abierto, actualizar en vivo
      if (window.location.pathname.includes("results")) {
        const table = document.getElementById("examHistory");
        if (table) {
          const last = filtered[filtered.length - 1];
          const row = `
            <tr>
              <td>${last.module}</td>
              <td>${last.date}</td>
              <td>${last.score}%</td>
              <td>${last.status}</td>
            </tr>`;
          table.insertAdjacentHTML("beforeend", row);
          console.log("🧩 Fila añadida en vivo al historial — QA-SYNC V10.0");
        }
      }
    } catch (err) {
      console.error("❌ Error guardando historial:", err);
    }
  };

  // 🧩 Vincular a botón “Enviar respuestas”
  const btn = document.querySelector("button[onclick='enviarExamen()']");
  if (btn) {
    btn.addEventListener("click", sendExam);
  } else {
    // fallback por seguridad
    examForm.addEventListener("submit", (e) => {
      e.preventDefault();
      sendExam();
    });
  }
});

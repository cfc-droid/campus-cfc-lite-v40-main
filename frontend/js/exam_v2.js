/* ==========================================================
   CFC — EXAM V2 (SYNC FIX v8.6 + AUDIO V9.3 FINAL)
   ========================================================== */
// ✅ CFC_FUNC_3_3_EXAM_SOUND_V9.3 — Audio examen integrado en flujo principal — QA-SYNC 2025-10-30

console.log("🧩 CFC_SYNC checkpoint: exam_v2.js — QA-SYNC V9.3 activo", new Date().toLocaleString());

function enviarExamen() {
  try {
    const preguntas = document.querySelectorAll("fieldset");
    let correctas = 0;

    preguntas.forEach((pregunta) => {
      const seleccionada = pregunta.querySelector("input[type='radio']:checked");
      if (seleccionada) {
        const comentario = pregunta.innerHTML.match(/<!-- Correcta:\s*([A-D]) -->/);
        if (comentario && seleccionada.value === comentario[1]) correctas++;
      }
    });

    const total = preguntas.length;
    const porcentaje = (correctas / total) * 100;
    const aprobado = porcentaje >= 75;

    const modulo = parseInt(document.body.dataset.module || 0);
    const resultado = {
      moduleNumber: modulo,
      correctas,
      total,
      porcentaje,
      passed: aprobado,
      timestamp: new Date().toISOString(),
    };

    // ✅ Guardado persistente
    localStorage.setItem("examResult", JSON.stringify(resultado));

    // ✅ Emisión del evento global (para progress_v2.js)
    const evento = new CustomEvent("examCompleted", { detail: resultado });
    window.dispatchEvent(evento);

    console.log(
      `🧠 CFC_SYNC → Examen módulo ${modulo} emitido — ${correctas}/${total} (${porcentaje.toFixed(
        0
      )}%) — aprobado=${aprobado}`
    );

    // ✅ Mensaje visual + sonido integrado QA-SYNC
    const mensaje = aprobado
      ? `🎯 ¡Aprobado! Obtuviste ${correctas}/${total} (${porcentaje.toFixed(0)}%).`
      : `❌ No aprobado. Obtuviste ${correctas}/${total} (${porcentaje.toFixed(0)}%).`;

    console.log("🧩 CFC_SYNC checkpoint: antes del alert() — QA-SYNC V9.3");
    alert(mensaje);
    console.log("🧩 CFC_SYNC checkpoint: después del alert() — QA-SYNC V9.3");

    // 🔊 Reproducción controlada (desde interacción directa)
    try {
      const successSound = new Audio("../../sounds/success.wav");
      const errorSound = new Audio("../../sounds/error.wav");
      successSound.volume = 0.6;
      errorSound.volume = 0.6;

      const snd = aprobado ? successSound : errorSound;
      snd.currentTime = 0;

      snd.play()
        .then(() =>
          console.log(
            `🧩 CFC_SYNC checkpoint: ${(aprobado ? "success" : "error")}.wav reproducido — QA-SYNC V9.3`
          )
        )
        .catch((err) => console.warn("Audio playback bloqueado:", err));
    } catch (err) {
      console.error("CFC Audio exam error:", err);
    }

    // ✅ Redirección si aprobado
    if (aprobado) {
      setTimeout(() => {
        window.location.href = "../../modules/index.html";
      }, 1500);
    }
  } catch (err) {
    console.error("⚠️ CFC_SYNC → Error general en enviarExamen():", err);
    alert("⚠️ Hubo un problema al procesar el examen. Reintentá nuevamente.");
  }
}

// =====================================================
// Protección QA-SYNC doble declaración
// =====================================================
try {
  if (window._cfc_enviarExamen && typeof _cfc_enviarExamen === "function") {
    console.log("🧩 CFC_SYNC FIX: _cfc_enviarExamen ya existe, omitiendo redeclaración.");
  } else {
    window._cfc_enviarExamen = enviarExamen;
    console.log("🧩 CFC_SYNC FIX: función enviarExamen registrada globalmente.");
  }
} catch (err) {
  console.warn("🧩 CFC_SYNC FIX: control preventivo aplicado.", err);
}

console.log("🧩 CFC_SYNC checkpoint FINAL — QA-SYNC V9.3 validado", new Date().toLocaleString());

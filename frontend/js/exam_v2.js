/* ==========================================================
   ✅ CFC_FUNC_3_6_V12.2_REAL — EXAM V2 Final con duración, intentos y error
   Integración completa QA-SYNC V9.3 + FIX SAVE avanzado 2025-11-03
   Cristian F. Choqui — Campus CFC Trading LITE V41
========================================================== */

console.log("🧩 CFC_SYNC checkpoint: exam_v2.js — QA-SYNC V12.2 activo", new Date().toLocaleString());

// ⏱ Marca de inicio del examen
let examStartTime = Date.now();

/* ==========================================================
   Envío y evaluación del examen
========================================================== */
function enviarExamen() {
  try {
    const preguntas = document.querySelectorAll("fieldset");
    let correctas = 0;
    let errores = [];

    preguntas.forEach((pregunta) => {
      const seleccionada = pregunta.querySelector("input[type='radio']:checked");
      const comentario = pregunta.innerHTML.match(/<!-- Correcta:\s*([A-D]) -->/);

      if (comentario) {
        const correcta = comentario[1];
        if (seleccionada && seleccionada.value === correcta) {
          correctas++;
        } else if (seleccionada && seleccionada.value !== correcta) {
          const textoPregunta = pregunta.querySelector("legend")?.textContent.trim() || "Pregunta desconocida";
          errores.push(textoPregunta);
        }
      }
    });

    const total = preguntas.length;
    const porcentaje = (correctas / total) * 100;
    const aprobado = porcentaje >= 75;
    const duracionSegundos = Math.floor((Date.now() - examStartTime) / 1000);

    const modulo = parseInt(document.body.dataset.module || 0);
    const resultado = {
      moduleNumber: modulo,
      correctas,
      total,
      porcentaje,
      aprobado,
      errores,
      duracionSegundos,
      timestamp: new Date().toISOString(),
      // ✅ Compatibilidad con progress_v2.js
      passed: aprobado
    };

    // 🧩 Guardado avanzado local
    guardarResultadoLocal(correctas, total, errores, duracionSegundos);

    // ✅ Emisión global para progress_v2.js
    const evento = new CustomEvent("examCompleted", { detail: resultado });
    window.dispatchEvent(evento);

    // Mensaje al usuario
    const mensaje = aprobado
      ? `🎯 ¡Aprobado! Obtuviste ${correctas}/${total} (${porcentaje.toFixed(0)}%).`
      : `❌ No aprobado. Obtuviste ${correctas}/${total} (${porcentaje.toFixed(0)}%).`;
    alert(mensaje);

    // 🔊 Sonido
    const successSound = new Audio("../../sounds/success.wav");
    const errorSound = new Audio("../../sounds/error.wav");
    const snd = aprobado ? successSound : errorSound;
    snd.volume = 0.6;
    snd.play().catch(() => console.warn("🔇 Reproducción bloqueada por navegador."));

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

/* ==========================================================
   Registro avanzado en localStorage
========================================================== */
function guardarResultadoLocal(score, total, errores, duracionSegundos) {
  try {
    const moduleTitle = document.querySelector("h1,h2")?.textContent.trim() || "Módulo desconocido";
    const examResults = JSON.parse(localStorage.getItem("examResults")) || [];

    let registro = examResults.find(r => r.module === moduleTitle);
    if (!registro) {
      registro = { module: moduleTitle, attempts: 0 };
      examResults.push(registro);
    }

    registro.attempts++;
    registro.date = new Date().toLocaleDateString("es-AR");
    registro.time = new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
    registro.score = Math.round((score / total) * 100);
    registro.status = (score / total) >= 0.75 ? "✅ Aprobado" : "❌ Reprobado";
    registro.duration = `${(duracionSegundos / 60).toFixed(1)} min`;

    // Guarda primer error solo si hay al menos uno y nota = 75 %
    if (registro.score === 75 && errores?.length) {
      registro.error = errores[0];
    } else if (errores?.length) {
      registro.error = errores[0];
    } else {
      delete registro.error;
    }

    localStorage.setItem("examResults", JSON.stringify(examResults));
    console.log("🧩 CFC_SYNC checkpoint: Resultado avanzado guardado localmente", registro);
  } catch (err) {
    console.error("❌ Error al guardar resultado en localStorage:", err);
  }
}

/* ==========================================================
   Protección QA-SYNC doble declaración
========================================================== */
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

console.log("🧩 CFC_SYNC checkpoint FINAL — QA-SYNC V12.2 validado", new Date().toLocaleString());

/* ==========================================================
   ✅ CFC_FUNC_3_7_V12.3_REAL — EXAM V2 Final con detalle de error
   Guarda pregunta + respuesta fallada + duración + intentos
   Integración QA-SYNC V9.4 — 2025-11-03
========================================================== */

console.log("🧩 CFC_SYNC checkpoint: exam_v2.js — QA-SYNC V12.3 activo", new Date().toLocaleString());

let examStartTime = Date.now(); // ⏱ Inicio del examen

function enviarExamen() {
  try {
    const preguntas = document.querySelectorAll("fieldset");
    let correctas = 0;
    let errores = [];

    preguntas.forEach((pregunta, index) => {
      const seleccionada = pregunta.querySelector("input[type='radio']:checked");
      const comentario = pregunta.innerHTML.match(/<!-- Correcta:\s*([A-D]) -->/);
      const correcta = comentario ? comentario[1] : null;

      if (seleccionada) {
        if (seleccionada.value === correcta) {
          correctas++;
        } else {
          const textoPregunta = pregunta.querySelector("legend")?.textContent.trim() || `Pregunta ${index + 1}`;
          const textoRespuesta = seleccionada.parentElement.textContent.trim();
          errores.push(`${textoPregunta}\n❌ Respuesta marcada: ${textoRespuesta}`);
        }
      } else if (correcta) {
        const textoPregunta = pregunta.querySelector("legend")?.textContent.trim() || `Pregunta ${index + 1}`;
        errores.push(`${textoPregunta}\n⚠️ Sin respuesta seleccionada.`);
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
      passed: aprobado
    };

    localStorage.setItem("examResult", JSON.stringify(resultado));
    guardarResultadoLocal(correctas, total, errores, duracionSegundos);

    const evento = new CustomEvent("examCompleted", { detail: resultado });
    window.dispatchEvent(evento);

    const mensaje = aprobado
      ? `🎯 ¡Aprobado! Obtuviste ${correctas}/${total} (${porcentaje.toFixed(0)}%).`
      : `❌ No aprobado. Obtuviste ${correctas}/${total} (${porcentaje.toFixed(0)}%).`;

    alert(mensaje);

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
   Guardado avanzado local con errores detallados
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

    if (errores?.length) {
      registro.error = errores.join(" | "); // 🔹 Guarda todas las preguntas falladas
    } else {
      registro.error = "-";
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

console.log("🧩 CFC_SYNC checkpoint FINAL — QA-SYNC V12.3 validado", new Date().toLocaleString());

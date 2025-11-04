// ✅ CFC_FUNC_20_1_GRADUACION_V41 — Motor Overlay de Graduación CFC
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('graduacion-overlay');
  const cerrarBtn = document.getElementById('cerrarGraduacion');

  // Verifica si el examen actual es el Módulo 20
  const modulo = document.body.getAttribute('data-module');

  // Hook: se invoca desde exam_v2.js tras aprobar examen
  window.activarGraduacionCFC = function () {
    if (modulo === '20') {
      overlay.classList.remove('oculto');

      // 🎉 Confeti y audio
      try {
        const audio = new Audio('../../assets/audio/success.wav');
        audio.volume = 0.8;
        audio.play();
      } catch (e) {
        console.warn('Audio no disponible', e);
      }

      console.log('🎓 CFC_SYNC checkpoint: Campus completado — Overlay Graduación V41 activo');
    }
  };

  cerrarBtn.addEventListener('click', () => {
    overlay.classList.add('oculto');
  });
});

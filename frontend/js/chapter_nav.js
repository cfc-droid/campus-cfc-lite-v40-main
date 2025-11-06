/* ==========================================================
   ✅ CFC_FUNC_9_1_FIX_V41.11 — Restauración del botón "Continuar al capítulo X"
   📄 Archivo: /frontend/js/chapter_nav.js
   🔒 CFC-SYNC V7.6 | QA-SYNC V10.1 REAL | Build V41.11
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  try {
    const html = document.documentElement;
    const moduleNum = parseInt(html.getAttribute("data-module"));
    const chapterMatch = window.location.pathname.match(/cap(\d+)\.html/);
    if (!chapterMatch) return;

    const currentChapter = parseInt(chapterMatch[1]);
    const main = document.querySelector("main");
    if (!main) return;

    // Crear contenedor
    const container = document.createElement("div");
    container.className = "next-chapter-container";
    container.style.textAlign = "center";
    container.style.marginTop = "50px";

    // Calcular siguiente destino
    const nextChapter = currentChapter + 1;
    let nextUrl = `cap${nextChapter}.html`;
    let nextLabel = `Continuar al Capítulo ${nextChapter} ▶`;

    // Si es el último capítulo, redirigir al examen
    const lastChapter = 4; // ⚙️ Ajustar según cantidad real
    if (currentChapter === lastChapter) {
      nextUrl = `../exam.html`;
      nextLabel = "Ir al Examen Final 🏁";
    }

    // Crear botón
    const btn = document.createElement("button");
    btn.textContent = nextLabel;
    btn.className = "continue-btn";
    btn.style.padding = "14px 28px";
    btn.style.borderRadius = "8px";
    btn.style.fontWeight = "600";
    btn.style.cursor = "pointer";
    btn.style.border = "none";
    btn.style.transition = "0.3s";
    btn.style.background =
      "linear-gradient(90deg, #d4af37 0%, #ffd700 100%)";
    btn.style.color = "#000";
    btn.style.boxShadow = "0 0 12px rgba(212,175,55,0.6)";
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.05)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });

    // Acción click
    btn.addEventListener("click", () => {
      // Guardar progreso
      localStorage.setItem("lastModule", moduleNum);
      localStorage.setItem("lastChapter", currentChapter);
      localStorage.setItem("progress", `${moduleNum}-${currentChapter}`);

      // Audio dorado
      const audio = new Audio("../../audio/bell-gold.wav");
      audio.volume = 0.6;
      setTimeout(() => audio.play().catch(() => {}), 200);

      // Confeti dorado
      for (let i = 0; i < 40; i++) {
        const conf = document.createElement("div");
        conf.classList.add("confetti");
        conf.style.left = Math.random() * 100 + "vw";
        conf.style.background = ["#d4af37", "#ffd700"][
          Math.floor(Math.random() * 2)
        ];
        conf.style.animationDuration = 2.5 + Math.random() * 1.5 + "s";
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 3500);
      }

      // Redirigir
      setTimeout(() => {
        window.location.href = nextUrl;
      }, 800);
    });

    container.appendChild(btn);
    main.appendChild(container);

    console.log(
      `🧩 CFC_SYNC checkpoint: Botón continuar insertado — Módulo ${moduleNum}, Capítulo ${currentChapter}`,
      new Date().toLocaleString()
    );
  } catch (err) {
    console.error("⚠️ chapter_nav.js error:", err);
  }
});

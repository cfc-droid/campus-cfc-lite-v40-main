/* ==========================================================
   ✅ CFC — PROGRESS V2 (SYNC FIX V8.6 + LOCKED V9.4 + OVERLAY + CHAPTER TRANSITION V9.8C)
   ========================================================== */
console.log("🧩 CFC_SYNC checkpoint: progress_v2.js — QA-SYNC V9.8C activo", new Date().toLocaleString());

/* =====================================================
   BLOQUE B1 — Gestión persistente
   ===================================================== */
function ensureProgressData() {
  try {
    const data = localStorage.getItem("progressData");
    if (!data) {
      const base = { completed: [], lastModule: null };
      localStorage.setItem("progressData", JSON.stringify(base));
      console.log("✅ CFC_SYNC → progressData creado:", base);
      return base;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed.completed)) parsed.completed = [];
    if (!("lastModule" in parsed)) parsed.lastModule = null;
    return parsed;
  } catch (err) {
    console.error("⚠️ CFC_SYNC → Reiniciando progressData:", err);
    const reset = { completed: [], lastModule: null };
    localStorage.setItem("progressData", JSON.stringify(reset));
    return reset;
  }
}
let progressData = ensureProgressData();

/* =====================================================
   BLOQUE B2 — Guardar progreso y calcular siguiente módulo
   ===================================================== */
function markModuleComplete(moduleNumber) {
  const nextModule = Math.min(moduleNumber + 1, 20);
  const currentPath = `/modules/${moduleNumber}/index.html`;
  const nextPath = `/modules/${nextModule}/index.html`;

  if (!progressData.completed.includes(currentPath)) {
    progressData.completed.push(currentPath);
  }
  progressData.lastModule = moduleNumber >= 20 ? currentPath : nextPath;
  localStorage.setItem("progressData", JSON.stringify(progressData));

  console.log(`🏁 CFC_SYNC → Módulo ${moduleNumber} completado → Siguiente: ${nextModule}`);
  updateProgressDisplay();

  if (moduleNumber < 20) showUnlockOverlay(nextModule);
}

/* =====================================================
   BLOQUE B3 — Actualizar barra global
   ===================================================== */
function updateProgressDisplay() {
  const el = document.getElementById("cfc-progress-text");
  const bar = document.getElementById("cfc-progress-bar");
  const total = 20;
  const done = progressData.completed.length;
  const percent = Math.floor((done / total) * 100);
  if (el) el.textContent = `${percent}% completado`;
  if (bar) bar.style.width = `${percent}%`;
}

/* =====================================================
   BLOQUE B4 — Botón “Continuar último módulo” + Sync examen
   ===================================================== */
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    try {
      const stored = localStorage.getItem("examResult");
      if (stored) {
        const data = JSON.parse(stored);
        if (data && data.passed) markModuleComplete(data.moduleNumber);
        localStorage.removeItem("examResult");
      }
    } catch (err) {
      console.warn("⚠️ CFC_SYNC → Error leyendo examResult:", err);
    }

    const continueBtn = document.getElementById("continueBtn");
    if (continueBtn) {
      continueBtn.addEventListener("click", () => {
        const storedData = JSON.parse(localStorage.getItem("progressData") || "{}");
        const target = storedData.lastModule || progressData.lastModule;
        if (target) window.location.href = target;
        else alert("⚠️ No se encontró un módulo anterior. Iniciá desde el Módulo 1.");
      });
    }

    const resetBtn = document.getElementById("resetProgressBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("⚠️ ¿Seguro que querés reiniciar TODO el progreso?")) {
          localStorage.clear();
          launchConfettiGold();
          setTimeout(() => location.reload(), 2200);
        }
      });
    }

    updateProgressDisplay();
  }, 250);
});

/* =====================================================
   BLOQUE B5 — Listener del examen (tiempo real)
   ===================================================== */
window.addEventListener("examCompleted", (e) => {
  const { moduleNumber, passed } = e.detail || {};
  if (passed) markModuleComplete(moduleNumber);
  updateProgressDisplay();
});

/* =====================================================
   BLOQUE B6 — Confeti Dorado
   ===================================================== */
function launchConfettiGold() {
  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 9999
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    r: Math.random() * 6 + 2,
    d: Math.random() * 0.05 + 0.02,
    color: ["#FFD700", "#FFEC8B", "#FFF8DC"][Math.floor(Math.random() * 3)]
  }));

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.y += p.d * 40;
      if (p.y > window.innerHeight) p.y = -10;
    }
  };
  const interval = setInterval(draw, 20);
  setTimeout(() => {
    clearInterval(interval);
    document.body.removeChild(canvas);
  }, 2000);
}

/* =====================================================
   BLOQUE B7 — Detección de módulos bloqueados
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  try {
    const links = document.querySelectorAll(".module-link");
    const data = JSON.parse(localStorage.getItem("progressData") || "{}");
    const completed = data.completed || [];
    let highestUnlocked = 1;

    completed.forEach((path) => {
      const match = path.match(/\/modules\/(\d+)\//);
      if (match) {
        const num = parseInt(match[1]);
        if (num > highestUnlocked) highestUnlocked = num;
      }
    });

    links.forEach((link) => {
      const match = link.getAttribute("href").match(/\.\/(\d+)\//);
      if (match) {
        const num = parseInt(match[1]);
        if (num > highestUnlocked + 1) {
          const li = link.closest("li");
          if (li) li.classList.add("locked");
          link.addEventListener("click", (e) => {
            e.preventDefault();
            alert("🔒 Este módulo aún está bloqueado.");
          });
        }
      }
    });
  } catch (err) {
    console.error("⚠️ CFC_SYNC → Error bloqueos:", err);
  }
});

/* =====================================================
   BLOQUE B8 — Overlay Motivacional Dorado (FUNCIONAL)
   ===================================================== */
function showUnlockOverlay(nextModule) {
  try {
    const existing = document.getElementById("cfcUnlockOverlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      color: "#FFD700",
      fontFamily: "'Poppins', sans-serif",
      fontSize: "1.6rem",
      fontWeight: "700",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
      opacity: 0,
      transition: "opacity 0.8s ease-in-out"
    });

    overlay.innerHTML = `
      <p>✨ ¡Nuevo módulo desbloqueado!<br><br>
      Módulo ${nextModule} ahora está disponible.<br>⚡</p>
      <button id="goToNextModuleBtn"
        style="margin-top:20px;padding:10px 22px;
        background:linear-gradient(90deg,#FFD700,#FFEC8B);
        border:none;border-radius:10px;font-weight:700;
        color:#000;cursor:pointer;box-shadow:0 0 12px rgba(255,215,0,0.45);">
        Ir al nuevo módulo →
      </button>`;
    document.body.appendChild(overlay);

    // 🔊 Sonido dorado
    const bell = new Audio("../../audio/bell-gold.wav");
    bell.volume = 0.7;
    setTimeout(() => bell.play().catch(() => {}), 400);

    // ✅ Click funcional: ir al módulo siguiente
    const btn = overlay.querySelector("#goToNextModuleBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        window.location.href = `/modules/${nextModule}/index.html`;
      });
    }

    setTimeout(() => (overlay.style.opacity = 1), 100);
    setTimeout(() => (overlay.style.opacity = 0), 4500);
    setTimeout(() => overlay.remove(), 5200);
  } catch (err) {
    console.error("⚠️ CFC_SYNC → Error overlay:", err);
  }
}

/* =====================================================
   FUNCIÓN — Transición dorada global
   ===================================================== */
function launchGoldenTransition(targetPath) {
  const overlay = document.createElement("div");
  overlay.style = `
    position:fixed;inset:0;background:#000;
    display:flex;align-items:center;justify-content:center;
    z-index:99999;opacity:0;transition:opacity .5s ease-in-out;
  `;
  overlay.innerHTML = `
    <div id="gold-flash" style="
      width:0;height:0;border-radius:50%;
      background:radial-gradient(circle,#FFD700 0%,#000 70%);
      filter:blur(40px);transition:all .6s ease-out;"></div>
    <div style="position:absolute;font-family:'Poppins',sans-serif;
      color:#FFD700;font-size:1.8rem;font-weight:700;text-align:center;">
      Cargando siguiente capítulo...
    </div>`;
  document.body.appendChild(overlay);

  const flash = overlay.querySelector("#gold-flash");
  setTimeout(() => {
    overlay.style.opacity = 1;
    flash.style.width = "300px";
    flash.style.height = "300px";
  }, 50);

  const bell = new Audio("../../audio/bell-gold.wav");
  bell.volume = 0.6;
  setTimeout(() => bell.play().catch(() => {}), 200);

    // 🔊 Audio adicional: transición entre capítulos
  const transitionSound = new Audio("../../audio/transition.wav");
  transitionSound.volume = 0.7;
  setTimeout(() => transitionSound.play().catch(() => {}), 400); 
   
  setTimeout(() => {
    overlay.style.transition = "opacity .6s ease-in-out";
    overlay.style.opacity = 0;
    setTimeout(() => (window.location.href = targetPath), 600);
  }, 1000);
}

/* =====================================================
   BLOQUE B10 — Botón dorado “Continuar al siguiente capítulo o examen” (FINAL FIX V9.8D)
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  let path = window.location.pathname;
  // Compatibilidad Cloudflare: si no incluye .html, asumimos cap1.html
  if (!path.endsWith(".html") && path.includes("/cap")) path += ".html";

  const match = path.match(/\/modules\/(\d+)\/cap(\d+)\.html$/);
  if (!match) return;

  const modulo = parseInt(match[1]);
  const capNum = parseInt(match[2]);

  let nextPath, btnText;
  if (capNum < 4) {
    nextPath = `cap${capNum + 1}.html`;
    btnText = `➡ Continuar al Capítulo ${capNum + 1}`;
  } else {
    nextPath = `exam.html`;
    btnText = `🏁 Ir al Examen del Módulo ${modulo}`;
  }

  const insertButton = () => {
    if (document.getElementById("nextChapterBtn")) return;

    const footer = document.querySelector("footer");
    const container = footer || document.body;

    const btn = document.createElement("button");
    btn.id = "nextChapterBtn";
    btn.textContent = btnText;
    Object.assign(btn.style, {
      display: "block",
      margin: "40px auto",
      background: "linear-gradient(90deg,#FFD700,#FFEC8B)",
      color: "#000",
      fontWeight: "700",
      border: "none",
      borderRadius: "10px",
      padding: "12px 26px",
      cursor: "pointer",
      boxShadow: "0 0 14px rgba(255,215,0,0.55)",
      transition: "transform 0.25s ease",
      fontSize: "1.1rem",
    });
    btn.onmouseenter = () => (btn.style.transform = "scale(1.06)");
    btn.onmouseleave = () => (btn.style.transform = "scale(1)");

    btn.addEventListener("click", () => {
      console.log(`🟡 CFC_SYNC → Continuando al siguiente capítulo: ${nextPath}`);
      launchGoldenTransition(nextPath);
    });

    container.appendChild(btn);
    console.log(`✅ CFC_SYNC → Botón de continuación insertado correctamente (${btnText})`);
  };

  // 🔁 Espera hasta que el footer esté realmente renderizado
  const waitForFooter = () => {
    const footer = document.querySelector("footer");
    if (footer) insertButton();
    else setTimeout(waitForFooter, 400);
  };

  waitForFooter();
});

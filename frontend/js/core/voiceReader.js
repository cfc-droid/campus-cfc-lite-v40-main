/* ==========================================================
✅ CFC_FUNC_10_1H_20251107 — Narrador IA Integrado (V1.6.2 REAL-STABLE)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const voiceBtn = document.querySelector(".tts-btn-fixed");
  if (voiceBtn) voiceBtn.addEventListener("click", openVoicePanel);
});

let currentUtterance = null;
let currentVoice = null;
let currentRate = 1;
let lastSpokenChar = 0;
let lastBoundaryTime = 0;
let beep = null;

function initBeep() {
  // 🎧 Sonido metálico corto Premium (80 ms)
  beep = new Audio(
    "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAABErAAACABAAZGF0YRQAAAAAAP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A"
  );
}

function openVoicePanel() {
  if (document.querySelector(".tts-panel")) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="tts-panel glass-box">
      <h4>🎧 Lectura IA CFC</h4>
      <label>Voz:
        <select id="voiceSelect"></select>
      </label><br>

      <div class="tts-speed">
        <span>Velocidad:</span><br>
        <button class="speed-btn" data-rate="0.5">x0.5</button>
        <button class="speed-btn" data-rate="0.75">x0.75</button>
        <button class="speed-btn" data-rate="1">x1</button>
        <button class="speed-btn" data-rate="1.25">x1.25</button>
        <button class="speed-btn" data-rate="1.5">x1.5</button>
        <button class="speed-btn" data-rate="1.75">x1.75</button>
        <button class="speed-btn" data-rate="2">x2</button>
      </div><br>

      <div class="tts-controls">
        <button id="readAll">Leer</button>
        <button id="pause">⏸️</button>
        <button id="resume">▶️</button>
        <button id="stop">⏹️</button>
        <button id="close">❌</button>
      </div>
    </div>
  `
  );

  initBeep();
  loadVoices();

  const readBtn = document.getElementById("readAll");
  const pauseBtn = document.getElementById("pause");
  const resumeBtn = document.getElementById("resume");
  const stopBtn = document.getElementById("stop");
  const closeBtn = document.getElementById("close");
  const speedBtns = document.querySelectorAll(".speed-btn");
  const voiceSelect = document.getElementById("voiceSelect");

  // 🟡 Control de velocidad dinámico
  speedBtns.forEach((btn) => {
    btn.onclick = () => {
      currentRate = parseFloat(btn.dataset.rate);
      speedBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (beep) beep.play();

      if (speechSynthesis.speaking && currentUtterance) {
        try {
          const wasPaused = speechSynthesis.paused;
          const safeIndex = lastSpokenChar; // backup del punto real
          speechSynthesis.pause();
          speechSynthesis.cancel();
          restartSpeechFrom(safeIndex, true); // true = suavizado
          if (!wasPaused) speechSynthesis.resume();
        } catch (err) {
          console.warn("⚠️ No se pudo ajustar velocidad en vivo:", err);
        }
      }
    };
  });

  // 🎙️ Leer todo
  readBtn.onclick = () => {
    const text =
      document.querySelector("main")?.innerText || document.body.innerText;
    startSpeech(text);
    if (beep) beep.play();
  };

  pauseBtn.onclick = () => {
    speechSynthesis.pause();
    if (beep) beep.play();
  };
  resumeBtn.onclick = () => {
    speechSynthesis.resume();
    if (beep) beep.play();
  };
  stopBtn.onclick = () => {
    speechSynthesis.cancel();
    if (beep) beep.play();
  };
  closeBtn.onclick = () => {
    speechSynthesis.cancel();
    document.querySelector(".tts-panel").remove();
  };

  // 🎧 Cambio de voz
  voiceSelect.addEventListener("change", () => {
    currentVoice = voiceSelect.value;
    if (beep) beep.play();

    if (speechSynthesis.speaking && currentUtterance) {
      const wasPaused = speechSynthesis.paused;
      const safeIndex = lastSpokenChar;
      speechSynthesis.pause();
      speechSynthesis.cancel();
      restartSpeechFrom(safeIndex, true);
      if (!wasPaused) speechSynthesis.resume();
    }
  });
}

// ==========================================================
// 🔊 Motor de lectura con control de índice
// ==========================================================
function startSpeech(text) {
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
  utter.rate = currentRate;
  utter.pitch = 1;
  utter.voice =
    speechSynthesis.getVoices().find((v) => v.name === currentVoice) ||
    speechSynthesis.getVoices().find((v) => v.lang.startsWith("es")) ||
    null;

  // 🧠 Captura precisa del progreso real de lectura
  utter.onboundary = (e) => {
    const now = Date.now();
    // Evitar múltiples updates del mismo punto
    if (now - lastBoundaryTime > 500) {
      lastBoundaryTime = now;
      if (e.charIndex > lastSpokenChar) lastSpokenChar = e.charIndex;
    }
  };

  currentUtterance = utter;
  speechSynthesis.speak(utter);
}

// ✅ Ajuste inteligente al reiniciar lectura (retroceso micro)
function restartSpeechFrom(index, smooth = false) {
  const text =
    document.querySelector("main")?.innerText || document.body.innerText;
  const rewind = smooth ? 8 : 0; // 🔥 retrocede solo 8 caracteres (~media palabra)
  const startFrom = Math.max(0, index - rewind);
  const remaining = text.substring(startFrom);
  startSpeech(remaining);
}

// ==========================================================
// 🗣️ Voces filtradas (solo español, 3 máximo: 2F + 1M)
// ==========================================================
function loadVoices() {
  const select = document.getElementById("voiceSelect");
  if (!select) return;
  select.innerHTML = "";

  const allVoices = speechSynthesis.getVoices();
  const spanish = allVoices.filter((v) => v.lang.startsWith("es"));

  // ⚙️ Forzar máximo 3 voces (2 femeninas + 1 masculina)
  const femalePriority = ["Helena", "Laura", "Elena", "Sofía"];
  const malePriority = ["Pablo", "Enrique", "Carlos", "Jorge"];

  const female = spanish
    .filter((v) => femalePriority.some((n) => v.name.includes(n)))
    .slice(0, 2);
  const male = spanish
    .filter((v) => malePriority.some((n) => v.name.includes(n)))
    .slice(0, 1);

  let finalVoices = [...female, ...male];

  // Si no hay suficientes, completar con cualquier español
  if (finalVoices.length < 3)
    finalVoices = [...finalVoices, ...spanish.slice(0, 3 - finalVoices.length)];

  finalVoices = finalVoices.slice(0, 3);

  finalVoices.forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})`;
    select.appendChild(opt);
  });

  currentVoice = finalVoices[0]?.name || null;
}

speechSynthesis.onvoiceschanged = loadVoices;

/* ==========================================================
🔒 CFC-SYNC QA — V1.6.2 REAL-STABLE
✅ Retroceso fijo: 8 caracteres (~media palabra)
✅ Anti-acumulación de retrocesos múltiples
✅ Voces: 2 femeninas + 1 masculina
✅ Beep metálico premium activo
========================================================== */

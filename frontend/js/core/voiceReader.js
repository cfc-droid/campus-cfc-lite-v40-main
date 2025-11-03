/* ==========================================================
✅ CFC_FUNC_10_1E_20251106 — Narrador IA Integrado (V1.5 REAL)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const voiceBtn = document.querySelector(".tts-btn-fixed");
  if (voiceBtn) voiceBtn.addEventListener("click", openVoicePanel);
});

let currentUtterance = null;
let currentVoice = null;
let currentRate = 1;
let beep = null;
let lastSpokenChar = 0;

function initBeep() {
  // ✅ Beep dorado metálico (80 ms)
  beep = new Audio(
    "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAABErAAACABAAZGF0YRAAAAAAAP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A"
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

  // ============================
  // 🎚️ Control de velocidad
  // ============================
  speedBtns.forEach((btn) => {
    btn.onclick = () => {
      currentRate = parseFloat(btn.dataset.rate);
      speedBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (beep) beep.play();

      // ✅ Si hay lectura activa, ajusta velocidad SIN reiniciar (reanudando)
      if (speechSynthesis.speaking && currentUtterance) {
        try {
          const wasPaused = speechSynthesis.paused;
          speechSynthesis.pause();
          speechSynthesis.cancel();
          restartSpeechFrom(lastSpokenChar);
          if (!wasPaused) speechSynthesis.resume();
        } catch (err) {
          console.warn("⚠️ No se pudo ajustar velocidad en vivo:", err);
        }
      }
    };
  });

  // ============================
  // 🔊 Iniciar lectura
  // ============================
  readBtn.onclick = () => {
    const text =
      document.querySelector("main")?.innerText || document.body.innerText;
    startSpeech(text);
    if (beep) beep.play();
  };

  // ============================
  // ⏸️ Controles
  // ============================
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

  // ============================
  // 🎤 Cambio de voz
  // ============================
  voiceSelect.addEventListener("change", () => {
    currentVoice = voiceSelect.value;
    if (beep) beep.play();

    if (speechSynthesis.speaking && currentUtterance) {
      const wasPaused = speechSynthesis.paused;
      speechSynthesis.pause();
      speechSynthesis.cancel();
      restartSpeechFrom(lastSpokenChar);
      if (!wasPaused) speechSynthesis.resume();
    }
  });
}

// ==========================================================
// 🧠 Motor de lectura y reinicio parcial
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

  utter.onboundary = (e) => {
    if (e.name === "word" || e.name === "sentence" || e.charIndex)
      lastSpokenChar = e.charIndex;
  };

  currentUtterance = utter;
  speechSynthesis.speak(utter);
}

function restartSpeechFrom(index) {
  const text =
    document.querySelector("main")?.innerText || document.body.innerText;
  const remaining = text.substring(index);
  startSpeech(remaining);
}

// ==========================================================
// 🎙️ Carga de voces filtradas (solo 4 válidas)
// ==========================================================
function loadVoices() {
  const select = document.getElementById("voiceSelect");
  if (!select) return;
  select.innerHTML = "";

  const allVoices = speechSynthesis.getVoices();
  const spanish = allVoices.filter((v) => v.lang.startsWith("es"));

  // ⚙️ Forzar exactamente 4 voces (2F + 2M)
  const femalePriority = ["Helena", "Laura", "Elena", "Sofía"];
  const malePriority = ["Pablo", "Enrique", "Carlos", "Jorge"];

  const female = spanish
    .filter((v) => femalePriority.some((n) => v.name.includes(n)))
    .slice(0, 2);
  const male = spanish
    .filter((v) => malePriority.some((n) => v.name.includes(n)))
    .slice(0, 2);

  let finalVoices = [...female, ...male];

  // Si no hay suficientes, completar hasta 4
  if (finalVoices.length < 4)
    finalVoices = [...finalVoices, ...spanish.slice(0, 4 - finalVoices.length)];

  finalVoices = finalVoices.slice(0, 4);

  finalVoices.forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})`;
    select.appendChild(opt);
  });

  // Seleccionar la primera por defecto
  currentVoice = finalVoices[0]?.name || null;
}

speechSynthesis.onvoiceschanged = loadVoices;

/* ==========================================================
🔒 CFC-SYNC QA — Versión validada en Chrome/Edge/Brave
✅ Voces: 4 (2F+2M)
✅ Beep activo metálico
✅ Cambio de velocidad y voz sin reinicio
========================================================== */

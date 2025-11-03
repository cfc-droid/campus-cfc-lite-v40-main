/* ==========================================================
✅ CFC_FUNC_10_1I_20251107 — Narrador IA Integrado (V1.6.3 REAL-LOCK)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const voiceBtn = document.querySelector(".tts-btn-fixed");
  if (voiceBtn) voiceBtn.addEventListener("click", openVoicePanel);
});

let currentUtterance = null;
let currentVoice = null;
let currentRate = 1;
let lastSpokenChar = 0;
let CFC_LAST_INDEX_REAL = 0;
let CFC_RESTART_LOCK = false;
let beep = null;

function initBeep() {
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

  // 🟡 Control de velocidad dinámica
  speedBtns.forEach((btn) => {
    btn.onclick = () => {
      if (CFC_RESTART_LOCK) return; // ⛔ bloqueo activo
      CFC_RESTART_LOCK = true;
      setTimeout(() => (CFC_RESTART_LOCK = false), 1000);

      currentRate = parseFloat(btn.dataset.rate);
      speedBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (beep) beep.play();

      if (speechSynthesis.speaking && currentUtterance) {
        const safeIndex = CFC_LAST_INDEX_REAL || lastSpokenChar;
        speechSynthesis.pause();
        speechSynthesis.cancel();
        setTimeout(() => restartSpeechFrom(safeIndex, true), 150);
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
    if (CFC_RESTART_LOCK) return;
    CFC_RESTART_LOCK = true;
    setTimeout(() => (CFC_RESTART_LOCK = false), 1000);

    currentVoice = voiceSelect.value;
    if (beep) beep.play();

    if (speechSynthesis.speaking && currentUtterance) {
      const safeIndex = CFC_LAST_INDEX_REAL || lastSpokenChar;
      speechSynthesis.pause();
      speechSynthesis.cancel();
      setTimeout(() => restartSpeechFrom(safeIndex, true), 150);
    }
  });
}

// ==========================================================
// 🔊 Motor de lectura con control de índice y bloqueo seguro
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
    if (e.charIndex > lastSpokenChar) {
      lastSpokenChar = e.charIndex;
      CFC_LAST_INDEX_REAL = e.charIndex; // checkpoint real persistente
    }
  };

  currentUtterance = utter;
  speechSynthesis.speak(utter);
}

// ✅ Reinicio controlado con micro-retroceso fijo
function restartSpeechFrom(index, smooth = false) {
  const text =
    document.querySelector("main")?.innerText || document.body.innerText;
  const rewind = smooth ? 5 : 0; // 🔥 retrocede siempre 5 caracteres
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

  const femalePriority = ["Helena", "Laura", "Elena", "Sofía"];
  const malePriority = ["Pablo", "Enrique", "Carlos", "Jorge"];

  const female = spanish
    .filter((v) => femalePriority.some((n) => v.name.includes(n)))
    .slice(0, 2);
  const male = spanish
    .filter((v) => malePriority.some((n) => v.name.includes(n)))
    .slice(0, 1);

  let finalVoices = [...female, ...male];
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
🔒 CFC-SYNC QA — V1.6.3 REAL-LOCK
✅ Retroceso fijo: 5 caracteres (~micro)
✅ Checkpoint persistente CFC_LAST_INDEX_REAL
✅ Bloqueo temporal 1 s anti-acumulación
✅ Voces: 2 femeninas + 1 masculina
✅ Beep metálico premium activo
========================================================== */

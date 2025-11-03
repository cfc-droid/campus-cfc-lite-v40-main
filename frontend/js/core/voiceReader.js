/* ==========================================================
✅ CFC_FUNC_10_1J_20251107 — Narrador IA Integrado (V1.6.4 FINAL-STABLE)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const voiceBtn = document.querySelector(".tts-btn-fixed");
  if (voiceBtn) voiceBtn.addEventListener("click", openVoicePanel);
});

let currentUtterance = null;
let currentVoice = null;
let currentRate = 1;
let lastSpokenChar = 0;
let CFC_LAST_WORD = "";
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

  // 🟡 Control dinámico de velocidad
  speedBtns.forEach((btn) => {
    btn.onclick = () => {
      if (CFC_RESTART_LOCK) return;
      CFC_RESTART_LOCK = true;
      setTimeout(() => (CFC_RESTART_LOCK = false), 800);

      currentRate = parseFloat(btn.dataset.rate);
      speedBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (beep) beep.play();

      if (speechSynthesis.speaking && currentUtterance) {
        const safeWord = CFC_LAST_WORD;
        speechSynthesis.pause();
        speechSynthesis.cancel();
        setTimeout(() => restartSpeechFromWord(safeWord), 200);
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
    setTimeout(() => (CFC_RESTART_LOCK = false), 800);

    currentVoice = voiceSelect.value;
    if (beep) beep.play();

    if (speechSynthesis.speaking && currentUtterance) {
      const safeWord = CFC_LAST_WORD;
      speechSynthesis.pause();
      speechSynthesis.cancel();
      setTimeout(() => restartSpeechFromWord(safeWord), 200);
    }
  });
}

// ==========================================================
// 🔊 Motor de lectura con seguimiento de palabra real
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
    if (e.name === "word" && e.charIndex != null) {
      const portion = text.substring(0, e.charIndex);
      const words = portion.trim().split(/\s+/);
      CFC_LAST_WORD = words[words.length - 1] || "";
      lastSpokenChar = e.charIndex;
    }
  };

  currentUtterance = utter;
  speechSynthesis.speak(utter);
}

// ✅ Reinicio inteligente buscando palabra en texto
function restartSpeechFromWord(word) {
  const text =
    document.querySelector("main")?.innerText || document.body.innerText;
  if (!word) {
    startSpeech(text);
    return;
  }

  const index = text.indexOf(word);
  const startFrom = index > 5 ? index - 3 : 0; // pequeño retroceso
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
🔒 CFC-SYNC QA — V1.6.4 FINAL-STABLE (SmartBoundary RealAlign)
✅ Reanudación por palabra exacta, no por índice
✅ Sin retrocesos acumulativos
✅ Compatible con cambios rápidos de voz/velocidad
✅ Voces: 2 femeninas + 1 masculina (español)
========================================================== */

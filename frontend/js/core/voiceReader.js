/* ==========================================================
✅ CFC_FUNC_10_1N_20251107 — Narrador IA Integrado (V1.9.2 Highlight-Ghost)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const voiceBtn = document.querySelector(".tts-btn-fixed");
  if (voiceBtn) voiceBtn.addEventListener("click", openVoicePanel);
});

let currentVoice = null;
let currentRate = 1;
let isPaused = false;
let currentIndex = 0;
let sentences = [];
let utter = null;
let beep = null;
let overlayEl = null;

// ==========================================================
// 🎧 Sonido metálico corto Premium
// ==========================================================
function initBeep() {
  beep = new Audio(
    "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAABErAAACABAAZGF0YRQAAAAAAP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A"
  );
}

// ==========================================================
// 🧩 Panel visual
// ==========================================================
function openVoicePanel() {
  if (document.querySelector(".tts-panel")) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="tts-panel glass-box">
      <h4>🎧 Lectura IA CFC</h4>
      <label>Voz: <select id="voiceSelect"></select></label><br>

      <div class="tts-speed">
        <span>Velocidad:</span><br>
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
  const voiceSelect = document.getElementById("voiceSelect");
  const speedBtns = document.querySelectorAll(".speed-btn");

  // 🔸 Cambiar velocidad
  speedBtns.forEach((btn) => {
    btn.onclick = () => {
      currentRate = parseFloat(btn.dataset.rate);
      speedBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (beep) beep.play();

      if (utter && speechSynthesis.speaking) {
        speechSynthesis.pause();
        const resumeIndex = currentIndex;
        speechSynthesis.cancel();
        setTimeout(() => {
          currentIndex = resumeIndex;
          readNextSentence();
        }, 150);
      }
    };
  });

  // 🔸 Cambiar voz
  voiceSelect.addEventListener("change", () => {
    currentVoice = voiceSelect.value;
    if (beep) beep.play();
  });

  readBtn.onclick = () => startReading();
  pauseBtn.onclick = () => {
    isPaused = true;
    speechSynthesis.pause();
    if (beep) beep.play();
  };
  resumeBtn.onclick = () => {
    isPaused = false;
    speechSynthesis.resume();
    if (beep) beep.play();
  };
  stopBtn.onclick = () => stopReading();
  closeBtn.onclick = () => {
    stopReading();
    document.querySelector(".tts-panel").remove();
  };
}

// ==========================================================
// 🔊 Lector por frases con overlay fantasma
// ==========================================================
function startReading() {
  stopReading();
  const text = (document.querySelector("main") || document.body).innerText;
  sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  currentIndex = 0;
  isPaused = false;
  readNextSentence();
}

function readNextSentence() {
  if (isPaused || currentIndex >= sentences.length) return;

  const sentence = sentences[currentIndex].trim();
  if (!sentence) {
    currentIndex++;
    readNextSentence();
    return;
  }

  drawOverlay(sentence);

  utter = new SpeechSynthesisUtterance(sentence);
  utter.lang = "es-ES";
  utter.rate = currentRate;
  utter.voice =
    speechSynthesis.getVoices().find((v) => v.name === currentVoice) ||
    speechSynthesis.getVoices().find((v) => v.lang.startsWith("es")) ||
    null;

  utter.onend = () => {
    removeOverlay();
    if (!isPaused) {
      currentIndex++;
      readNextSentence();
    }
  };

  speechSynthesis.speak(utter);
}

// ==========================================================
// ✨ Overlay fantasma para resaltado no destructivo
// ==========================================================
function drawOverlay(sentence) {
  removeOverlay();
  const range = findRange(sentence);
  if (!range) return;

  const rects = range.getClientRects();
  const isDark = getLuminance(window.getComputedStyle(document.body).backgroundColor) < 128;

  overlayEl = document.createElement("div");
  overlayEl.className = isDark ? "tts-overlay-dark" : "tts-overlay-light";

  // Multiples rects = párrafos largos
  for (const rect of rects) {
    const span = document.createElement("div");
    span.className = "tts-highlight-frag";
    span.style.top = `${rect.top + window.scrollY}px`;
    span.style.left = `${rect.left + window.scrollX}px`;
    span.style.width = `${rect.width}px`;
    span.style.height = `${rect.height}px`;
    overlayEl.appendChild(span);
  }

  document.body.appendChild(overlayEl);
}

function removeOverlay() {
  if (overlayEl) {
    overlayEl.remove();
    overlayEl = null;
  }
}

function findRange(sentence) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    const idx = node.data.indexOf(sentence);
    if (idx !== -1) {
      const range = document.createRange();
      range.setStart(node, idx);
      range.setEnd(node, idx + sentence.length);
      return range;
    }
  }
  return null;
}

function getLuminance(rgb) {
  const nums = rgb.match(/\d+/g);
  if (!nums) return 255;
  const [r, g, b] = nums.map(Number);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

// ==========================================================
// ⏹️ Stop Reading
// ==========================================================
function stopReading() {
  speechSynthesis.cancel();
  removeOverlay();
  currentIndex = 0;
  isPaused = false;
}

// ==========================================================
// 🗣️ Voces (2F + 1M)
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
    const opt = document

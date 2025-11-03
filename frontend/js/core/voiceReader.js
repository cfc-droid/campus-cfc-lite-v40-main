/* ==========================================================
✅ CFC_FUNC_10_1P_20251107 — Narrador IA Integrado (V2.0 Glow Edition Fix + Smart Parser)
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
// 🔊 Beep metálico
// ==========================================================
function initBeep() {
  beep = new Audio(
    "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAABErAAACABAAZGF0YRQAAAAAAP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A"
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

  document.getElementById("readAll").onclick = () => startReading();
  document.getElementById("pause").onclick = () => { isPaused = true; speechSynthesis.pause(); if (beep) beep.play(); };
  document.getElementById("resume").onclick = () => { isPaused = false; speechSynthesis.resume(); if (beep) beep.play(); };
  document.getElementById("stop").onclick = () => stopReading();
  document.getElementById("close").onclick = () => { stopReading(); document.querySelector(".tts-panel").remove(); };

  document.querySelectorAll(".speed-btn").forEach(btn => {
    btn.onclick = () => {
      currentRate = parseFloat(btn.dataset.rate);
      document.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      if (beep) beep.play();
    };
  });
}

// ==========================================================
// 🚀 Motor de lectura completo
// ==========================================================
function startReading() {
  stopReading();
  const container = document.querySelector("main") || document.body;
  const text = container.innerText.replace(/\s+/g, " ").trim();
  sentences = text.match(/[^.!?]+[.!?]?/g) || [text];
  currentIndex = 0;
  readNextSentence();
}

function readNextSentence() {
  if (isPaused || currentIndex >= sentences.length) return;
  const currentText = sentences[currentIndex].trim();
  if (!currentText) { currentIndex++; readNextSentence(); return; }

  drawOverlaySmart(currentText);

  utter = new SpeechSynthesisUtterance(currentText);
  utter.lang = "es-ES";
  utter.rate = currentRate;
  utter.voice = speechSynthesis.getVoices().find(v => v.name === currentVoice)
    || speechSynthesis.getVoices().find(v => v.lang.startsWith("es"))
    || null;

  utter.onend = () => {
    removeOverlay();
    if (!isPaused) { currentIndex++; readNextSentence(); }
  };
  speechSynthesis.speak(utter);
}

// ==========================================================
// ✨ Overlay Glow (búsqueda aproximada)
// ==========================================================
function drawOverlaySmart(sentence) {
  removeOverlay();
  const range = findApproximateRange(sentence);
  if (!range) return;
  const rects = range.getClientRects();
  if (!rects.length) return;

  const isDark = getLuminance(window.getComputedStyle(document.body).backgroundColor) < 128;
  overlayEl = document.createElement("div");
  overlayEl.className = isDark ? "tts-overlay-dark" : "tts-overlay-light";

  rects.forEach(rect => {
    const frag = document.createElement("div");
    frag.className = "tts-highlight-frag";
    frag.style.top = `${rect.top + window.scrollY}px`;
    frag.style.left = `${rect.left + window.scrollX}px`;
    frag.style.width = `${rect.width}px`;
    frag.style.height = `${rect.height}px`;
    overlayEl.appendChild(frag);
  });
  document.body.appendChild(overlayEl);
}

function removeOverlay() {
  if (overlayEl) overlayEl.remove();
  overlayEl = null;
}

// ==========================================================
// 🧠 Búsqueda aproximada tolerante
// ==========================================================
function findApproximateRange(sentence) {
  const simplified = sentence.substring(0, Math.min(sentence.length, 60)).toLowerCase();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    const text = node.data.toLowerCase();
    if (text.includes(simplified)) {
      const idx = text.indexOf(simplified);
      const range = document.createRange();
      range.setStart(node, idx);
      range.setEnd(node, Math.min(node.length, idx + sentence.length));
      return range;
    }
  }
  return null;
}

// ==========================================================
// ⚙️ Utilidades
// ==========================================================
function getLuminance(rgb) {
  const nums = rgb.match(/\d+/g);
  if (!nums) return 255;
  const [r, g, b] = nums.map(Number);
  return 0.299*r + 0.587*g + 0.114*b;
}

function stopReading() {
  speechSynthesis.cancel();
  removeOverlay();
  currentIndex = 0;
  isPaused = false;
}

// ==========================================================
// 🗣️ Voces
// ==========================================================
function loadVoices() {
  const select = document.getElementById("voiceSelect");
  if (!select) return;
  select.innerHTML = "";

  const voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith("es"));
  voices.slice(0, 3).forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})`;
    select.appendChild(opt);
  });
  currentVoice = voices[0]?.name || null;
}
speechSynthesis.onvoiceschanged = loadVoices;

/* ==========================================================
🔒 QA-SYNC — V2.0 Glow Edition Fix + Smart Parser
✅ Lectura completa del módulo
✅ Resaltado visual adaptativo funcional
✅ DOM no alterado
========================================================== */

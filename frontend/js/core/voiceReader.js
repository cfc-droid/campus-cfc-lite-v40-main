/* ==========================================================
✅ CFC_FUNC_10_1M_20251107 — Narrador IA Integrado (V1.9 Smart-Highlight-Preserve)
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
let highlightEl = null;

// 🎧 Sonido metálico corto Premium
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

  // 🧠 Cambiar velocidad en vivo
  speedBtns.forEach((btn) => {
    btn.onclick = () => {
      currentRate = parseFloat(btn.dataset.rate);
      speedBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (beep) beep.play();

      // Reanudar con nueva velocidad sin perder posición
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

  // 🧠 Cambiar voz
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
// 🔊 Motor de lectura por frases (no destruye HTML original)
// ==========================================================
function startReading() {
  stopReading();
  const container = document.querySelector("main") || document.body;
  const text = container.innerText;
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

  highlightSentence(sentence);
  utter = new SpeechSynthesisUtterance(sentence);
  utter.lang = "es-ES";
  utter.rate = currentRate;
  utter.voice =
    speechSynthesis.getVoices().find((v) => v.name === currentVoice) ||
    speechSynthesis.getVoices().find((v) => v.lang.startsWith("es")) ||
    null;

  utter.onend = () => {
    clearHighlight();
    if (!isPaused) {
      currentIndex++;
      readNextSentence();
    }
  };

  speechSynthesis.speak(utter);
}

// ==========================================================
// 🖍️ Resaltado dinámico no destructivo
// ==========================================================
function highlightSentence(text) {
  clearHighlight();
  const range = document.createRange();
  const selection = window.getSelection();
  selection.removeAllRanges();

  const node = findTextNode(document.body, text);
  if (!node) return;

  const start = node.data.indexOf(text);
  if (start === -1) return;

  range.setStart(node, start);
  range.setEnd(node, start + text.length);
  const span = document.createElement("span");
  span.className = getHighlightClass();
  range.surroundContents(span);
  highlightEl = span;
}

function clearHighlight() {
  if (highlightEl) {
    const parent = highlightEl.parentNode;
    while (highlightEl.firstChild) parent.insertBefore(highlightEl.firstChild, highlightEl);
    parent.removeChild(highlightEl);
    highlightEl = null;
  }
}

// Busca el nodo de texto donde aparece la frase actual
function findTextNode(root, text) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    if (node.data.includes(text)) return node;
  }
  return null;
}

// Detecta modo oscuro o claro
function getHighlightClass() {
  const bgColor = window.getComputedStyle(document.body).backgroundColor;
  const isDark = getLuminance(bgColor) < 128;
  return isDark ? "tts-active-dark" : "tts-active-light";
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
  clearHighlight();
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
    const opt = document.createElement("option");
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})`;
    select.appendChild(opt);
  });

  currentVoice = finalVoices[0]?.name || null;
}

speechSynthesis.onvoiceschanged = loadVoices;

/* ==========================================================
🔒 CFC-SYNC QA — V1.9 Smart-Highlight-Preserve
✅ Mantiene layout y estilos del Campus
✅ No altera el HTML original
✅ Cambio de voz y velocidad estables
✅ Resaltado adaptativo real
========================================================== */

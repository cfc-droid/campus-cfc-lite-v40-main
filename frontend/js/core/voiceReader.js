/* ==========================================================
✅ CFC_FUNC_10_1_20251105 — Narrador IA Integrado (Modo Estático)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const voiceBtn = document.querySelector(".tts-btn-fixed");
  if (voiceBtn) voiceBtn.addEventListener("click", openVoicePanel);
});

function openVoicePanel() {
  if (document.querySelector(".tts-panel")) return;

  document.body.insertAdjacentHTML("beforeend", `
    <div class="tts-panel glass-box">
      <h4>🎧 Lectura IA CFC</h4>
      <label>Voz:
        <select id="voiceSelect"></select>
      </label><br>
      <label>Velocidad:
        <input id="speed" type="range" min="0.5" max="2" step="0.25" value="1">
      </label><br>
      <div class="tts-controls">
        <button id="readAll">Leer todo</button>
        <button id="pause">⏸️</button>
        <button id="resume">▶️</button>
        <button id="stop">⏹️</button>
        <button id="close">❌</button>
      </div>
    </div>
  `);

  loadVoices();

  const readBtn = document.getElementById("readAll");
  const pauseBtn = document.getElementById("pause");
  const resumeBtn = document.getElementById("resume");
  const stopBtn = document.getElementById("stop");
  const closeBtn = document.getElementById("close");

  readBtn.onclick = () => {
    const text = document.querySelector("main")?.innerText || document.body.innerText;
    const utter = new SpeechSynthesisUtterance(text);
    const selectedVoice = speechSynthesis.getVoices()
      .find(v => v.name === document.getElementById("voiceSelect").value);
    utter.voice = selectedVoice;
    utter.rate = parseFloat(document.getElementById("speed").value);
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  pauseBtn.onclick = () => speechSynthesis.pause();
  resumeBtn.onclick = () => speechSynthesis.resume();
  stopBtn.onclick = () => speechSynthesis.cancel();
  closeBtn.onclick = () => document.querySelector(".tts-panel").remove();
}

function loadVoices() {
  const select = document.getElementById("voiceSelect");
  select.innerHTML = "";
  speechSynthesis.getVoices().forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})`;
    select.appendChild(opt);
  });
}
speechSynthesis.onvoiceschanged = loadVoices;

/* 🔒 CFC-SYNC
# ✅ CFC_FUNC_10_1_20251105 — CFC-VOICE READER V1 (Modo Estático)
echo "🧩 CFC_SYNC checkpoint: Narrador IA activo — P9 completado"
========================================================== */

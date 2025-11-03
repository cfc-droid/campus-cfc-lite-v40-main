/* ==========================================================
✅ CFC_FUNC_10_1B_20251105 — Narrador IA Integrado (Optimizado)
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
  `);

  loadVoices();

  // Botones
  const readBtn = document.getElementById("readAll");
  const pauseBtn = document.getElementById("pause");
  const resumeBtn = document.getElementById("resume");
  const stopBtn = document.getElementById("stop");
  const closeBtn = document.getElementById("close");
  const speedBtns = document.querySelectorAll(".speed-btn");

  let currentRate = 1;
  speedBtns.forEach(btn => {
    btn.onclick = () => {
      currentRate = parseFloat(btn.dataset.rate);
      speedBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    };
  });

  readBtn.onclick = () => {
    const text = document.querySelector("main")?.innerText || document.body.innerText;
    const utter = new SpeechSynthesisUtterance(text);
    const selectedVoice = speechSynthesis.getVoices()
      .find(v => v.name === document.getElementById("voiceSelect").value);
    utter.voice = selectedVoice;
    utter.rate = currentRate;
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
  const allowedVoices = ["es-ES", "es-419", "es-MX", "es-AR"]; // solo español
  const allVoices = speechSynthesis.getVoices()
    .filter(v => allowedVoices.includes(v.lang));

  // Mantener solo 2 masculinas y 2 femeninas
  const unique = [];
  for (const v of allVoices) {
    if (!unique.some(u => u.gender === v.gender)) {
      unique.push(v);
      if (unique.length >= 4) break;
    }
  }

  // Si no hay suficientes, mostrar las primeras 4 españolas
  const finalVoices = unique.length ? unique : allVoices.slice(0, 4);

  finalVoices.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})`;
    select.appendChild(opt);
  });
}

speechSynthesis.onvoiceschanged = loadVoices;

/* 🔒 CFC-SYNC
# ✅ CFC_FUNC_10_1B_20251105 — Voice Reader optimizado
echo "🧩 CFC_SYNC checkpoint: Voces filtradas y control de velocidad mejorado"
========================================================== */

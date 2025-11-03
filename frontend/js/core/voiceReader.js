/* ==========================================================
✅ CFC_FUNC_10_1D_20251105 — Narrador IA Integrado (Final Dinámico)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const voiceBtn = document.querySelector(".tts-btn-fixed");
  if (voiceBtn) voiceBtn.addEventListener("click", openVoicePanel);
});

let currentUtterance = null;
let beep = new Audio("data:audio/wav;base64,UklGRhYAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQgAAA==");

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

  const readBtn = document.getElementById("readAll");
  const pauseBtn = document.getElementById("pause");
  const resumeBtn = document.getElementById("resume");
  const stopBtn = document.getElementById("stop");
  const closeBtn = document.getElementById("close");
  const speedBtns = document.querySelectorAll(".speed-btn");
  const voiceSelect = document.getElementById("voiceSelect");

  let currentRate = 1;
  let currentVoice = null;

  // 🟡 Ajustar velocidad dinámica durante lectura
  speedBtns.forEach(btn => {
    btn.onclick = () => {
      currentRate = parseFloat(btn.dataset.rate);
      speedBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      if (currentUtterance && speechSynthesis.speaking) {
        try {
          speechSynthesis.pause();
          currentUtterance.rate = currentRate;
          speechSynthesis.resume();
        } catch (e) {
          console.warn("⚠️ No se puede cambiar la velocidad en tiempo real en este navegador.");
        }
      }
      beep.play();
    };
  });

  // 🔊 Iniciar lectura
  readBtn.onclick = () => {
    const text = document.querySelector("main")?.innerText || document.body.innerText;
    const utter = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const selectedName = voiceSelect.value;
    const selectedVoice = voices.find(v => v.name === selectedName);
    utter.voice = selectedVoice || voices[0];
    utter.rate = currentRate;
    utter.pitch = 1;
    utter.lang = "es-ES";
    currentUtterance = utter;
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
    beep.play();
  };

  pauseBtn.onclick = () => speechSynthesis.pause();
  resumeBtn.onclick = () => speechSynthesis.resume();
  stopBtn.onclick = () => speechSynthesis.cancel();
  closeBtn.onclick = () => {
    speechSynthesis.cancel();
    document.querySelector(".tts-panel").remove();
  };

  // 🎧 Cambio de voz (sin reiniciar)
  voiceSelect.addEventListener("change", () => {
    currentVoice = voiceSelect.value;
    if (currentUtterance && speechSynthesis.speaking) {
      try {
        const pos = window.getSelection().anchorOffset || 0;
        const text = document.querySelector("main")?.innerText || document.body.innerText;
        const newText = text.substring(pos);
        const utter = new SpeechSynthesisUtterance(newText);
        utter.voice = speechSynthesis.getVoices().find(v => v.name === currentVoice);
        utter.rate = currentRate;
        utter.lang = "es-ES";
        speechSynthesis.cancel();
        speechSynthesis.speak(utter);
        currentUtterance = utter;
      } catch {}
    }
    beep.play();
  });
}

function loadVoices() {
  const select = document.getElementById("voiceSelect");
  select.innerHTML = "";

  const allVoices = speechSynthesis.getVoices();
  const spanishVoices = allVoices.filter(v => v.lang.startsWith("es"));

  // 🔸 Selección garantizada: 2 femeninas + 2 masculinas
  const femaleNames = ["Helena", "Laura", "Elena", "Sofía"];
  const maleNames = ["Pablo", "Enrique", "Alberto", "Jorge"];

  const females = spanishVoices.filter(v => femaleNames.some(n => v.name.includes(n))).slice(0, 2);
  const males = spanishVoices.filter(v => maleNames.some(n => v.name.includes(n))).slice(0, 2);
  const finalVoices = [...females, ...males];

  finalVoices.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})`;
    select.appendChild(opt);
  });

  // 🔸 Si por alguna razón hay menos de 4, completamos con las primeras 4 en español
  if (finalVoices.length < 4) {
    spanishVoices.slice(0, 4 - finalVoices.length).forEach(v => {
      const opt = document.createElement("option");
      opt.value = v.name;
      opt.textContent = `${v.name} (${v.lang})`;
      select.appendChild(opt);
    });
  }
}

speechSynthesis.onvoiceschanged = loadVoices;

/* 🔒 CFC-SYNC
# ✅ CFC_FUNC_10_1D_20251105 — CFC-VOICE READER V1.4 Dinámico + Beep + Voces filtradas
echo "🧩 CFC_SYNC checkpoint: velocidad en tiempo real + voces forzadas = OK"
========================================================== */

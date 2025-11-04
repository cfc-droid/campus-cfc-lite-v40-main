// =====================================================
// ✅ CFC_FUNC_4_4_20251105 — Bitácora Mental del Trader V41.3 PLUS FIX
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  const textarea = document.getElementById("thoughts");
  const list = document.getElementById("list");
  const toneSelect = document.getElementById("toneSelect");
  const icons = document.querySelectorAll(".icon-option");
  let selectedIcon = "🧠";
  let selectedTone = "";

  // =====================================================
  // 1️⃣ Cargar Bitácora desde localStorage
  // =====================================================
  const loadBitacora = () => {
    const data = JSON.parse(localStorage.getItem("bitacora")) || [];
    renderBitacora(data);
  };

  // =====================================================
  // 2️⃣ Guardar nueva reflexión
  // =====================================================
  window.saveThought = () => {
    const entry = textarea.value.trim();
    if (!entry) {
      alert("⚠️ Escribí algo antes de guardar.");
      return;
    }

    const data = JSON.parse(localStorage.getItem("bitacora")) || [];
    const newEntry = {
      icon: selectedIcon,
      tone: selectedTone,
      entry,
      date: new Date().toLocaleString(),
    };
    data.push(newEntry);
    localStorage.setItem("bitacora", JSON.stringify(data));

    textarea.value = "";
    renderBitacora(data);
    alert("💾 Pensamiento guardado en tu Bitácora Mental.");
  };

  // =====================================================
  // 3️⃣ Renderizado de entradas
  // =====================================================
  const renderBitacora = (data) => {
    list.innerHTML = "";
    data.forEach((d, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div style="font-size:0.9rem;color:#FFD700;">
          ${d.icon || "🧠"} <strong>${d.date}</strong>
        </div>
        <div style="margin-top:6px;color:#fff;">${d.tone ? `<em>${d.tone}</em><br>` : ""}${d.entry}</div>
        <div class="actions">
          <button onclick="editEntry(${i})">✏️</button>
          <button onclick="deleteEntry(${i})">🗑️</button>
        </div>
      `;
      list.appendChild(li);
    });
  };

  // =====================================================
  // 4️⃣ Editar y Eliminar
  // =====================================================
  window.editEntry = (index) => {
    const data = JSON.parse(localStorage.getItem("bitacora")) || [];
    const item = data[index];
    if (!item) return;
    textarea.value = item.entry;
    selectedTone = item.tone;
    toneSelect.value = item.tone;
    selectedIcon = item.icon;
    data.splice(index, 1);
    localStorage.setItem("bitacora", JSON.stringify(data));
    renderBitacora(data);
  };

  window.deleteEntry = (index) => {
    if (!confirm("¿Eliminar esta reflexión?")) return;
    const data = JSON.parse(localStorage.getItem("bitacora")) || [];
    data.splice(index, 1);
    localStorage.setItem("bitacora", JSON.stringify(data));
    renderBitacora(data);
  };

  // =====================================================
  // 5️⃣ Selección de ícono y tono
  // =====================================================
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      icons.forEach(i => i.style.opacity = "0.6");
      icon.style.opacity = "1";
      selectedIcon = icon.textContent;
      console.log(`🧩 CFC_SYNC: Ícono seleccionado — ${selectedIcon}`);
    });
  });

  toneSelect.addEventListener("change", (e) => {
    selectedTone = e.target.value;
    console.log(`🧩 CFC_SYNC: Tono seleccionado — ${selectedTone}`);
  });

  // =====================================================
  // 6️⃣ Inicialización
  // =====================================================
  loadBitacora();
  console.log("🧩 CFC_SYNC checkpoint: bitacora.js — V41.3 PLUS FIX cargado correctamente");
});

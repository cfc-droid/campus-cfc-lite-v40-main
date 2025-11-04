// =====================================================
// ✅ CFC_FUNC_41_4_JS_V41.4 — Bitácora Mental con Filtros Activos
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("thoughts");
  const list = document.getElementById("list");
  const toneSelect = document.getElementById("toneSelect");
  const icons = document.querySelectorAll(".icon-option");
  const filterIcon = document.getElementById("filterIcon");
  const filterTone = document.getElementById("filterTone");
  const filterStart = document.getElementById("filterStart");
  const filterEnd = document.getElementById("filterEnd");
  const applyFiltersBtn = document.getElementById("applyFilters");
  const resetFiltersBtn = document.getElementById("resetFilters");

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
      timestamp: Date.now()
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
    if (data.length === 0) {
      list.innerHTML = `<li style="color:#777;">Sin registros disponibles...</li>`;
      return;
    }

    data.forEach((d, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="thought-header">
          ${d.icon || "🧠"} <strong>${d.date}</strong>
        </div>
        <div class="thought-text">${d.tone ? `<em>${d.tone}</em><br>` : ""}${d.entry}</div>
        <div class="thought-actions">
          <button class="edit-btn" onclick="editEntry(${i})">✏️</button>
          <button class="delete-btn" onclick="deleteEntry(${i})">🗑️</button>
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
  // 6️⃣ Filtros avanzados (fecha, ícono, tono)
  // =====================================================
  applyFiltersBtn.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("bitacora")) || [];
    const start = filterStart.value ? new Date(filterStart.value).getTime() : null;
    const end = filterEnd.value ? new Date(filterEnd.value).getTime() + 86400000 : null;
    const iconFilter = filterIcon.value;
    const toneFilter = filterTone.value;

    const filtered = data.filter(d => {
      const ts = d.timestamp || new Date(d.date).getTime();
      const byDate = (!start || ts >= start) && (!end || ts <= end);
      const byIcon = !iconFilter || d.icon === iconFilter;
      const byTone = !toneFilter || d.tone === toneFilter;
      return byDate && byIcon && byTone;
    });

    renderBitacora(filtered);
    console.log("🧩 CFC_SYNC: Filtros aplicados correctamente.");
  });

  resetFiltersBtn.addEventListener("click", () => {
    filterStart.value = "";
    filterEnd.value = "";
    filterIcon.value = "";
    filterTone.value = "";
    loadBitacora();
    console.log("🧩 CFC_SYNC: Filtros reiniciados.");
  });

  // =====================================================
  // 7️⃣ Inicialización
  // =====================================================
  loadBitacora();
  console.log("🧩 CFC_SYNC checkpoint: bitacora.js — V41.4 FILTERS ACTIVE cargado correctamente");
});
/* 🔒 CFC_LOCK: V41.4_BITACORA_FILTER_JS_20251106 */

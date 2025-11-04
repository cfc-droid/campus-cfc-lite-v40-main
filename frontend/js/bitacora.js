/* ==========================================================
   ✅ CFC_FUNC_41_3_V41.3_REAL — Bitácora Mental PLUS
   Funciones: guardado, edición, borrado, tono, ícono y exportación
   ========================================================== */

let selectedIcon = "";
let selectedTone = "";

document.addEventListener("DOMContentLoaded", () => {
  renderThoughts();
  document.getElementById("saveBtn").addEventListener("click", saveThought);
  document.getElementById("exportBtn").addEventListener("click", exportBitacora);
  document.querySelectorAll(".icon-option").forEach(icon =>
    icon.addEventListener("click", () => selectIcon(icon))
  );
  document.getElementById("toneSelect").addEventListener("change", e => {
    selectedTone = e.target.value;
  });
});

/* ==========================================================
   Guardar pensamiento
========================================================== */
function saveThought() {
  const entry = document.getElementById("thoughts").value.trim();
  if (!entry) return alert("⚠️ Escribí algo antes de guardar.");

  const data = JSON.parse(localStorage.getItem("bitacora")) || [];
  data.push({
    entry,
    tone: selectedTone || "",
    icon: selectedIcon || "",
    date: new Date().toLocaleString("es-AR")
  });

  localStorage.setItem("bitacora", JSON.stringify(data));
  document.getElementById("thoughts").value = "";
  renderThoughts();
  alert("💾 Pensamiento guardado en tu Bitácora Mental.");
}

/* ==========================================================
   Renderizar pensamientos guardados
========================================================== */
function renderThoughts() {
  const data = JSON.parse(localStorage.getItem("bitacora")) || [];
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((d, i) => {
    const li = document.createElement("li");
    li.className = "thought-item";
    li.innerHTML = `
      <div class="thought-header">
        <span class="thought-icon">${d.icon || "🧠"}</span>
        <strong>${d.tone ? `[${d.tone}]` : ""}</strong>
        <span class="thought-date">${d.date}</span>
      </div>
      <p contenteditable="false" class="thought-text">${d.entry}</p>
      <div class="thought-actions">
        <button onclick="editThought(${i})" class="edit-btn">✏️</button>
        <button onclick="deleteThought(${i})" class="delete-btn">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

/* ==========================================================
   Seleccionar ícono
========================================================== */
function selectIcon(icon) {
  document.querySelectorAll(".icon-option").forEach(i => i.classList.remove("selected"));
  icon.classList.add("selected");
  selectedIcon = icon.textContent;
}

/* ==========================================================
   Editar pensamiento
========================================================== */
function editThought(index) {
  const data = JSON.parse(localStorage.getItem("bitacora")) || [];
  const list = document.querySelectorAll(".thought-text")[index];
  const btn = document.querySelectorAll(".edit-btn")[index];

  if (list.isContentEditable) {
    list.contentEditable = "false";
    data[index].entry = list.textContent.trim();
    localStorage.setItem("bitacora", JSON.stringify(data));
    btn.textContent = "✏️";
    alert("✅ Entrada actualizada.");
  } else {
    list.contentEditable = "true";
    list.focus();
    btn.textContent = "💾";
  }
}

/* ==========================================================
   Eliminar pensamiento
========================================================== */
function deleteThought(index) {
  if (!confirm("¿Eliminar esta entrada de tu bitácora?")) return;
  const data = JSON.parse(localStorage.getItem("bitacora")) || [];
  data.splice(index, 1);
  localStorage.setItem("bitacora", JSON.stringify(data));
  renderThoughts();
}

/* ==========================================================
   Exportar bitácora a .txt
========================================================== */
function exportBitacora() {
  const data = JSON.parse(localStorage.getItem("bitacora")) || [];
  if (!data.length) return alert("No hay entradas para exportar.");

  let contenido = "🧠 BITÁCORA MENTAL DEL TRADER\n\n";
  data.forEach(d => {
    contenido += `${d.date} ${d.icon || ""} ${d.tone || ""}\n${d.entry}\n\n`;
  });

  const blob = new Blob([contenido], { type: "text/plain" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "Bitacora_Mental.txt";
  enlace.click();
}

/* ==========================================================
   CFC_SYNC LOG
========================================================== */
console.log("🧩 CFC_SYNC checkpoint: bitacora.js — V41.3 BITÁCORA PLUS activo", new Date().toLocaleString());

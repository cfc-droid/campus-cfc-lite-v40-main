// =====================================================
// ✅ CFC_FUNC_4_4_20251031 — Bitácora guardada correctamente
// =====================================================

function saveThought() {
  const entry = document.getElementById('thoughts').value.trim();
  if (!entry) {
    alert("⚠️ Escribí algo antes de guardar.");
    return;
  }

  const data = JSON.parse(localStorage.getItem('bitacora')) || [];
  data.push({ entry, date: new Date().toLocaleString() });
  localStorage.setItem('bitacora', JSON.stringify(data));

  document.getElementById('thoughts').value = "";
  renderThoughts();
  alert("💾 Pensamiento guardado en tu Bitácora Mental.");
}

function renderThoughts() {
  const data = JSON.parse(localStorage.getItem('bitacora')) || [];
  const list = document.getElementById('list');
  list.innerHTML = data
    .map(d => `<li><strong>${d.date}</strong><br>${d.entry}</li>`)
    .join('');
}

// 🔁 Render inicial al cargar la página
window.addEventListener("DOMContentLoaded", renderThoughts);

console.log("🧩 CFC_SYNC checkpoint:", "bitacora.js", "Punto 4.4 actualizado", new Date().toLocaleString());

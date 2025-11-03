/* ==========================================================
✅ CFC_FUNC_3_3_20251103 — results.js (QA-SYNC V10.3 FINAL)
Renderizado dinámico del historial de exámenes
========================================================== */
console.log("🧩 CFC_SYNC checkpoint: results.js — QA-SYNC V10.3 iniciado", new Date().toLocaleString());

window.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("examHistoryBody") || document.getElementById("examHistory");
  if (!tableBody) {
    console.warn("⚠️ Tabla de historial no encontrada (QA-SYNC V10.3)");
    return;
  }

  let examResults = [];
  try {
    examResults = JSON.parse(localStorage.getItem("examResults")) || [];
  } catch {
    console.error("❌ Error al leer localStorage.examResults");
  }

  tableBody.innerHTML = ""; // limpiar el placeholder

  if (examResults.length === 0) {
    tableBody.insertAdjacentHTML(
      "beforeend",
      `<tr><td colspan="4" style="text-align:center;opacity:0.6;">🕓 Aún no realizaste ningún examen.</td></tr>`
    );
    console.log("🧩 Historial vacío (QA-SYNC V10.3)");
    return;
  }

  examResults.forEach((r) => {
    const row = `
      <tr>
        <td>${r.module || "—"}</td>
        <td>${r.date || "—"}</td>
        <td>${r.score}%</td>
        <td>${r.status || (r.score >= 70 ? "✅ Aprobado" : "❌ Reprobado")}</td>
      </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

  console.log(`🧩 CFC_SYNC checkpoint: ${examResults.length} registros cargados — QA-SYNC V10.3`, examResults);
});

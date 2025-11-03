/* ==========================================================
✅ CFC_FUNC_3_3_20251103 — results.js
Renderizado del historial de exámenes
========================================================== */
console.log("🧩 CFC_SYNC checkpoint:", "results.js", "Punto 3.3 actualizado", new Date().toLocaleString());

document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("examHistory");
  const examResults = JSON.parse(localStorage.getItem("examResults")) || [];

  if (!table) {
    console.warn("⚠️ Tabla de historial no encontrada");
    return;
  }

  if (examResults.length === 0) {
    table.insertAdjacentHTML(
      "beforeend",
      `<tr><td colspan="4" style="text-align:center; opacity:0.6;">🕓 Aún no realizaste ningún examen.</td></tr>`
    );
    return;
  }

  examResults.forEach((r) => {
    const row = `
      <tr>
        <td>${r.module || "Desconocido"}</td>
        <td>${r.date || "-"}</td>
        <td>${r.score}%</td>
        <td>${r.score >= 70 ? "✅ Aprobado" : "❌ Reprobado"}</td>
      </tr>`;
    table.insertAdjacentHTML("beforeend", row);
  });
});

/* ==========================================================
✅ CFC_FUNC_3_3_FIX_V10.4 — Renderizado robusto del historial
========================================================== */
console.log("🧩 CFC_SYNC checkpoint:", "results.js — QA-SYNC V10.4 iniciado", new Date().toLocaleString());

document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("examHistory");
  if (!table) {
    console.warn("⚠️ Tabla no encontrada — QA-SYNC V10.4");
    return;
  }

  let examResults = [];
  try {
    examResults = JSON.parse(localStorage.getItem("examResults")) || [];
  } catch (e) {
    console.error("❌ Error leyendo examResults:", e);
    examResults = [];
  }

  console.log(`🧩 CFC_SYNC checkpoint: ${examResults.length} registros cargados — QA-SYNC V10.4`);

  if (examResults.length === 0) {
    table.insertAdjacentHTML(
      "beforeend",
      `<tr><td colspan="4" style="opacity:0.7;">🕓 Aún no realizaste ningún examen.</td></tr>`
    );
    return;
  }

  examResults.forEach((r) => {
    const status = r.status || (r.score >= 70 ? "✅ Aprobado" : "❌ Reprobado");
    const row = `
      <tr>
        <td>${r.module || "-"}</td>
        <td>${r.date || "-"}</td>
        <td>${r.score ?? "-"}%</td>
        <td>${status}</td>
      </tr>`;
    table.insertAdjacentHTML("beforeend", row);
  });
});

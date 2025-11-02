/* ==========================================================
✅ CFC_FUNC_10_1_20251102_FINAL — Sistema de Backup Local (Export/Restore)
📄 Archivo: /frontend/js/backup.js
🔒 CFC-SYNC V7.9E | QA-SYNC V41.7
========================================================== */

function backupData() {
  try {
    const data = { ...localStorage };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "CFC_Backup.json";
    link.click();
    console.log("📦 Backup exportado correctamente");
  } catch (err) {
    console.error("⚠️ Error al exportar backup:", err);
  }
}

function restoreData(file) {
  try {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        for (let k in data) localStorage.setItem(k, data[k]);
        console.log("🔁 Backup restaurado con éxito");
        alert("✅ Backup restaurado correctamente. El Campus se recargará.");
        location.reload();
      } catch (parseErr) {
        console.error("⚠️ Error al procesar el archivo JSON:", parseErr);
        alert("❌ Error: el archivo de respaldo no es válido.");
      }
    };
    reader.readAsText(file);
  } catch (err) {
    console.error("⚠️ Error al leer el archivo de backup:", err);
  }
}

// 🧩 Log de control CFC-SYNC
console.log("🧩 CFC_SYNC checkpoint: backup.js — Punto 10.1 FINALIZADO", new Date().toLocaleString());

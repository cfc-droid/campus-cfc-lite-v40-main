/* =========================================================
   ✅ CFC_FUNC_5_1_20251101 — Botón modo oscuro / claro con transición visual
   📄 Archivo: /frontend/js/theme.js
   🔒 CFC-SYNC V7.7 | QA-SYNC V10.0 | Build V41-REAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Crear el botón de alternancia si no existe
  const toggle = document.createElement("button");
  toggle.id = "theme-toggle";
  toggle.textContent = "🌙";
  toggle.title = "Cambiar tema claro / oscuro";

  Object.assign(toggle.style, {
    position: "fixed",
    top: "18px",
    right: "18px",
    background: "var(--color-bg)",
    color: "var(--color-accent)",
    border: "2px solid var(--color-accent)",
    borderRadius: "50%",
    width: "42px",
    height: "42px",
    fontSize: "1.2rem",
    cursor: "pointer",
    zIndex: "9999",
    transition: "all 0.3s ease",
    boxShadow: "0 0 10px rgba(255,215,0,0.3)",
  });

  document.body.appendChild(toggle);

  // Aplicar tema guardado o predeterminado
  const aplicarTema = (tema) => {
    document.documentElement.setAttribute("data-theme", tema);
    toggle.textContent = tema === "dark" ? "☀️" : "🌙";
    localStorage.setItem("tema", tema);
  };

  let temaGuardado = localStorage.getItem("tema") || "dark";
  aplicarTema(temaGuardado);

  // Alternar tema al hacer click
  toggle.addEventListener("click", () => {
    temaGuardado = temaGuardado === "light" ? "dark" : "light";
    aplicarTema(temaGuardado);
  });

  console.log("🧩 CFC_SYNC checkpoint:", "theme.js", `Modo ${temaGuardado} activo`, new Date().toLocaleString());
});

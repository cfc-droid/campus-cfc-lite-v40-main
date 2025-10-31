/* =========================================================
✅ CFC_FUNC_5_1_20251102B — Compatibilidad global modo claro/oscuro
Archivo: /frontend/js/theme.js
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🧩 CFC_SYNC checkpoint:", "theme.js", "Iniciando verificación...");

  // Crear o reutilizar el botón
  let toggle = document.getElementById("theme-toggle");
  if (!toggle) {
    toggle = document.createElement("button");
    toggle.id = "theme-toggle";
    toggle.title = "Cambiar tema claro / oscuro";
    toggle.textContent = "🌙";
    document.body.appendChild(toggle);
  }

  // Aplicar tema guardado o por defecto
  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  };

  let theme = localStorage.getItem("theme") || "dark";
  applyTheme(theme);

  toggle.onclick = () => {
    theme = theme === "light" ? "dark" : "light";
    applyTheme(theme);
    console.log("🎨 Tema cambiado a:", theme);
  };

  // Asegurar estilos inline mínimos (por si no cargó CSS)
  Object.assign(toggle.style, {
    position: "fixed",
    top: "16px",
    right: "16px",
    zIndex: "99999",
    borderRadius: "50%",
    width: "44px",
    height: "44px",
    fontSize: "1.2rem",
    cursor: "pointer",
    background: "#111",
    color: "#ffd700",
    border: "2px solid #ffd700",
    boxShadow: "0 0 10px rgba(255,215,0,0.3)",
  });

  console.log("✅ CFC_SYNC:", `theme.js activo en ${window.location.pathname}`);
});

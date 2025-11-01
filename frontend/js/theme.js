/* =========================================================
✅ CFC_FUNC_5_1_FINAL_20251103 — Modo claro/oscuro global + compatibilidad botón externo
Archivo: /frontend/js/theme.js
========================================================= */

(function () {
  console.log("🧩 CFC_SYNC checkpoint:", "theme.js", "CFC_FUNC_5_1_FINAL");

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const toggle = document.getElementById("theme-toggle");
    if (toggle) toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  };

  const current = localStorage.getItem("theme") || "dark";
  applyTheme(current);

  // Crear o recuperar botón
  let toggle = document.getElementById("theme-toggle");
  if (!toggle) {
    toggle = document.createElement("button");
    toggle.id = "theme-toggle";
    toggle.title = "Cambiar tema claro / oscuro";
    toggle.textContent = current === "dark" ? "☀️" : "🌙";
    document.body.appendChild(toggle);
  }

  toggle.onclick = () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(newTheme);
    console.log("🎨 Tema cambiado a:", newTheme);
  };

  // Hacer accesible globalmente
  window.toggleTheme = () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(newTheme);
  };

  console.log("✅ CFC_SYNC:", `theme.js activo en ${window.location.pathname}`);
})();

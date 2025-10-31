/* =========================================================
✅ CFC_FUNC_5_1_20251102 — Modo claro/oscuro persistente (QA-SYNC V41-REAL)
Archivo: /frontend/js/theme.js
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🧩 CFC_SYNC checkpoint:", "theme.js", "Cargando modo claro/oscuro...", new Date().toLocaleString());

  // 1️⃣ Obtener o crear el botón
  let toggle = document.getElementById("theme-toggle");
  if (!toggle) {
    toggle = document.createElement("button");
    toggle.id = "theme-toggle";
    toggle.title = "Cambiar tema claro / oscuro";
    toggle.textContent = "🌙";
    document.body.appendChild(toggle);
  }

  // 2️⃣ Aplicar tema guardado o por defecto
  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  };

  let current = localStorage.getItem("theme") || "dark";
  applyTheme(current);

  // 3️⃣ Alternar al hacer clic
  toggle.addEventListener("click", () => {
    current = current === "light" ? "dark" : "light";
    applyTheme(current);
    console.log("🎨 CFC_THEME:", `Tema cambiado a ${current}`);
  });

  console.log("✅ CFC_SYNC checkpoint:", "theme.js", `Modo ${current} activo`, new Date().toLocaleString());
});

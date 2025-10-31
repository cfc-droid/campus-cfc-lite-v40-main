/* =========================================================
   ✅ CFC_FUNC_5_1C_V41_REAL_20251102 — Modo claro/oscuro para capítulos
   📄 Archivo: /frontend/js/theme_chapter.js
   🔒 CFC-SYNC V7.8 | QA-SYNC V41.4
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Evitar duplicados
  if (document.getElementById("theme-toggle")) return;

  // Crear el botón
  const toggle = document.createElement("button");
  toggle.id = "theme-toggle";
  toggle.title = "Cambiar tema claro / oscuro";
  document.body.appendChild(toggle);

  // Estilo base
  Object.assign(toggle.style, {
    position: "fixed",
    top: "18px",
    right: "18px",
    borderRadius: "50%",
    width: "44px",
    height: "44px",
    fontSize: "1.2rem",
    fontWeight: "700",
    cursor: "pointer",
    zIndex: "9999",
    transition: "all 0.3s ease",
    border: "2px solid var(--color-accent, #ffd700)",
    boxShadow: "0 0 10px rgba(255,215,0,0.4)"
  });

  // Aplicar tema guardado
  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      toggle.textContent = "☀️";
      toggle.style.background = "var(--color-accent, #ffd700)";
      toggle.style.color = "#000";
    } else {
      toggle.textContent = "🌙";
      toggle.style.background = "#111";
      toggle.style.color = "var(--color-accent, #ffd700)";
    }
  };

  let currentTheme = localStorage.getItem("theme") || "dark";
  applyTheme(currentTheme);

  // Al hacer clic, alternar
  toggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
  });

  console.log("🧩 CFC_SYNC checkpoint:", "theme_chapter.js activo en", window.location.pathname);
});
console.log("✅ CFC_FORCE_DEPLOY — Archivo publicado correctamente");

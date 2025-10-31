// =============================================================
// ✅ CFC_FUNC_5_1D_GLOBAL_20251101 — Auto Theme Loader CFC Trading
// Inserta y sincroniza el botón 🌙/☀️ en todas las páginas del Campus
// =============================================================

(function() {
  document.addEventListener("DOMContentLoaded", () => {
    // Evitar duplicación
    if (document.getElementById("themeToggle")) return;

    // Crear botón
    const btn = document.createElement("button");
    btn.id = "themeToggle";
    btn.title = "Cambiar tema";
    btn.style.cssText = `
      position: fixed;
      top: 18px;
      right: 18px;
      z-index: 99999;
      background: var(--color-bg, #111);
      color: var(--color-accent, #ffd700);
      border: 2px solid var(--color-accent, #ffd700);
      border-radius: 50%;
      width: 44px;
      height: 44px;
      font-size: 1.2rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 0 12px rgba(255,215,0,0.35);
      transition: all 0.4s ease-in-out;
    `;
    document.body.appendChild(btn);

    // Aplicar tema almacenado
    let tema = localStorage.getItem("tema") || "dark";
    aplicarTema(tema);

    btn.addEventListener("click", () => {
      tema = tema === "dark" ? "light" : "dark";
      aplicarTema(tema);
      localStorage.setItem("tema", tema);
    });

    function aplicarTema(t) {
      btn.textContent = t === "dark" ? "☀️" : "🌙";
      const root = document.documentElement;
      if (t === "dark") {
        root.style.setProperty("--color-bg", "#000");
        root.style.setProperty("--color-text", "#f5f5f5");
        root.style.setProperty("--color-accent", "#ffd700");
        document.body.style.background = "#000";
        document.body.style.color = "#f5f5f5";
      } else {
        root.style.setProperty("--color-bg", "#f5f5f5");
        root.style.setProperty("--color-text", "#111");
        root.style.setProperty("--color-accent", "#c9a634");
        document.body.style.background = "#f5f5f5";
        document.body.style.color = "#111";
      }
    }

    console.log("🧩 CFC_SYNC checkpoint:", "auto_theme_loader.js", "Modo global activo", new Date().toLocaleString());
  });
})();

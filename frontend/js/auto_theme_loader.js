/* =============================================================
   ✅ CFC_FUNC_5_1D_GLOBAL_20251101 — Auto Theme Loader CFC Trading
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Evitar duplicados
  if (document.getElementById("themeToggle")) return;

  // Crear botón
  const btn = document.createElement("button");
  btn.id = "themeToggle";
  btn.textContent = "🌙";
  btn.title = "Cambiar tema";
  btn.style.cssText = `
    position: fixed;
    top: 18px;
    right: 18px;
    z-index: 99999;
    background: transparent;
    border: 2px solid #d4af37;
    color: #d4af37;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(212,175,55,0.35);
    opacity: 0;
    transition: all 0.4s ease-in-out;
  `;
  document.body.appendChild(btn);
  setTimeout(() => (btn.style.opacity = 1), 300);

  // Aplicar tema inicial
  let tema = localStorage.getItem("tema") || "dark";
  aplicarTema(tema);

  btn.addEventListener("click", () => {
    tema = tema === "dark" ? "light" : "dark";
    localStorage.setItem("tema", tema);
    aplicarTema(tema);
  });

  function aplicarTema(modo) {
    const root = document.documentElement;
    if (modo === "dark") {
      btn.textContent = "☀️";
      root.style.setProperty("--color-bg", "#000");
      root.style.setProperty("--color-text", "#f5f5f5");
      root.style.setProperty("--color-accent", "#d4af37");
      document.body.style.background = "#000";
      document.body.style.color = "#f5f5f5";
      btn.style.borderColor = "#d4af37";
      btn.style.color = "#d4af37";
    } else {
      btn.textContent = "🌙";
      root.style.setProperty("--color-bg", "#f5f5f5");
      root.style.setProperty("--color-text", "#000");
      root.style.setProperty("--color-accent", "#b38a1e");
      document.body.style.background = "#f5f5f5";
      document.body.style.color = "#000";
      btn.style.borderColor = "#000";
      btn.style.color = "#000";
    }
  }

  console.log("🧩 CFC_SYNC checkpoint:", "auto_theme_loader.js", "Modo global activo", new Date().toLocaleString());
});

/* =========================================================
   ✅ CFC_FUNC_5_1C_V41_REAL_20251102 — Modo claro/oscuro para capítulos
   📄 Archivo: /frontend/js/theme_chapter.js
   🔒 CFC-SYNC V8.2 | QA-SYNC V41.5 (Observer + Retry)
   ========================================================= */

(function () {
  const CFC_ID = "theme-toggle";
  const CFC_STYLE = {
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
    boxShadow: "0 0 10px rgba(255,215,0,0.4)",
  };

  function applyTheme(theme, toggle) {
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
  }

  function injectButton() {
    if (document.getElementById(CFC_ID)) return;

    const toggle = document.createElement("button");
    toggle.id = CFC_ID;
    toggle.title = "Cambiar tema claro / oscuro";
    Object.assign(toggle.style, CFC_STYLE);
    document.body.appendChild(toggle);

    let currentTheme = localStorage.getItem("theme") || "dark";
    applyTheme(currentTheme, toggle);

    toggle.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(currentTheme, toggle);
    });

    // 🔍 Verificación visual rápida
    toggle.style.outline = "3px solid lime";
    setTimeout(() => (toggle.style.outline = ""), 800);

    console.log("✅ CFC_THEME_ACTIVE — botón insertado y tema actual:", currentTheme);
  }

  // 🔁 Intentar varias veces hasta que body exista
  function ensureBodyLoaded() {
    if (document.body) injectButton();
    else setTimeout(ensureBodyLoaded, 150);
  }

  // 🧩 Reintento + observador de mutaciones (seguridad doble)
  ensureBodyLoaded();

  const observer = new MutationObserver(() => {
    if (!document.getElementById(CFC_ID) && document.body) injectButton();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  console.log("🧩 CFC_SYNC checkpoint:", "theme_chapter.js activo en", window.location.pathname);
})();

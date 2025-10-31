/* =========================================================
   ✅ CFC_FUNC_5_1_20251101 — Modo claro/oscuro con botón dinámico
   📄 Archivo: /frontend/js/theme.js
   🔒 CFC-SYNC V7.7 | QA-SYNC V10.1 | Build V41-REAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Crear el botón si no existe
  const toggle = document.createElement("button");
  toggle.id = "theme-toggle";
  toggle.title = "Cambiar tema claro / oscuro";
  document.body.appendChild(toggle);

  // Aplicar tema guardado
  const aplicarTema = (tema) => {
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem("tema", tema);

    // Cambiar ícono y estilo dinámico
    if (tema === "dark") {
      toggle.textContent = "☀️";
      toggle.style.background = "var(--color-accent)";
      toggle.style.color = "#000";
      toggle.style.border = "2px solid var(--color-accent)";
      toggle.style.boxShadow = "0 0 10px rgba(255, 215, 0, 0.4)";
    } else {
      toggle.textContent = "🌙";
      toggle.style.background = "#111";
      toggle.style.color = "var(--color-accent)";
      toggle.style.border = "2px solid #111";
      toggle.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
    }
  };

  // Crear estilos base del botón
  Object.assign(toggle.style, {
    position: "fixed",
    top: "18px",
    right: "18px",
    borderRadius: "50%",
    width: "44px",
    height: "44px",
    fontSize: "1.3rem",
    fontWeight: "700",
    cursor: "pointer",
    zIndex: "9999",
    transition: "all 0.4s ease-in-out",
  });

  // Aplicar tema guardado o por defecto
  let temaGuardado = localStorage.getItem("tema") || "dark";
  aplicarTema(temaGuardado);

  // Alternar al hacer click
  toggle.addEventListener("click", () => {
    temaGuardado = temaGuardado === "light" ? "dark" : "light";
    aplicarTema(temaGuardado);
  });

  console.log("🧩 CFC_SYNC checkpoint:", "theme.js", `Modo ${temaGuardado} activo`, new Date().toLocaleString());
});

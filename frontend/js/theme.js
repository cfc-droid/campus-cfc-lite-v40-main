// ==========================================
// THEME.JS – MODO DÍA / NOCHE CAMPUS CFC
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Crear el botón de alternancia
  const toggle = document.createElement("button");
  toggle.id = "theme-toggle";
  toggle.textContent = "🌙";
  toggle.title = "Alternar modo día/noche";

  Object.assign(toggle.style, {
    position: "fixed",
    top: "18px",
    right: "18px",
    background: "var(--dark)",
    color: "var(--gold)",
    border: "2px solid var(--gold)",
    borderRadius: "50%",
    width: "42px",
    height: "42px",
    fontSize: "1.2rem",
    cursor: "pointer",
    zIndex: "9999",
    transition: "all 0.3s ease",
  });

  document.body.appendChild(toggle);

  // Aplicar tema guardado
  const aplicarTema = (tema) => {
    document.body.classList.toggle("dark-mode", tema === "dark");
    toggle.textContent = tema === "dark" ? "☀️" : "🌙";
    localStorage.setItem("tema", tema);
  };

  let temaGuardado = localStorage.getItem("tema") || "light";
  aplicarTema(temaGuardado);

  // Alternar tema al hacer click
  toggle.addEventListener("click", () => {
    temaGuardado = temaGuardado === "light" ? "dark" : "light";
    aplicarTema(temaGuardado);
  });

  console.log("🌗 Alternancia día/noche activa");
});

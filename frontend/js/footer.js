/* =====================================================
   🔒 CFC-SYNC V7.5 — Subpaso 3-4 (Footer Global)
   ✅ CFC_FUNC_1_3_20251030_FIX4 — Footer global con rutas unificadas (FAQ + Perfil)
   Autor: ChatGPT + CFC
   Objetivo: Footer unificado negro-dorado (FAQ + Perfil) 100% funcional en Cloudflare Pages
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder) return;

  // Detecta si está dentro de /frontend/pages/ o en raíz /frontend/
  const path = window.location.pathname;
  let basePath = "";

  if (path.includes("/frontend/pages/")) {
    basePath = "../pages/"; // Desde una subcarpeta dentro de /frontend/pages/
  } else if (path.includes("/frontend/")) {
    basePath = "./pages/"; // Desde raíz /frontend/
  } else {
    basePath = "frontend/pages/"; // Desde raíz del dominio (Cloudflare)
  }

  placeholder.innerHTML = `
    <footer class="footer-cfc">
      <div class="footer-links">
        <a href="${basePath}faq.html" class="footer-link">❓ FAQ</a>
        <a href="${basePath}profile.html" class="footer-link">👤 Perfil</a>
      </div>
      <p class="footer-copy">© ${new Date().getFullYear()} Campus CFC LITE — Cristian F. Choqui</p>
    </footer>
  `;

  console.log("🧩 CFC_SYNC checkpoint:", "footer.js", "Punto 1.3 FIX rutas unificadas (FAQ + Perfil)", new Date().toLocaleString());
});

/* =====================================================
   🧠 Notas QA CFC-SYNC
   - Compatible con todos los contextos:
       • /frontend/
       • /frontend/pages/
       • raíz (Cloudflare)
   - Evita reinicio visual (fallback a index.html)
   - Footer cargado dinámicamente, único y sincronizado
   - QA verificado para entornos mixtos
   ===================================================== */

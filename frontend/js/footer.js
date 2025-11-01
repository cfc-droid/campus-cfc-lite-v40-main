/* =====================================================
   🔒 CFC-SYNC V7.5 — Subpaso 3-4 (Footer Global FIX FINAL)
   ✅ CFC_FUNC_1_3_20251103_FINAL — Footer funcional 100 % Cloudflare
   Autor: ChatGPT + CFC
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder) return;

  // Base absoluta para evitar reinicios con el loader
  const basePath = window.location.origin.includes("pages.dev")
    ? "/frontend/pages/"
    : "./pages/";

  placeholder.innerHTML = `
    <footer class="footer-cfc">
      <div class="footer-links">
        <a href="${basePath}faq.html" class="footer-link">❓ FAQ</a>
        <a href="${basePath}profile.html" class="footer-link">👤 Perfil</a>
      </div>
      <p class="footer-copy">© ${new Date().getFullYear()} Campus CFC LITE — Cristian F. Choqui</p>
    </footer>
  `;

  console.log("🧩 CFC_SYNC checkpoint:", "footer.js | FIX_FINAL rutas absolutas", new Date().toLocaleString());
});

import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <header className="auth-header">
          <div className="left-logos">
            <img src="/images/senac-logo.png" alt="Senac" style={{ height: 32, opacity: .9 }} />
            <img src="/images/fecomercio-sesc.png" alt="Fecomércio Sesc" style={{ height: 32, opacity: .8, marginLeft: 12 }} />
          </div>

          <nav className="top-links">
            <a href="/politica-de-privacidade">POLÍTICA DE PRIVACIDADE</a>
            <span> | </span>
            <a href="/termos-de-uso">TERMOS DE USO</a>
          </nav>
        </header>

        <main className="auth-main">{children}</main>

        <footer className="auth-footer">Desenvolvido por Gabriel Matos TesteFullStack</footer>
      </div>

      <a className="help-fab" href="/ajuda">? AJUDA</a>
    </div>
  );
}

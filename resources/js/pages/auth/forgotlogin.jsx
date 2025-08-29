import React from "react";
import { useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function ForgotLogin({ status }) {
  const { data, setData, post, processing, errors } = useForm({ email: "" });

  const submit = (e) => {
    e.preventDefault();
    post("/forgot-login");
  };

  // Objeto de estilos para manter o JSX limpo e organizado
  const styles = {
    cardLogin: {
      background: "linear-gradient(to bottom, #F9A825, #E65100)", // Mesmo gradiente da tela de login
      padding: "40px",
      borderRadius: "25px",
      color: "#FFFFFF", // Cor do texto principal
      width: "100%",
      maxWidth: "400px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      textAlign: "center", // Centraliza o conteúdo do card
    },
    title: {
      fontWeight: "bold",
      fontSize: "1.5rem", // 24px
      marginBottom: "10px",
    },
    subtitle: {
      marginBottom: "25px",
      opacity: 0.9,
      fontSize: "1rem",
    },
    input: {
      width: "100%",
      padding: "12px 20px",
      margin: "10px 0",
      display: "inline-block",
      border: "1px solid #FFFFFF",
      borderRadius: "25px",
      boxSizing: "border-box",
      backgroundColor: "transparent",
      color: "#FFFFFF",
      fontSize: "1rem",
      textAlign: "center", // Centraliza o texto do input
    },
    button: {
      backgroundColor: "#212121",
      color: "white",
      padding: "14px 20px",
      border: "none",
      borderRadius: "25px",
      cursor: "pointer",
      width: "100%", // Ocupa a largura total do container do formulário
      fontSize: "1rem",
      fontWeight: "bold",
      marginTop: "15px",
    },
    links: {
      marginTop: "25px",
    },
    link: {
      color: "#FFFFFF",
      textDecoration: "none",
      fontSize: "0.9rem",
    },
    error: {
      color: "#212121",
      fontSize: "12px",
      marginTop: "4px",
      fontWeight: "bold",
    },
    status: {
      color: "#111",
      background: "#E8F5E9", // Fundo verde claro para sucesso
      borderRadius: "8px",
      padding: "10px 15px",
      marginBottom: "20px",
      textAlign: "center",
    }
  };

  // Estilo global para o placeholder do input
  const globalStyles = `
    .input::placeholder {
      color: white;
      opacity: 0.8;
    }
  `;

  return (
    <AuthLayout>
      <style>{globalStyles}</style>
      <div style={styles.cardLogin}>
        <h1 style={styles.title}>Recuperar Login</h1>
        <p style={styles.subtitle}>Insira seu e-mail para receber seu CPF.</p>

        {status && (
          <div style={styles.status}>
            {status}
          </div>
        )}

        <form onSubmit={submit}>
          <div className="field">
            <input
              className="input"
              style={styles.input}
              type="email"
              placeholder="E-mail cadastrado"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              required
            />
            {errors.email && <div style={styles.error}>{errors.email}</div>}
          </div>

          <button style={styles.button} disabled={processing}>
            Enviar meu CPF por e-mail
          </button>
        </form>

        <div style={styles.links}>
          <a href="/login" style={styles.link}>
            Lembrou sua senha? Voltar ao login
          </a>
        </div>
      </div>
    </AuthLayout>
  );
}

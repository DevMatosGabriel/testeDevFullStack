
import React from "react";
import { useForm } from "@inertiajs/react";
import AuthLayout from "@/layouts/AuthLayout";

/* ===== helpers CPF ===== */
const unmask = (s = "") => s.replace(/\D+/g, "");
const maskCpf = (v = "") => {
  const n = unmask(v).slice(0, 11);
  const p1 = n.slice(0, 3);
  const p2 = n.slice(3, 6);
  const p3 = n.slice(6, 9);
  const p4 = n.slice(9, 11);
  let out = p1;
  if (p2) out += "." + p2;
  if (p3) out += "." + p3;
  if (p4) out += "-" + p4;
  return out;
};

export default function Login({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    cpf: "",
    password: "",
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
    post("/login", data, {
      headers: {
        "X-CSRF-TOKEN": csrfToken || "",
      },
    });
  };

  const styles = {
    cardLogin: {
      background: "linear-gradient(to bottom, #F9A825, #E65100)",
      padding: "40px",
      borderRadius: "25px",
      color: "#FFFFFF",
      width: "100%",
      maxWidth: "400px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    },
    brand: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "5px",
      marginBottom: "20px",
    },
    title: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "1.5rem",
      marginBottom: "25px",
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
    },
    buttonContainer: {
      textAlign: "center",
      margin: "25px 0",
    },
    button: {
      backgroundColor: "#212121",
      color: "white",
      padding: "14px 20px",
      border: "none",
      borderRadius: "25px",
      cursor: "pointer",
      width: "80%",
      fontSize: "1rem",
      fontWeight: "bold",
    },
    links: {
      textAlign: "center",
      marginTop: "20px",
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
      background: "#fff",
      borderRadius: "8px",
      padding: "8px 10px",
      marginBottom: "10px",
      textAlign: "center",
    },
  };

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
        <div style={styles.brand}>
          <img
            src="/images/senaclearning.png"
            alt="senaclearning"
            style={{ height: 40 }}
          />
          <span style={{ fontSize: 12, opacity: 0.85 }}>you connected</span>
        </div>

        <h1 style={styles.title}>FAÇA O SEU LOGIN</h1>

        {status && <div style={styles.status}>{status}</div>}

        <form onSubmit={submit}>
          <div className="field cpf-field">
            <input
              className="input"
              style={styles.input}
              type="text"
              inputMode="numeric"
              placeholder="CPF"
              value={data.cpf}
              onChange={(e) => setData("cpf", maskCpf(e.target.value))}
              autoComplete="username"
              maxLength={14}
            />
            {errors.cpf && <div style={styles.error}>{errors.cpf}</div>}
          </div>

          <div className="field password-field">
            <input
              className="input"
              style={styles.input}
              type="password"
              placeholder="SENHA"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              autoComplete="current-password"
            />
            {errors.password && (
              <div style={styles.error}>{errors.password}</div>
            )}
          </div>

          <div style={styles.buttonContainer}>
            <button style={styles.button} disabled={processing}>
              Acesse agora
            </button>
          </div>
        </form>

        <div style={styles.links}>
          <a href="/forgot-login" style={styles.link}>
            Esqueci meu login ou senha
          </a>
        </div>
      </div>
    </AuthLayout>
  );
}

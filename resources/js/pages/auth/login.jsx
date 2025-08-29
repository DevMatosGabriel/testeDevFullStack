import React from "react";
import { useForm } from "@inertiajs/react";
import AuthLayout from "@/layouts/AuthLayout"; // <-- corrigido

export default function Login({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    cpf: "",
    password: "",
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post("/login");
  };

  return (
    <AuthLayout>
      <div className="card-login">
        <div className="brand">
          <img src="/images/senaclearning.png" alt="senaclearning" style={{ height: 32 }} />
          <span style={{ fontSize: 12, opacity: .85 }}>you connected</span>
        </div>

        <h1>FAÇA O SEU LOGIN</h1>

        {status && (
          <div style={{ color:"#111", background:"#fff", borderRadius:8, padding:"8px 10px", marginBottom:10 }}>
            {status}
          </div>
        )}

        <form onSubmit={submit}>
          <div className="field">
            <label>CPF</label>
            <input
              className="input"
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={data.cpf}
              onChange={(e) => setData("cpf", e.target.value)}
              autoComplete="username"
            />
            {errors.cpf && <div style={{ color:"#111", fontSize:12, marginTop:4 }}>{errors.cpf}</div>}
          </div>

          <div className="field">
            <label>SENHA</label>
            <input
              className="input"
              type="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              autoComplete="current-password"
            />
            {errors.password && <div style={{ color:"#111", fontSize:12, marginTop:4 }}>{errors.password}</div>}
          </div>

          <button className="btn" disabled={processing}>Acesse agora</button>
        </form>

        <div className="links">
          <a href="/forgot-login">Esqueci meu login (CPF)</a>
          <a href="/forgot-password">Esqueci minha senha</a>
        </div>
      </div>
    </AuthLayout>
  );
}

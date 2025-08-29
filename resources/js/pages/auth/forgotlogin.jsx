import React from "react";
import { useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function ForgotLogin({ status }) {
  const { data, setData, post, processing, errors } = useForm({ email: "" });

  const submit = (e) => {
    e.preventDefault();
    post("/forgot-login");
  };

  return (
    <AuthLayout>
      <div className="card-login" style={{ background:"#fff", color:"#111" }}>
        <h1 style={{ color:"#111" }}>Recuperar login (CPF)</h1>

        {status && (
          <div style={{ color:"#111", background:"#e8f5e9", borderRadius:8, padding:"8px 10px", marginBottom:10 }}>
            {status}
          </div>
        )}

        <form onSubmit={submit}>
          <div className="field">
            <label>E-mail cadastrado</label>
            <input
              className="input"
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
            />
            {errors.email && <div style={{ color:"#c00", fontSize:12, marginTop:4 }}>{errors.email}</div>}
          </div>

          <button className="btn" disabled={processing}>Enviar meu CPF por e-mail</button>
        </form>

        <div className="links" style={{ marginTop: 14 }}>
          <a href="/login">Voltar ao login</a>
        </div>
      </div>
    </AuthLayout>
  );
}

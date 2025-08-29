import React from "react";
import { Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

// máscara 000.000.000-00
const maskCpf = (v) => {
  const d = (v || "").replace(/\D+/g, "").slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
};
const unmask = (s) => (s || "").replace(/\D+/g, "");

export default function UsersCreate() {
  const { data, setData, post, processing, errors, reset, transform } = useForm({
    name: "",
    cpf: "",
    email: "",
    data_nascimento: "",
    role: 3,
    password: "",
    password_confirmation: "",
  });

  // Fallback CSRF direto do <meta>
  const csrf = document.querySelector('meta[name="csrf-token"]')?.content || "";

  const submit = (e) => {
    e.preventDefault();
    transform((curr) => ({ ...curr, cpf: unmask(curr.cpf), role: Number(curr.role) }));
    post("/users", {
      // envia _token junto (fallback, além do header do axios)
      data: { _token: csrf },
      onSuccess: () => reset(),
      preserveScroll: true,
    });
  };

  return (
    <AuthLayout>
      <div className="page-form">
        <div className="form-header">
          <Link href="/users" aria-label="Voltar para lista" className="icon-btn back-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>

          <div className="form-title">
            <h1>Novo usuário</h1>
            <p>Preencha os dados para criar um acesso.</p>
          </div>
        </div>

        <div className="card-form">
          <form onSubmit={submit}>
            <div className="field">
              <label>name</label>
              <input
                className="input input--lg"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
              />
              {errors.name && <small className="error">{errors.name}</small>}
            </div>

            <div className="field">
              <label>CPF</label>
              <input
                className="input input--lg"
                inputMode="numeric"
                value={data.cpf}
                onChange={(e) => setData("cpf", maskCpf(e.target.value))}
                placeholder="000.000.000-00"
                required
              />
              {errors.cpf && <small className="error">{errors.cpf}</small>}
            </div>

            <div className="field">
              <label>E-mail</label>
              <input
                className="input input--lg"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
              />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>

            <div className="field two-cols">
              <div>
                <label>Data de nascimento</label>
                <input
                  className="input input--lg"
                  type="date"
                  value={data.data_nascimento}
                  onChange={(e) => setData("data_nascimento", e.target.value)}
                  required
                />
                {errors.data_nascimento && (
                  <small className="error">{errors.data_nascimento}</small>
                )}
              </div>

              <div>
                <label>Nível de permissão</label>
                <select
                  className="input input--lg"
                  value={data.role}
                  onChange={(e) => setData("role", Number(e.target.value))}
                >
                  <option value={1}>Administrador</option>
                  <option value={2}>Moderador</option>
                  <option value={3}>Leitor</option>
                </select>
                {errors.role && <small className="error">{errors.role}</small>}
              </div>
            </div>

            <div className="field">
              <label>Senha</label>
              <input
                className="input input--lg"
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                required
              />
              {errors.password && <small className="error">{errors.password}</small>}
            </div>

            <div className="field">
              <label>Confirmar senha</label>
              <input
                className="input input--lg"
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData("password_confirmation", e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <button className="btn btn--primary btn--xl" disabled={processing}>
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

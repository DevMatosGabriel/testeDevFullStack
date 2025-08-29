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

    transform((curr) => ({
        ...curr,
        cpf: unmask(curr.cpf),
        role: Number(curr.role),
    }));

    post('/users', {
        onSuccess: () => reset(),
        onError: (errors) => {
            console.error("Erro de validação:", errors);
        },
        onFinish: () => {
            console.log("Finalizado");
        },
    });
};


  return (
    <AuthLayout>
      {/* Container principal com largura maior */}
      <div style={{
        width: '100%',
        maxWidth: '800px', // Largura maior para o formulário
        margin: '0 auto',
        padding: '2rem 1rem',
        minHeight: '100vh'
      }}>
        {/* Header com botão voltar e título */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <Link
            href="/users"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#FFFFFF',
              textDecoration: 'none',
              transition: 'all 0.2s',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>

          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#FFFFFF',
              margin: 0,
              marginBottom: '0.5rem'
            }}>
              Novo usuário
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0,
              fontSize: '1.1rem'
            }}>
              Preencha os dados para criar um acesso.
            </p>
          </div>
        </div>

        {/* Card do formulário */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <form onSubmit={submit}>
            {/* Nome */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                Nome completo
              </label>
              <input
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #E0E0E0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: '#FAFAFA'
                }}
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = '#F9A825';
                  e.target.style.backgroundColor = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E0E0E0';
                  e.target.style.backgroundColor = '#FAFAFA';
                }}
                required
              />
              {errors.name && <small style={{ color: '#F44336', fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>{errors.name}</small>}
            </div>

            {/* Grid para CPF e E-mail */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {/* CPF */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '1rem'
                }}>
                  CPF
                </label>
                <input
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #E0E0E0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: '#FAFAFA'
                  }}
                  inputMode="numeric"
                  value={data.cpf}
                  onChange={(e) => setData("cpf", maskCpf(e.target.value))}
                  placeholder="000.000.000-00"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F9A825';
                    e.target.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E0E0E0';
                    e.target.style.backgroundColor = '#FAFAFA';
                  }}
                  required
                />
                {errors.cpf && <small style={{ color: '#F44336', fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>{errors.cpf}</small>}
              </div>

              {/* E-mail */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '1rem'
                }}>
                  E-mail
                </label>
                <input
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #E0E0E0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: '#FAFAFA'
                  }}
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F9A825';
                    e.target.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E0E0E0';
                    e.target.style.backgroundColor = '#FAFAFA';
                  }}
                  required
                />
                {errors.email && <small style={{ color: '#F44336', fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>{errors.email}</small>}
              </div>
            </div>

            {/* Grid para Data de nascimento e Nível de permissão */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {/* Data de nascimento */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '1rem'
                }}>
                  Data de nascimento
                </label>
                <input
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #E0E0E0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: '#FAFAFA'
                  }}
                  type="date"
                  value={data.data_nascimento}
                  onChange={(e) => setData("data_nascimento", e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F9A825';
                    e.target.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E0E0E0';
                    e.target.style.backgroundColor = '#FAFAFA';
                  }}
                />
                {errors.data_nascimento && (
                  <small style={{ color: '#F44336', fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>{errors.data_nascimento}</small>
                )}
              </div>

              {/* Nível de permissão */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '1rem'
                }}>
                  Nível de permissão
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #E0E0E0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: '#FAFAFA',
                    cursor: 'pointer'
                  }}
                  value={data.role}
                  onChange={(e) => setData("role", Number(e.target.value))}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F9A825';
                    e.target.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E0E0E0';
                    e.target.style.backgroundColor = '#FAFAFA';
                  }}
                >
                  <option value={1}>Administrador</option>
                  <option value={2}>Moderador</option>
                  <option value={3}>Leitor</option>
                </select>
                {errors.role && <small style={{ color: '#F44336', fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>{errors.role}</small>}
              </div>
            </div>

            {/* Grid para Senhas */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {/* Senha */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '1rem'
                }}>
                  Senha
                </label>
                <input
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #E0E0E0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: '#FAFAFA'
                  }}
                  type="password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F9A825';
                    e.target.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E0E0E0';
                    e.target.style.backgroundColor = '#FAFAFA';
                  }}
                  required
                />
                {errors.password && <small style={{ color: '#F44336', fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>{errors.password}</small>}
              </div>

              {/* Confirmar senha */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '1rem'
                }}>
                  Confirmar senha
                </label>
                <input
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #E0E0E0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: '#FAFAFA'
                  }}
                  type="password"
                  value={data.password_confirmation}
                  onChange={(e) => setData("password_confirmation", e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F9A825';
                    e.target.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E0E0E0';
                    e.target.style.backgroundColor = '#FAFAFA';
                  }}
                  required
                />
              </div>
            </div>

            {/* Botão de ação */}
            <div style={{ textAlign: 'center' }}>
              <button
                style={{
                  padding: '16px 48px',
                  backgroundColor: processing ? '#CCCCCC' : '#F9A825',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: processing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(249, 168, 37, 0.3)'
                }}
                disabled={processing}
                onMouseOver={(e) => {
                  if (!processing) {
                    e.target.style.backgroundColor = '#F57F17';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(249, 168, 37, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!processing) {
                    e.target.style.backgroundColor = '#F9A825';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(249, 168, 37, 0.3)';
                  }
                }}
              >
                {processing ? 'Cadastrando...' : 'Cadastrar Usuário'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

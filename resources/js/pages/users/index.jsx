import React, { useMemo, useState, useEffect } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

const avatar = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff">
    <circle cx="12" cy="12" r="12" fill="#d96f1a" />
    <circle cx="12" cy="9" r="3.5" fill="#fff" />
    <path d="M4.5 19a7.5 7.5 0 0115 0v.5H4.5V19z" fill="#fff" />
  </svg>
);

const roleLabel = (r) => (r === 1 ? "Administrador" : r === 2 ? "Moderador" : "Leitor");

/* Helpers de CPF */
const unmask = (s) => (s || "").replace(/\D+/g, "");
const maskCpf = (v) => {
  const n = unmask(v).slice(0, 11);
  if (n.length <= 3) return n;
  if (n.length <= 6) return `${n.slice(0, 3)}.${n.slice(3)}`;
  if (n.length <= 9) return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6)}`;
  return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6, 9)}-${n.slice(9)}`;
};

export default function UsersIndex() {
  const { props } = usePage();
  const users = props.users ?? [];
  const canCreate = !!(props.can && props.can.create);



  /* Toast (3s) */
  const [toast, setToast] = useState(null);
  useEffect(() => {
    let t;
    if (props.flash?.success) {
      setToast({ text: props.flash.success, type: "ok" });
      t = setTimeout(() => setToast(null), 3000);
    } else if (props.flash?.error) {
      setToast({ text: props.flash.error, type: "err" });
      t = setTimeout(() => setToast(null), 3000);
    }
    return () => clearTimeout(t);
  }, [props.flash]);

  /* ===== Editar ===== */
  const [editing, setEditing] = useState(null);
  const [originalCpf, setOriginalCpf] = useState("");

  const editForm = useForm({
    id: null,
    name: "",
    cpf: "",
    email: "",
    data_nascimento: "",
    role: 3,
    password: "",
    password_confirmation: "",
  });

  const openEdit = (u) => {
    const raw = u.cpf_raw ? String(u.cpf_raw) : unmask(u.cpf);
    setOriginalCpf(raw);

    setEditing(u);
    editForm.setData({
      id: u.id,
      name: u.name,
      cpf: maskCpf(raw),
      email: u.email,
      data_nascimento: "",
      role: Number(u.role || 3),
      password: "",
      password_confirmation: "",
    });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    editForm.transform((curr) => {
      const out = { ...curr, role: Number(curr.role) };
      const digits = unmask(curr.cpf);

      // só envia CPF se alterou
      if (digits && digits !== originalCpf) out.cpf = digits;
      else delete out.cpf;

      if (!out.data_nascimento) delete out.data_nascimento;
      return out;
    });

    editForm.put(`/users/${editForm.data.id}`, {
  preserveScroll: true,
  onSuccess: () => setEditing(null),
});
  };

  /* ===== Excluir ===== */
  const [toDelete, setToDelete] = useState(null); // <-- faltava declarar

  const confirmDelete = () => {
    if (!toDelete) return;
   editForm.delete(`/users/${toDelete.id}`, {
  preserveScroll: true,
  onFinish: () => setToDelete(null),
});
  };

  /* ===== Busca (cliente) ===== */
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return users;
    return users.filter(
      (u) =>
        (u.name || "").toLowerCase().includes(s) ||
        (u.email || "").toLowerCase().includes(s) ||
        (u.cpf || "").toLowerCase().includes(s)
    );
  }, [q, users]);

  return (
    <AuthLayout>
      <div className="page-users page-users--wide">
        {/* Toast flutuante */}
        {toast && (
          <div
            className={`toast-float ${toast.type === "ok" ? "toast-float--ok" : "toast-float--err"}`}
            role="status"
            aria-live="polite"
          >
            {toast.text}
          </div>
        )}

        {/* Título + ações */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <h2 className="page-users__title">Usuários</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {canCreate && (
              <Link href="/users/create" className="btn">
                Adicionar usuário
              </Link>
            )}
            <Link href="/logout" method="post" as="button" className="btn btn--ghost">
              Sair
            </Link>
          </div>
        </div>

        {/* Lista */}
        <div className="panel panel--wide users-panel">
          <div className="list-head">
            <input
              className="input"
              placeholder="Buscar por nome, e-mail ou CPF..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="list">
            {filtered.map((u) => (
              <UserRow key={u.id} u={u} onEdit={() => openEdit(u)} onDelete={() => setToDelete(u)} />
            ))}
            {filtered.length === 0 && <div className="muted">Nenhum usuário encontrado.</div>}
          </div>
        </div>

        {/* MODAL EDITAR */}
        {editing && (
          <div className="modal-overlay" onClick={() => setEditing(null)}>
            <div className="modal modal--lg" onClick={(e) => e.stopPropagation()}>
              <h3 className="panel__title" style={{ marginTop: 0 }}>
                Editar usuário
              </h3>

              <form onSubmit={submitEdit}>
                <div className="field">
                  <label>name</label>
                  <input
                    className="input"
                    value={editForm.data.name}
                    onChange={(e) => editForm.setData("name", e.target.value)}
                    required
                  />
                  {editForm.errors.name && <small className="error">{editForm.errors.name}</small>}
                </div>

                <div className="field">
                  <label>CPF</label>
                  <input
                    className="input"
                    inputMode="numeric"
                    value={editForm.data.cpf}
                    onChange={(e) => editForm.setData("cpf", maskCpf(e.target.value))}
                    required
                  />
                  {editForm.errors.cpf && <small className="error">{editForm.errors.cpf}</small>}
                </div>

                <div className="field">
                  <label>E-mail</label>
                  <input
                    className="input"
                    type="email"
                    value={editForm.data.email}
                    onChange={(e) => editForm.setData("email", e.target.value)}
                    required
                  />
                  {editForm.errors.email && <small className="error">{editForm.errors.email}</small>}
                </div>

                <div className="field">
                  <label>Nível</label>
                  <select
                    className="input"
                    value={editForm.data.role}
                    onChange={(e) => editForm.setData("role", Number(e.target.value))}
                  >
                    <option value={1}>Administrador</option>
                    <option value={2}>Moderador</option>
                    <option value={3}>Leitor</option>
                  </select>
                  {editForm.errors.role && <small className="error">{editForm.errors.role}</small>}
                </div>

                <div className="field">
                  <label>Nova senha (opcional)</label>
                  <input
                    className="input"
                    type="password"
                    value={editForm.data.password}
                    onChange={(e) => editForm.setData("password", e.target.value)}
                  />
                  {editForm.errors.password && <small className="error">{editForm.errors.password}</small>}
                </div>

                <div className="field">
                  <label>Confirmar nova senha</label>
                  <input
                    className="input"
                    type="password"
                    value={editForm.data.password_confirmation}
                    onChange={(e) => editForm.setData("password_confirmation", e.target.value)}
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn--ghost" onClick={() => setEditing(null)}>
                    Cancelar
                  </button>
                  <button className="btn" disabled={editForm.processing}>
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL EXCLUIR */}
        {toDelete && (
          <div className="modal-overlay" onClick={() => setToDelete(null)}>
            <div className="modal modal--sm" onClick={(e) => e.stopPropagation()}>
              <h3 className="panel__title" style={{ marginTop: 0 }}>
                Excluir usuário
              </h3>
              <p>
                Tem certeza que deseja excluir <strong>{toDelete.name}</strong>?
              </p>
              <div className="modal-actions">
                <button className="btn btn--ghost" onClick={() => setToDelete(null)}>
                  Cancelar
                </button>
                <button className="btn" onClick={confirmDelete} disabled={editForm.processing}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}

function UserRow({ u, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const chipClass = u.role === 1 ? "chip chip--admin" : u.role === 2 ? "chip chip--mod" : "chip chip--view";

  return (
    <div className="user-row user-row--desktop">
      <div className="user-row__left">
        <div className="user-row__avatar">{avatar}</div>
        <div className="user-row__meta">
          <div className="user-row__email truncate">{u.email}</div>
          <div className="user-row__name truncate">{u.name}</div>
        </div>
      </div>

      <div className="user-row__right">
        <span className={chipClass}>{roleLabel(u.role)}</span>

        <div className="actions">
          <button
            className="btn btn--small btn--secondary"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
          >
            Ações ▾
          </button>
          {open && (
            <div className="menu" role="menu" onMouseLeave={() => setOpen(false)}>
              <button className="menu__item" onClick={() => { setOpen(false); onEdit(); }} disabled={!u.can.edit}>
                Editar
              </button>
              <button className="menu__item" onClick={() => { setOpen(false); onDelete(); }} disabled={!u.can.delete}>
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

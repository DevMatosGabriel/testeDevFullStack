import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    nome: '',
    cpf: '',
    data_nascimento: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 3, // 1=Admin, 2=Moderador, 3=Leitor
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Registrar" />

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="nome" value="Nome completo" />
          <TextInput
            id="nome"
            name="nome"
            value={data.nome}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={(e) => setData('nome', e.target.value)}
            required
          />
          <InputError message={errors.nome} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="cpf" value="CPF" />
          <TextInput
            id="cpf"
            name="cpf"
            value={data.cpf}
            className="mt-1 block w-full"
            autoComplete="username"
            placeholder="000.000.000-00"
            onChange={(e) => setData('cpf', e.target.value)}
            required
          />
          <InputError message={errors.cpf} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="data_nascimento" value="Data de nascimento" />
          <TextInput
            id="data_nascimento"
            type="date"
            name="data_nascimento"
            value={data.data_nascimento}
            className="mt-1 block w-full"
            onChange={(e) => setData('data_nascimento', e.target.value)}
          />
          <InputError message={errors.data_nascimento} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email" value="E-mail" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="email"
            onChange={(e) => setData('email', e.target.value)}
            required
          />
          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Senha" />
          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
            required
          />
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password_confirmation" value="Confirmar senha" />
          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
          />
          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="role" value="Nível de acesso" />
          <select
            id="role"
            name="role"
            value={data.role}
            onChange={(e) => setData('role', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value={1}>Admin</option>
            <option value={2}>Moderador</option>
            <option value={3}>Leitor</option>
          </select>
          <InputError message={errors.role} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={route('login')}
            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Já tem conta?
          </Link>

          <PrimaryButton className="ms-4" disabled={processing}>
            Registrar
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}

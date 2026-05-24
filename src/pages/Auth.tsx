import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { parseApiError } from '../services/api';
import { UserRole } from '../types';
import {
  emptyProfessionalOnboarding,
  ProfessionalOnboardingFields,
} from '../components/professionals/ProfessionalOnboardingFields';

export default function Auth() {
  const [role, setRole] = useState<UserRole>('client');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [professionalData, setProfessionalData] = useState(emptyProfessionalOnboarding());
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') ?? '');
    const password = String(data.get('password') ?? '');
    const fullName = String(data.get('name') ?? name).trim();

    if (!email.includes('@') || password.length < 6) {
      setLoading(false);
      return setErrorMessage('Informe um e-mail válido e senha com 6+ caracteres.');
    }

    if (isRegister && fullName.length < 3) {
      setLoading(false);
      return setErrorMessage('Informe seu nome completo para cadastro.');
    }

    if (isRegister && role === 'professional') {
      if (!professionalData.city || !professionalData.state || !professionalData.title || !professionalData.description) {
        setLoading(false);
        return setErrorMessage('Preencha os dados do perfil profissional e as especificações da vaga.');
      }
    }

    try {
      const extra =
        isRegister && role === 'professional'
          ? {
              professional_type: professionalData.professional_type,
              city: professionalData.city,
              state: professionalData.state,
              title: professionalData.title,
              description: professionalData.description,
              price_from: professionalData.price_from ? Number(professionalData.price_from) : undefined,
              job_specs: professionalData.job_specs,
            }
          : undefined;

      await login(email, password, role, isRegister, fullName, extra);
      toast(isRegister ? 'Cadastro realizado!' : 'Login realizado!');
      navigate(role === 'professional' ? '/dashboard/profissional' : '/dashboard/cliente');
    } catch (error) {
      const parsedError = parseApiError(error);
      setErrorMessage(parsedError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container-page grid min-h-[calc(100vh-80px)] items-center gap-10 py-10 lg:grid-cols-2">
      <div>
        <h1 className="text-5xl font-extrabold tracking-tight">Entre na sua conta ou comece agora.</h1>
        <p className="mt-5 text-lg text-slate-500">
          Cadastre-se como cliente ou como profissional (diarista, babá ou montador de móveis).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card mx-auto w-full max-w-md p-6 shadow-premium">
        <h2 className="text-2xl font-bold">{isRegister ? 'Criar conta' : 'Login'}</h2>

        {errorMessage && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" onClick={() => { setRole('client'); setErrorMessage(''); }} className={role === 'client' ? 'btn-primary' : 'btn-secondary'}>
            Cliente
          </button>
          <button type="button" onClick={() => { setRole('professional'); setErrorMessage(''); }} className={role === 'professional' ? 'btn-primary' : 'btn-secondary'}>
            Profissional
          </button>
        </div>

        {isRegister && (
          <input
            name="name"
            className="input mt-4"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMessage('');
            }}
            required
          />
        )}

        {isRegister && role === 'professional' && (
          <div className="mt-4">
            <ProfessionalOnboardingFields value={professionalData} onChange={setProfessionalData} />
          </div>
        )}

        <label className="mt-5 block text-sm font-semibold">E-mail</label>
        <div className="relative mt-2">
          <FiMail className="absolute left-4 top-4 text-slate-400" />
          <input
            name="email"
            className="input pl-11"
            placeholder="voce@email.com"
            onChange={() => setErrorMessage('')}
          />
        </div>

        <label className="mt-4 block text-sm font-semibold">Senha</label>
        <div className="relative mt-2">
          <FiLock className="absolute left-4 top-4 text-slate-400" />
          <input
            name="password"
            type="password"
            className="input pl-11"
            placeholder="••••••"
            onChange={() => setErrorMessage('')}
          />
        </div>

        <button disabled={loading} className="btn-primary mt-6 w-full">
          {loading ? 'Carregando...' : 'Continuar'}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsRegister(!isRegister);
            setErrorMessage('');
          }}
          className="mt-4 w-full text-sm font-bold text-brand-600"
        >
          {isRegister ? 'Já tenho conta' : 'Criar cadastro separado'}
        </button>
      </form>
    </section>
  );
}

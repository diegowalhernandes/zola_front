import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiShield } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { parseApiError } from '../services/api';
import { UserRole } from '../types';
import { BRAND } from '../design/brand';
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
      setErrorMessage(parseApiError(error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container-page grid min-h-[calc(100vh-4.5rem)] items-center gap-10 py-10 lg:grid-cols-2 lg:py-16">
      <div className="hidden lg:block">
        <span className="eyebrow">Acesso seguro</span>
        <h1 className="heading-display mt-6">
          {isRegister ? 'Comece na' : 'Bem-vindo à'} {BRAND.name}
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted">
          Cadastre-se como cliente ou profissional. Diarista, babá ou montador — com especificações claras desde o primeiro passo.
        </p>
        <ul className="mt-8 space-y-4">
          {['Autenticação protegida', 'Perfis verificados', 'Agenda transparente'].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm font-medium text-graphite-600 dark:text-graphite-300">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <FiShield />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="card-elevated mx-auto w-full max-w-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-graphite-900 dark:text-white">
          {isRegister ? 'Criar conta' : 'Entrar'}
        </h2>
        <p className="mt-1 text-sm text-muted lg:hidden">{BRAND.tagline}</p>

        {errorMessage && <div className="alert-error mt-4">{errorMessage}</div>}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setRole('client');
              setErrorMessage('');
            }}
            className={role === 'client' ? 'btn-primary' : 'btn-secondary'}
          >
            Cliente
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('professional');
              setErrorMessage('');
            }}
            className={role === 'professional' ? 'btn-primary' : 'btn-secondary'}
          >
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

        <label className="mt-5 block text-sm font-semibold text-graphite-700 dark:text-graphite-200">E-mail</label>
        <div className="relative mt-2">
          <FiMail className="absolute left-4 top-3.5 text-graphite-400" />
          <input name="email" className="input pl-11" placeholder="voce@email.com" onChange={() => setErrorMessage('')} />
        </div>

        <label className="mt-4 block text-sm font-semibold text-graphite-700 dark:text-graphite-200">Senha</label>
        <div className="relative mt-2">
          <FiLock className="absolute left-4 top-3.5 text-graphite-400" />
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
          className="mt-4 w-full text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          {isRegister ? 'Já tenho conta' : 'Criar cadastro'}
        </button>
      </form>
    </section>
  );
}

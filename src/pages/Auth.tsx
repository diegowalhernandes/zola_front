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
import { DocumentRegistrationFields } from '../components/auth/DocumentRegistrationFields';
import { DocumentType, normalizeDocumentNumber, validateDocument } from '../utils/documentValidation';

export default function Auth() {
  const [role, setRole] = useState<UserRole>('client');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [professionalData, setProfessionalData] = useState(emptyProfessionalOnboarding());
  const [documentType, setDocumentType] = useState<DocumentType>('cpf');
  const [documentNumber, setDocumentNumber] = useState('');
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

    if (isRegister) {
      const documentError = validateDocument(documentType, documentNumber);
      if (documentError) {
        setLoading(false);
        return setErrorMessage(documentError);
      }
    }

    if (isRegister && role === 'professional') {
      if (!professionalData.city || !professionalData.state || !professionalData.title || !professionalData.description) {
        setLoading(false);
        return setErrorMessage('Preencha os dados do perfil profissional e as especificações da vaga.');
      }
    }

    try {
      await login(email, password, role, isRegister, fullName, {
        document_type: documentType,
        document_number: normalizeDocumentNumber(documentType, documentNumber),
        ...(isRegister && role === 'professional'
          ? {
              professional_type: professionalData.professional_type,
              city: professionalData.city,
              state: professionalData.state,
              title: professionalData.title,
              description: professionalData.description,
              price_from: professionalData.price_from ? Number(professionalData.price_from) : undefined,
              job_specs: professionalData.job_specs,
            }
          : {}),
      });
      toast(isRegister ? 'Cadastro realizado!' : 'Login realizado!');
      navigate(role === 'professional' ? '/dashboard/profissional' : '/dashboard/cliente');
    } catch (error) {
      setErrorMessage(parseApiError(error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container-page grid min-h-[calc(100vh-3.5rem)] items-start gap-8 py-6 sm:min-h-[calc(100vh-4.5rem)] sm:items-center sm:gap-10 sm:py-10 lg:grid-cols-2 lg:py-16">
      <div className="hidden lg:block">
        <div className="relative overflow-hidden rounded-4xl">
          <img
            src={BRAND.authImage}
            alt="Ambiente acolhedor de lar e família"
            className="h-64 w-full rounded-4xl object-cover shadow-premium lg:h-[28rem]"
          />
        </div>
        <span className="eyebrow mt-8">Acesso seguro</span>
        <h1 className="heading-display mt-6">
          {isRegister ? 'Comece na' : 'Bem-vindo à'} {BRAND.name}
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted">{BRAND.tagline}</p>
        <ul className="mt-8 space-y-4">
          {['Autenticação protegida', 'Profissionais verificados', 'Processo humanizado'].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm font-semibold text-ink-muted">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-100 text-brand-600">
                <FiShield />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="card-elevated mx-auto w-full max-w-md p-5 sm:p-8">
        <div className="trust-banner mb-5 lg:hidden">
          <FiShield className="mt-0.5 shrink-0 text-brand-600" />
          <div>
            <p className="font-semibold text-brand-800 dark:text-brand-200">Acesso seguro</p>
            <p className="mt-0.5 text-xs text-muted">{BRAND.tagline}</p>
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-brand-700 dark:text-white">
          {isRegister ? 'Criar conta' : 'Entrar'}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {isRegister ? 'Cadastre-se em poucos passos.' : 'Acesse sua conta para continuar.'}
        </p>

        {errorMessage && <div className="alert-error mt-4">{errorMessage}</div>}

        <p className="form-label mt-5">Eu sou</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setRole('client');
              setErrorMessage('');
            }}
            className={role === 'client' ? 'filter-chip filter-chip-active' : 'filter-chip'}
          >
            Cliente
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('professional');
              setErrorMessage('');
            }}
            className={role === 'professional' ? 'filter-chip filter-chip-active' : 'filter-chip'}
          >
            Profissional
          </button>
        </div>

        {isRegister && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="form-label" htmlFor="auth-name">
                Nome completo
              </label>
              <input
                id="auth-name"
                name="name"
                className="input"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMessage('');
                }}
                required
              />
            </div>

            <DocumentRegistrationFields
              documentType={documentType}
              documentNumber={documentNumber}
              onDocumentTypeChange={(value) => {
                setDocumentType(value);
                setDocumentNumber('');
                setErrorMessage('');
              }}
              onDocumentNumberChange={(value) => {
                setDocumentNumber(value);
                setErrorMessage('');
              }}
            />
          </div>
        )}

        {isRegister && role === 'professional' && (
          <div className="mt-4">
            <ProfessionalOnboardingFields value={professionalData} onChange={setProfessionalData} />
          </div>
        )}

        <label className="form-label mt-5" htmlFor="auth-email">
          E-mail
        </label>
        <div className="relative">
          <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-light" />
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            className="input pl-11"
            placeholder="voce@email.com"
            onChange={() => setErrorMessage('')}
          />
        </div>

        <label className="form-label mt-4" htmlFor="auth-password">
          Senha
        </label>
        <div className="relative">
          <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-light" />
          <input
            id="auth-password"
            name="password"
            type="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            className="input pl-11"
            placeholder="Mínimo 6 caracteres"
            onChange={() => setErrorMessage('')}
          />
        </div>
        <p className="form-hint">Use pelo menos 6 caracteres.</p>

        <button disabled={loading} className="btn-primary mt-6 w-full">
          {loading ? 'Carregando...' : isRegister ? 'Criar conta' : 'Entrar'}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsRegister(!isRegister);
            setErrorMessage('');
          }}
          className="btn-ghost mt-3 w-full"
        >
          {isRegister ? 'Já tenho conta' : 'Criar cadastro'}
        </button>
      </form>
    </section>
  );
}

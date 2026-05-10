import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { UserRole } from '../types';

export default function Auth() {
  const [role, setRole] = useState<UserRole>('client');
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') ?? '');
    const password = String(data.get('password') ?? '');
    if (!email.includes('@') || password.length < 4) return toast('Informe um e-mail válido e senha com 4+ caracteres.');
    await login(email, password, role);
    toast(isRegister ? 'Cadastro realizado!' : 'Login realizado!');
    navigate(role === 'professional' ? '/dashboard/profissional' : '/dashboard/cliente');
  }

  return <section className="container-page grid min-h-[calc(100vh-80px)] items-center gap-10 py-10 lg:grid-cols-2"><div><h1 className="text-5xl font-extrabold tracking-tight">Entre na sua conta ou comece agora.</h1><p className="mt-5 text-lg text-slate-500">Autenticação simulada pronta para evoluir para JWT com FastAPI.</p></div><form onSubmit={handleSubmit} className="card mx-auto w-full max-w-md p-6 shadow-premium"><h2 className="text-2xl font-bold">{isRegister ? 'Criar conta' : 'Login'}</h2><div className="mt-5 grid grid-cols-2 gap-3"><button type="button" onClick={() => setRole('client')} className={role === 'client' ? 'btn-primary' : 'btn-secondary'}>Cliente</button><button type="button" onClick={() => setRole('professional')} className={role === 'professional' ? 'btn-primary' : 'btn-secondary'}>Profissional</button></div>{isRegister && <input className="input mt-4" placeholder="Nome completo" required />}<label className="mt-5 block text-sm font-semibold">E-mail</label><div className="relative mt-2"><FiMail className="absolute left-4 top-4 text-slate-400" /><input name="email" className="input pl-11" placeholder="voce@email.com" /></div><label className="mt-4 block text-sm font-semibold">Senha</label><div className="relative mt-2"><FiLock className="absolute left-4 top-4 text-slate-400" /><input name="password" type="password" className="input pl-11" placeholder="••••••" /></div><button className="btn-primary mt-6 w-full">Continuar</button><button type="button" onClick={() => setIsRegister(!isRegister)} className="mt-4 w-full text-sm font-bold text-brand-600">{isRegister ? 'Já tenho conta' : 'Criar cadastro separado'}</button></form></section>;
}

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { User, UserRole } from '../types';

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('auth:user');
    return saved ? JSON.parse(saved) : null;
  });

  async function login(email: string, _password: string, role: UserRole) {
    const session: User = {
      id: crypto.randomUUID(),
      name: role === 'professional' ? 'Profissional Demo' : 'Cliente Demo',
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
    };
    localStorage.setItem('auth:user', JSON.stringify(session));
    setUser(session);
  }

  function logout() {
    localStorage.removeItem('auth:user');
    setUser(null);
  }

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

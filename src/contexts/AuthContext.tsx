import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { loginUser, registerUser, RegisterData } from '../services/authService';
import { User, UserRole } from '../types';

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    role: UserRole,
    isRegister: boolean,
    name?: string,
    professionalData?: Omit<RegisterData, 'name' | 'email' | 'password' | 'role'>
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('auth:user');
    return saved ? JSON.parse(saved) : null;
  });

  async function login(
    email: string,
    password: string,
    role: UserRole,
    isRegister = false,
    name?: string,
    professionalData?: Omit<RegisterData, 'name' | 'email' | 'password' | 'role'>
  ) {
    const response = isRegister
      ? await registerUser({ name: name ?? '', email, password, role, ...professionalData })
      : await loginUser(email, password);

    localStorage.setItem('auth:token', response.access_token);
    localStorage.setItem('auth:user', JSON.stringify(response.user));
    setUser(response.user);
  }

  function logout() {
    localStorage.removeItem('auth:token');
    localStorage.removeItem('auth:user');
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

import axios, { AxiosError } from 'axios';

/** URL pública do backend (Render). Usada quando VITE_API_URL não está no build. */
export const PRODUCTION_API_ORIGIN = 'https://zola-back.onrender.com';

/** Garante sufixo /api/v1 (Render e local usam esse prefixo). */
export function normalizeApiBaseUrl(raw?: string): string {
  const fallback = import.meta.env.PROD
    ? `${PRODUCTION_API_ORIGIN}/api/v1`
    : 'http://localhost:8000/api/v1';
  const base = (raw?.trim() || fallback).replace(/\/$/, '');

  if (base.endsWith('/api/v1')) {
    return base;
  }

  return `${base}/api/v1`;
}

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 7000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth:token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status ?? 0;
    const detail = error.response?.data?.detail;

    if (status === 401) {
      localStorage.removeItem('auth:token');
      localStorage.removeItem('auth:user');
    }

    const message =
      status === 401
        ? 'Sessão expirada. Faça login novamente.'
        : detail ||
      (status === 404
        ? `Rota não encontrada (${API_BASE_URL}). Confira se o backend FastAPI está rodando.`
        : error.response?.statusText) ||
      (error.code === 'ECONNABORTED'
        ? 'A requisição demorou demais. Tente novamente.'
        : `Não foi possível conectar à API (${API_BASE_URL}). Verifique se o backend está em execução.`);

    return Promise.reject({
      ...error,
      apiError: {
        status: error.response?.status ?? 0,
        message,
      },
    });
  }
);

export type ApiError = {
  status: number;
  message: string;
};

export function parseApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError & { apiError?: ApiError };

    if (axiosError.apiError) {
      return axiosError.apiError;
    }

    return {
      status: axiosError.response?.status ?? 0,
      message:
        axiosError.response?.data?.detail
        || axiosError.response?.statusText
        || axiosError.message
        || 'Erro inesperado ao conectar com o servidor.',
    };
  }

  return {
    status: 0,
    message: 'Erro inesperado. Tente novamente.',
  };
}

import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
    const message = error.response?.data?.detail
      || error.response?.statusText
      || (error.code === 'ECONNABORTED'
        ? 'A requisição demorou demais. Tente novamente.'
        : 'Não foi possível conectar à API. Verifique sua internet.');

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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { parseApiError } from "../services/api";
import {
  emptyProfessionalOnboarding,
  ProfessionalOnboardingFields,
} from "../components/professionals/ProfessionalOnboardingFields";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "client" as "client" | "professional",
  });
  const [professionalData, setProfessionalData] = useState(emptyProfessionalOnboarding());

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (form.role === "professional") {
      if (!professionalData.city || !professionalData.state || !professionalData.title || !professionalData.description) {
        return setErrorMessage("Preencha os dados do perfil e as especificações da vaga.");
      }
    }

    try {
      setLoading(true);

      const data = await registerUser({
        ...form,
        ...(form.role === "professional"
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

      localStorage.setItem("auth:token", data.access_token);
      localStorage.setItem("auth:user", JSON.stringify(data.user));
      setSuccessMessage("Cadastro realizado com sucesso!");
      navigate(form.role === "professional" ? "/dashboard/profissional" : "/");
    } catch (error) {
      const parsedError = parseApiError(error);
      setErrorMessage(parsedError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 space-y-5"
      >
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Criar conta</h1>
        <p className="text-sm text-slate-500">
          Profissionais: escolha diarista, babá ou montador de móveis e informe as especificações.
        </p>

        {errorMessage && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        )}

        <input
          className="input"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            setErrorMessage("");
          }}
          required
        />

        <input
          className="input"
          placeholder="E-mail"
          type="email"
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
            setErrorMessage("");
          }}
          required
        />

        <input
          className="input"
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
            setErrorMessage("");
          }}
          required
        />

        <select
          className="input"
          value={form.role}
          onChange={(e) => {
            setForm({
              ...form,
              role: e.target.value as "client" | "professional",
            });
            setErrorMessage("");
          }}
        >
          <option value="client">Sou cliente</option>
          <option value="professional">Sou profissional</option>
        </select>

        {form.role === "professional" && (
          <ProfessionalOnboardingFields value={professionalData} onChange={setProfessionalData} />
        )}

        <button
          disabled={loading}
          className="w-full bg-emerald-600 text-white rounded-xl py-3 font-semibold hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

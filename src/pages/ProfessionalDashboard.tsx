import { useEffect, useState } from "react";
import { FiCamera, FiDollarSign, FiStar, FiTool, FiTrendingUp } from "react-icons/fi";
import { uploadImage } from "../services/uploadService";
import { getMyProfessional, updateProfessional } from "../services/professionalService";
import { getMyRequests } from "../services/requestService";
import { Professional, ProfessionalType, WeeklyAvailability } from "../types";
import { AvailabilityEditor } from "../components/availability/AvailabilityEditor";
import {
  DEFAULT_WEEKLY_AVAILABILITY,
  getSpecFields,
  PROFESSIONAL_TYPE_LABELS,
  PROFESSIONAL_TYPES,
} from "../constants/professionalSpecs";

type RequestItem = {
  id: number;
  title: string;
  status: string;
  created_at: string;
};

export default function ProfessionalDashboard() {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [stateUf, setStateUf] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [professionalType, setProfessionalType] = useState<ProfessionalType>("diarista");
  const [jobSpecs, setJobSpecs] = useState<Record<string, unknown>>({});
  const [availability, setAvailability] = useState<WeeklyAvailability>(DEFAULT_WEEKLY_AVAILABILITY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getMyProfessional();
        setProfessional(data);
        setTitle(data.title ?? "");
        setDescription(data.description ?? "");
        const [loadedCity, loadedState] = data.location.split(", ");
        setCity(loadedCity ?? "");
        setStateUf(loadedState ?? "");
        setPriceFrom(data.price?.toString() ?? "");
        setProfessionalType(data.professionalType ?? "diarista");
        setJobSpecs(data.jobSpecs ?? {});
        setAvailability(data.availability ?? DEFAULT_WEEKLY_AVAILABILITY);
        setPhotoUrl(data.cover ?? "");

        const requestData = await getMyRequests();
        setRequests(requestData);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await uploadImage(file);
      setPhotoUrl(data.url);
      alert("Imagem enviada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar imagem");
    }
  }

  async function handleSave() {
    if (!professional) return;

    setSaving(true);

    try {
      const payload = {
        title,
        description,
        city,
        state: stateUf,
        price_from: priceFrom ? parseFloat(priceFrom) : undefined,
        whatsapp,
        image: photoUrl || undefined,
        professional_type: professionalType,
        job_specs: jobSpecs,
        availability,
      };

      const updated = await updateProfessional(Number(professional.id), payload);
      setProfessional(updated);
      alert("Perfil salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar o perfil. Veja o console para mais detalhes.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="container-page py-10">Carregando perfil...</div>;
  }

  const specFields = getSpecFields(professionalType);
  const totalRequests = requests.length;
  const completedRequests = requests.filter((request) => request.status === "done").length;
  const totalRevenue = requests.reduce((sum) => sum + 0, 0);

  return (
    <section>
      <h1 className="text-3xl font-extrabold">Dashboard do Profissional</h1>
      <p className="mt-2 text-slate-500">
        Gerencie seu perfil de {PROFESSIONAL_TYPE_LABELS[professionalType]}, especificações e agenda semanal.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {[
          { label: "Pedidos recebidos", value: totalRequests.toString(), icon: FiTool },
          { label: "Serviços concluídos", value: completedRequests.toString(), icon: FiTrendingUp },
          { label: "Avaliação média", value: (professional?.rating ?? 0).toFixed(1), icon: FiStar },
          { label: "Ganhos", value: `R$ ${totalRevenue.toFixed(0)}`, icon: FiDollarSign },
        ].map((card) => (
          <div className="card p-6" key={card.label}>
            <card.icon className="text-3xl text-brand-600" />
            <strong className="mt-4 block text-3xl">{card.value}</strong>
            <span className="text-sm text-slate-500">{card.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="space-y-8">
          <div className="card p-6">
            <h2 className="text-xl font-bold">Agenda semanal</h2>
            <p className="mt-1 text-sm text-slate-500">
              Marque os horários em que você está disponível. Clientes verão isso no seu perfil.
            </p>
            <div className="mt-4">
              <AvailabilityEditor value={availability} onChange={setAvailability} />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold">Pedidos recebidos</h2>
            <div className="mt-4 space-y-3">
              {requests.length === 0 && <p className="text-slate-500">Nenhum pedido recebido ainda.</p>}
              {requests.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <div>
                    <strong>{order.title}</strong>
                    <p className="text-sm text-slate-500">{new Date(order.created_at).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-bold text-brand-700">{order.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="card p-6">
          <h2 className="text-xl font-bold">Editar perfil</h2>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {PROFESSIONAL_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setProfessionalType(type)}
                className={
                  professionalType === type
                    ? "rounded-2xl bg-brand-600 py-2 text-sm font-bold text-white"
                    : "rounded-2xl border border-slate-200 py-2 text-sm font-semibold dark:border-slate-700"
                }
              >
                {PROFESSIONAL_TYPE_LABELS[type]}
              </button>
            ))}
          </div>

          {photoUrl ? (
            <img src={photoUrl} alt="Foto do profissional" className="mx-auto mt-4 h-32 w-32 rounded-full object-cover" />
          ) : (
            <div className="mx-auto mt-4 flex h-32 w-32 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              Sem imagem
            </div>
          )}

          <input className="input mt-4" placeholder="Título do serviço" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="input mt-3 h-28" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div className="mt-4 space-y-3">
            <p className="text-sm font-bold">Especificações da vaga</p>
            {specFields.map((field) => {
              const current = jobSpecs[field.key];
              if (field.type === "boolean") {
                return (
                  <label key={field.key} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={Boolean(current)}
                      onChange={(e) => setJobSpecs({ ...jobSpecs, [field.key]: e.target.checked })}
                    />
                    {field.label}
                  </label>
                );
              }
              if (field.type === "select") {
                return (
                  <select
                    key={field.key}
                    className="input"
                    value={String(current ?? field.options[0])}
                    onChange={(e) => setJobSpecs({ ...jobSpecs, [field.key]: e.target.value })}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                );
              }
              if (field.type === "multiselect") {
                const selected = Array.isArray(current) ? current : [];
                return (
                  <div key={field.key}>
                    <p className="mb-2 text-sm font-semibold">{field.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {field.options.map((option) => {
                        const active = selected.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              const next = active
                                ? selected.filter((item) => item !== option)
                                : [...selected, option];
                              setJobSpecs({ ...jobSpecs, [field.key]: next });
                            }}
                            className={
                              active
                                ? "rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white"
                                : "rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold dark:border-slate-700"
                            }
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return (
                <input
                  key={field.key}
                  className="input"
                  type="number"
                  placeholder={field.label}
                  value={current === undefined ? "" : String(current)}
                  onChange={(e) => setJobSpecs({ ...jobSpecs, [field.key]: Number(e.target.value) })}
                />
              );
            })}
          </div>

          <div className="grid gap-3 mt-4">
            <input className="input" placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} />
            <input className="input" placeholder="Estado (SP, RJ, etc)" value={stateUf} onChange={(e) => setStateUf(e.target.value.toUpperCase())} />
            <input className="input" placeholder="Preço a partir" value={priceFrom} type="number" onChange={(e) => setPriceFrom(e.target.value)} />
            <input className="input" placeholder="WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          </div>

          <label className="mt-4 grid cursor-pointer place-items-center rounded-3xl border-2 border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
            <FiCamera className="text-4xl text-brand-600" />
            <span className="mt-2 font-semibold">Upload de imagem</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
          </label>

          <button className="btn-primary mt-5 w-full" type="button" onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </aside>
      </div>
    </section>
  );
}

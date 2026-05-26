import { useEffect, useState } from 'react';
import { FiClock, FiHeart, FiStar } from 'react-icons/fi';
import { getMyRequests } from '../services/requestService';

type RequestItem = {
  id: number;
  title: string;
  status: string;
  professional_id: number | null;
  budget: number | null;
};

export default function ClientDashboard() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyRequests()
      .then(setRequests)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalRequests = requests.length;
  const pendingRequests = requests.filter((request) => request.status === 'pending').length;
  const inProgressRequests = requests.filter((request) => request.status === 'in_progress').length;

  return (
    <section className="container-page py-10">
      <h1 className="heading-page">Dashboard do Cliente</h1>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[
          { label: 'Pedidos realizados', value: totalRequests.toString(), icon: FiClock },
          { label: 'Pedidos em andamento', value: inProgressRequests.toString(), icon: FiHeart },
          { label: 'Aguardando atendimento', value: pendingRequests.toString(), icon: FiStar },
        ].map((card) => (
          <div className="stat-card" key={card.label}>
            <card.icon className="text-3xl text-brand-600" />
            <strong className="mt-4 block text-3xl">{card.value}</strong>
            <span className="text-sm text-slate-500">{card.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="card p-6">
          <h2 className="text-xl font-bold">Histórico de pedidos</h2>

          <div className="mt-4 space-y-3">
            {loading && <p className="text-slate-500">Carregando pedidos...</p>}
            {!loading && requests.length === 0 && <p className="text-slate-500">Nenhum pedido encontrado.</p>}
            {!loading && requests.map((request) => (
              <div key={request.id} className="list-row">
                <strong>{request.title}</strong>
                <p className="text-sm text-slate-500">
                  Profissional #{request.professional_id ?? 'aguardando'} • R$ {request.budget ?? 0}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

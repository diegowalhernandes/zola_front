import { useEffect, useState } from 'react';
import { FiCalendar, FiClock, FiStar } from 'react-icons/fi';
import { getMyAppointments } from '../services/appointmentService';
import { getMyRequests } from '../services/requestService';
import { AppointmentItem } from '../types';

type RequestItem = {
  id: number;
  title: string;
  status: string;
  professional_id: number | null;
  budget: number | null;
};

export default function ClientDashboard() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyRequests(), getMyAppointments()])
      .then(([requestData, appointmentData]) => {
        setRequests(requestData);
        setAppointments(appointmentData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalRequests = requests.length;
  const pendingRequests = requests.filter((request) => request.status === 'pending').length;
  const confirmedAppointments = appointments.filter((item) => item.status === 'confirmed').length;

  return (
    <section className="container-page py-10">
      <h1 className="heading-page">Dashboard do Cliente</h1>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[
          { label: 'Pedidos realizados', value: totalRequests.toString(), icon: FiClock },
          { label: 'Agendamentos confirmados', value: confirmedAppointments.toString(), icon: FiCalendar },
          { label: 'Aguardando atendimento', value: pendingRequests.toString(), icon: FiStar },
        ].map((card) => (
          <div className="stat-card" key={card.label}>
            <card.icon className="text-3xl text-brand-600" />
            <strong className="mt-4 block text-3xl">{card.value}</strong>
            <span className="text-sm text-slate-500">{card.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-bold">Meus agendamentos</h2>
          <div className="mt-4 space-y-3">
            {loading && <p className="text-slate-500">Carregando...</p>}
            {!loading && appointments.length === 0 && (
              <p className="text-slate-500">Nenhum agendamento ainda.</p>
            )}
            {!loading &&
              appointments.map((item) => (
                <div key={item.id} className="list-row">
                  <strong>
                    {item.professional_name ?? `Profissional #${item.professional_id}`}
                  </strong>
                  <p className="text-sm text-slate-500">
                    {new Date(`${item.appointment_date}T12:00:00`).toLocaleDateString('pt-BR')} às{' '}
                    {item.time_slot} · {item.status}
                    {item.deposit_paid ? ` · sinal ${item.deposit_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : ''}
                  </p>
                </div>
              ))}
          </div>
        </div>

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

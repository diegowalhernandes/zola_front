import { useEffect, useState } from 'react';
import { FiCalendar, FiClock, FiStar } from 'react-icons/fi';
import { getMyAppointments } from '../services/appointmentService';
import { getMyRequests } from '../services/requestService';
import { AppointmentItem } from '../types';
import { formatSlotLabel } from '../constants/professionalSpecs';

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
    <section className="container-page py-5 sm:py-10">
      <header className="page-header">
        <h1 className="heading-page">Dashboard do Cliente</h1>
        <p className="text-sm text-muted">Acompanhe agendamentos e pedidos em um só lugar.</p>
      </header>

      <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-5">
        {[
          { label: 'Pedidos realizados', value: totalRequests.toString(), icon: FiClock },
          { label: 'Agendamentos confirmados', value: confirmedAppointments.toString(), icon: FiCalendar },
          { label: 'Aguardando atendimento', value: pendingRequests.toString(), icon: FiStar },
        ].map((card) => (
          <div className="stat-card text-left sm:text-center" key={card.label}>
            <card.icon className="text-2xl text-brand-600 sm:mx-auto sm:text-3xl" />
            <strong className="mt-3 block text-2xl font-display sm:mt-4 sm:text-3xl">{card.value}</strong>
            <span className="text-xs text-muted sm:text-sm">{card.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-2 lg:gap-8">
        <div className="section-card">
          <h2 className="section-card-title">Meus agendamentos</h2>
          <div className="mt-4 space-y-3">
            {loading && <p className="mt-4 text-sm text-muted">Carregando...</p>}
            {!loading && appointments.length === 0 && (
              <p className="mt-4 text-sm text-muted">Nenhum agendamento ainda.</p>
            )}
            {!loading &&
              appointments.map((item) => (
                <div key={item.id} className="list-row-interactive mt-3 first:mt-4">
                  <strong>
                    {item.professional_name ?? `Profissional #${item.professional_id}`}
                  </strong>
                  <p className="text-sm text-muted">
                    {new Date(`${item.appointment_date}T12:00:00`).toLocaleDateString('pt-BR')}
                    {formatSlotLabel(item.time_slot).includes(':')
                      ? ` às ${formatSlotLabel(item.time_slot)}`
                      : ` · ${formatSlotLabel(item.time_slot)}`}{' '}
                    · {item.status}
                    {item.deposit_paid ? ` · sinal ${item.deposit_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : ''}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-card-title">Histórico de pedidos</h2>

          <div className="mt-4 space-y-3">
            {loading && <p className="text-sm text-muted">Carregando pedidos...</p>}
            {!loading && requests.length === 0 && <p className="text-sm text-muted">Nenhum pedido encontrado.</p>}
            {!loading && requests.map((request) => (
              <div key={request.id} className="list-row-interactive">
                <strong>{request.title}</strong>
                <p className="text-sm text-muted">
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

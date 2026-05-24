import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMapPin, FiMessageCircle } from 'react-icons/fi';
import { getProfessional } from '../services/professionalService';
import { getReviews } from '../services/reviewService';
import { Professional, Review } from '../types';
import { Rating } from '../components/common/Rating';
import { useToast } from '../contexts/ToastContext';
import { JobSpecsDisplay } from '../components/professionals/JobSpecsDisplay';
import { AvailabilityCalendar } from '../components/availability/AvailabilityCalendar';
import { PROFESSIONAL_TYPE_LABELS } from '../constants/professionalSpecs';

export default function ProfessionalProfile() {
  const { id = '' } = useParams();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function loadProfile() {
      if (!id) return;

      try {
        const profile = await getProfessional(Number(id));
        setProfessional(profile);

        const backendReviews = await getReviews(Number(id));
        setReviews(
          backendReviews.map((review) => ({
            id: String(review.id),
            professionalId: String(review.professional_id),
            clientName: review.client_name,
            avatar: 'https://placehold.co/100x100?text=Cliente',
            rating: review.rating,
            comment: review.comment,
            date: new Date(review.created_at).toLocaleDateString('pt-BR'),
          }))
        );
      } catch (error) {
        console.error(error);
      }
    }

    loadProfile();
  }, [id]);

  if (!professional) return <div className="container-page py-20"><div className="card h-96 animate-pulse" /></div>;

  const typeLabel = professional.professionalType
    ? PROFESSIONAL_TYPE_LABELS[professional.professionalType]
    : professional.category;

  return (
    <section className="container-page py-10">
      <div className="card overflow-hidden">
        <img src={professional.cover} alt="" className="h-72 w-full object-cover" />

        <div className="p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex gap-5">
              <img src={professional.avatar} alt="" className="-mt-16 h-28 w-28 rounded-3xl object-cover ring-8 ring-white dark:ring-slate-900" />
              <div>
                <h1 className="text-3xl font-extrabold">{professional.name}</h1>
                <p className="font-semibold text-brand-600">{typeLabel}</p>
                <Rating value={professional.rating} count={professional.reviewsCount} />
                <p className="mt-2 flex items-center gap-1 text-slate-500"><FiMapPin /> {professional.location}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => toast('Contato solicitado com sucesso!')} className="btn-primary"><FiMessageCircle /> Contatar</button>
              <a className="btn-secondary" href="https://wa.me/5500000000000" target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp</a>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-slate-600 dark:text-slate-300">{professional.description}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <div className="card p-6">
            <h2 className="text-2xl font-bold">Especificações da vaga</h2>
            <p className="mt-1 text-sm text-slate-500">
              Detalhes informados pelo profissional para {typeLabel.toLowerCase()}.
            </p>
            <div className="mt-5">
              <JobSpecsDisplay type={professional.professionalType} specs={professional.jobSpecs} />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold">Agenda e disponibilidade</h2>
            <p className="mt-1 text-sm text-slate-500">
              Escolha um dia e horário livre para solicitar o atendimento.
            </p>
            <div className="mt-5">
              <AvailabilityCalendar
                professionalId={Number(professional.id)}
                professionalName={professional.name}
              />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold">Galeria</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {professional.gallery.length > 0 ? (
                professional.gallery.map((image) => (
                  <img key={image} src={image} alt="" className="h-56 rounded-3xl object-cover" />
                ))
              ) : (
                <p className="text-sm text-slate-500">Nenhuma foto adicionada ainda.</p>
              )}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold">Avaliações</h2>
            <div className="mt-5 space-y-4">
              {reviews.length === 0 && (
                <p className="text-sm text-slate-500">Ainda não há avaliações para este profissional.</p>
              )}
              {reviews.map((review) => (
                <div key={review.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <strong>{review.clientName}</strong>
                    <Rating value={review.rating} />
                  </div>
                  <p className="mt-3 text-slate-600 dark:text-slate-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card h-max p-6">
            <h2 className="text-xl font-bold">Resumo</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-slate-500">Tipo</span>
                <strong>{typeLabel}</strong>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">A partir de</span>
                <strong>R$ {professional.price}</strong>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Local</span>
                <strong>{professional.location}</strong>
              </li>
            </ul>
            <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
              {professional.availableToday ? 'Disponível hoje' : 'Consulte a agenda ao lado'}
            </div>
          </div>

          <div className="card h-max p-6">
            <h2 className="text-xl font-bold">Localização no mapa</h2>
            <div className="mt-4 grid h-72 place-items-center rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 text-center text-slate-600 dark:from-slate-800 dark:to-slate-700 dark:text-slate-300">
              <FiMapPin className="mx-auto mb-2 text-4xl text-brand-600" />
              Mapa simulado<br />
              {professional.location}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

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
    <section className="container-page py-5 sm:py-10">
      <div className="card overflow-hidden">
        <img src={professional.cover} alt="" className="h-48 w-full object-cover sm:h-64 lg:h-72" />

        <div className="p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
              <img
                src={professional.avatar}
                alt=""
                className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-4 ring-white sm:-mt-12 sm:h-24 sm:w-24 lg:-mt-16 lg:h-28 lg:w-28 lg:rounded-3xl dark:ring-slate-900"
              />
              <div className="min-w-0">
                <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{professional.name}</h1>
                <p className="font-semibold text-brand-600">{typeLabel}</p>
                <Rating value={professional.rating} count={professional.reviewsCount} />
                <p className="mt-2 flex items-center gap-1 text-sm text-muted">
                  <FiMapPin className="shrink-0" /> {professional.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button onClick={() => toast('Contato solicitado com sucesso!')} className="btn-primary w-full sm:w-auto">
                <FiMessageCircle /> Contatar
              </button>
              <a className="btn-secondary w-full sm:w-auto" href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted sm:mt-8 sm:text-base">{professional.description}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[1fr_360px] lg:gap-8">
        <div className="space-y-6 lg:space-y-8">
          <div className="section-card">
            <h2 className="section-card-title">Especificações da vaga</h2>
            <p className="section-card-subtitle">
              Detalhes informados pelo profissional para {typeLabel.toLowerCase()}.
            </p>
            <div className="mt-5">
              <JobSpecsDisplay type={professional.professionalType} specs={professional.jobSpecs} />
            </div>
          </div>

          <div className="section-card">
            <h2 className="section-card-title">Agenda e disponibilidade</h2>
            <p className="section-card-subtitle">
              Escolha um dia e horário livre para solicitar o atendimento.
            </p>
            <div className="mt-5">
              <AvailabilityCalendar
                professionalId={Number(professional.id)}
                professionalName={professional.name}
              />
            </div>
          </div>

          <div className="section-card">
            <h2 className="section-card-title">Galeria</h2>
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

          <div className="section-card">
            <h2 className="section-card-title">Avaliações</h2>
            <div className="mt-5 space-y-3">
              {reviews.length === 0 && (
                <p className="text-sm text-muted">Ainda não há avaliações para este profissional.</p>
              )}
              {reviews.map((review) => (
                <div key={review.id} className="list-row">
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <strong>{review.clientName}</strong>
                    <Rating value={review.rating} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5 lg:space-y-6">
          <div className="section-card lg:sticky lg:top-24">
            <h2 className="section-card-title">Resumo</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between gap-4">
                <span className="text-muted">Tipo</span>
                <strong className="text-right">{typeLabel}</strong>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-muted">A partir de</span>
                <strong className="price-tag">R$ {professional.price}</strong>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-muted">Local</span>
                <strong className="text-right">{professional.location}</strong>
              </li>
            </ul>
            <div className="mt-5 rounded-xl bg-brand-50 p-4 text-sm font-semibold text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
              {professional.availableToday ? 'Disponível hoje' : 'Consulte a agenda ao lado'}
            </div>
          </div>

          <div className="section-card hidden lg:block">
            <h2 className="section-card-title">Localização no mapa</h2>
            <div className="mt-4 grid h-56 place-items-center rounded-2xl bg-cream-200 text-center text-sm text-muted dark:from-slate-800 dark:to-slate-700 lg:h-72">
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

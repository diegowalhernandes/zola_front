import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMapPin, FiMessageCircle } from 'react-icons/fi';
import { fakeApi } from '../services/api';
import { Professional, Review } from '../types';
import { Rating } from '../components/common/Rating';
import { useToast } from '../contexts/ToastContext';

export default function ProfessionalProfile() {
  const { id = '' } = useParams();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fakeApi.getProfessional(id).then(setProfessional);
    fakeApi.getReviews(id).then(setReviews);
  }, [id]);

  if (!professional) return <div className="container-page py-20"><div className="card h-96 animate-pulse" /></div>;

  return <section className="container-page py-10"><div className="card overflow-hidden"><img src={professional.cover} className="h-72 w-full object-cover" /><div className="p-6 lg:p-8"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div className="flex gap-5"><img src={professional.avatar} className="-mt-16 h-28 w-28 rounded-3xl object-cover ring-8 ring-white dark:ring-slate-900" /><div><h1 className="text-3xl font-extrabold">{professional.name}</h1><p className="font-semibold text-brand-600">{professional.category}</p><Rating value={professional.rating} count={professional.reviewsCount} /><p className="mt-2 flex items-center gap-1 text-slate-500"><FiMapPin /> {professional.location}</p></div></div><div className="flex flex-wrap gap-3"><button onClick={() => toast('Contato solicitado com sucesso!')} className="btn-primary"><FiMessageCircle /> Contatar</button><a className="btn-secondary" href="https://wa.me/5500000000000" target="_blank"><FaWhatsapp /> WhatsApp</a></div></div><p className="mt-8 max-w-3xl text-slate-600 dark:text-slate-300">{professional.description}</p></div></div><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"><div className="space-y-8"><div className="card p-6"><h2 className="text-2xl font-bold">Serviços oferecidos</h2><div className="mt-5 flex flex-wrap gap-3">{professional.services.map((service) => <span key={service} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">{service}</span>)}</div></div><div className="card p-6"><h2 className="text-2xl font-bold">Galeria</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{professional.gallery.map((image) => <img key={image} src={image} className="h-56 rounded-3xl object-cover" />)}</div></div><div className="card p-6"><h2 className="text-2xl font-bold">Avaliações</h2><div className="mt-5 space-y-4">{reviews.map((review) => <div key={review.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div className="flex items-center gap-3"><img src={review.avatar} className="h-10 w-10 rounded-full object-cover" /><strong>{review.clientName}</strong><Rating value={review.rating} /></div><p className="mt-3 text-slate-600 dark:text-slate-300">{review.comment}</p></div>)}</div></div></div><aside className="card h-max p-6"><h2 className="text-xl font-bold">Localização no mapa</h2><div className="mt-4 grid h-72 place-items-center rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 text-center text-slate-600 dark:from-slate-800 dark:to-slate-700 dark:text-slate-300"><FiMapPin className="mx-auto mb-2 text-4xl text-brand-600" />Mapa simulado<br />{professional.location}</div><div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">{professional.availableToday ? 'Disponível hoje' : 'Agenda sob consulta'}</div></aside></div></section>;
}

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiHeart,
  FiHome,
} from 'react-icons/fi';
import { HeroBanner } from '../components/home/HeroBanner';
import { BRAND } from '../design/brand';
import { getProfessionals } from '../services/professionalService';
import { Professional } from '../types';
import { resolveMediaUrl } from '../utils/mediaUrl';

export default function Home() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  function getCategoryName(category?: string) {
    return category || 'Serviços gerais';
  }

  useEffect(() => {
    async function loadProfessionals() {
      try {
        const data = await getProfessionals();
        setProfessionals(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao buscar profissionais:', error);
        setProfessionals([]);
      } finally {
        setLoading(false);
      }
    }

    loadProfessionals();
  }, []);

  return (
    <main className="surface-page bg-white dark:bg-navy-950">
      <HeroBanner />

      {/* COMO FUNCIONA */}
      <section className="container-page pb-14 sm:pb-20">
        <div className="section-accent-bar" />
        <h2 className="heading-section">Como funciona</h2>
        <p className="mt-2 max-w-xl text-muted">Três passos simples para contratar com tranquilidade.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              step: '1',
              title: 'Escolha o serviço',
              desc: 'Diarista ou babá — filtre por local e avaliação.',
              gradient: 'bg-gradient-brand',
            },
            {
              step: '2',
              title: 'Compare e converse',
              desc: 'Veja perfil, especificações e horários livres.',
              gradient: 'bg-gradient-sage',
            },
            {
              step: '3',
              title: 'Agende com confiança',
              desc: 'Marque no calendário e acompanhe o pedido.',
              gradient: 'bg-gradient-accent',
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`step-card-vivid ${item.gradient}`}
            >
              <span className="text-4xl font-black opacity-30">{item.step}</span>
              <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section className="container-page pb-14 sm:pb-20">
        <div className="panel-dark relative overflow-hidden md:grid md:grid-cols-2 md:gap-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-400/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent-400/15 blur-3xl" aria-hidden />
          <div className="relative space-y-5">
            <p className="eyebrow border-white/10 bg-white/10 text-brand-200">Sobre a {BRAND.name}</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Tecnologia a serviço da confiança local.</h2>
            <p className="leading-relaxed text-white/85">
              Nascemos para conectar moradores e profissionais com transparência, segurança e
              experiência comparável às melhores plataformas.
            </p>
            <p className="leading-relaxed text-white/60">
              Cada perfil destaca especialidades, especificações da vaga e disponibilidade real —
              sem surpresas.
            </p>
          </div>
          <div className="relative mt-8 grid gap-4 md:mt-0">
            {[
              { title: 'Missão', text: 'Facilitar a contratação de diaristas e babás com segurança e transparência.', color: 'border-brand-400/40 bg-brand-500/10' },
              { title: 'Visão', text: 'Ser a plataforma mais confiável para serviços domésticos de limpeza e cuidado infantil.', color: 'border-accent-400/40 bg-accent-400/10' },
            ].map((block) => (
              <div key={block.title} className={`rounded-2xl border p-6 ${block.color}`}>
                <h3 className="text-lg font-semibold">{block.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIAS — conteúdo igual, visual mais vivo */}
      <section className="home-band-sage">
        <div className="container-page">
          <div className="section-accent-bar" />
          <h2 className="heading-section">Escolha o serviço ideal</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                type: 'diarista',
                title: 'Diarista',
                desc: 'Limpeza residencial, comercial e organização.',
                to: '/buscar?tipo=diarista',
                icon: FiHome,
                iconBg: 'bg-gradient-accent',
                cardClass: 'category-diarista',
              },
              {
                type: 'baba',
                title: 'Babá',
                desc: 'Cuidado infantil com perfil detalhado e turnos claros.',
                to: '/buscar?tipo=baba',
                icon: FiHeart,
                iconBg: 'bg-gradient-brand',
                cardClass: 'category-baba',
              },
            ].map((item) => (
              <Link
                key={item.type}
                to={item.to}
                className={`category-card-vivid ${item.cardClass} bg-white dark:bg-brand-900/70`}
              >
                <div className={`icon-circle ${item.iconBg}`}>
                  <item.icon />
                </div>
                <h2 className="text-xl font-bold text-brand-700 dark:text-white">{item.title}</h2>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-600 dark:text-brand-400">
                  Ver profissionais <FiArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DESTAQUES — cards de profissionais inalterados */}
      <section className="container-page py-16 sm:py-24">
        <div className="home-band-accent">
          <div className="home-band-accent-inner">
            <div className="mb-8">
              <p className="eyebrow">Destaques</p>
              <h2 className="heading-page mt-4">Profissionais disponíveis agora</h2>
            </div>

            {loading && <p className="text-muted">Carregando profissionais...</p>}
            {!loading && professionals.length === 0 && (
              <p className="text-muted">Nenhum profissional cadastrado ainda.</p>
            )}

            <div className="grid gap-6 md:grid-cols-3">
              {professionals.map((pro) => (
                <article key={pro.id} className="card-interactive overflow-hidden p-1">
                  <img
                    src={resolveMediaUrl(pro.cover || pro.avatar)}
                    alt={pro.name || 'Profissional'}
                    className="h-44 w-full rounded-xl object-cover"
                  />
                  <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-brand-700 dark:text-white">
                        {pro.name || 'Profissional'}
                      </h3>
                      <span className="badge-brand">⭐ {pro.rating || 5}</span>
                    </div>
                    <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                      {getCategoryName(pro.category)}
                    </p>
                    <p className="line-clamp-2 text-sm text-muted">
                      {pro.description || 'Profissional cadastrado na plataforma.'}
                    </p>
                    <p className="text-xs text-muted">
                      {pro.location || 'Localização não informada'}
                    </p>
                    <Link to={`/profissional/${pro.id}`} className="btn-primary mt-2 w-full">
                      Ver perfil
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

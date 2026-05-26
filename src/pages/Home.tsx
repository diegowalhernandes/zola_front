import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiStar, FiUsers } from 'react-icons/fi';
import { getProfessionals } from '../services/professionalService';
import { Professional } from '../types';
import { BRAND } from '../design/brand';

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
    <main className="surface-page">
      <section className="container-page py-12 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-graphite-200/80 bg-white p-8 shadow-premium dark:border-graphite-800/80 dark:bg-navy-900/50 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:p-12">
          <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
          <div className="relative space-y-6">
            <span className="eyebrow">Plataforma verificada</span>
            <h1 className="heading-display">
              Encontre profissionais com a confiança de um produto premium.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              {BRAND.description} Diaristas, babás, montadores e muito mais — com avaliações reais e agenda transparente.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/buscar" className="btn-primary">
                Explorar profissionais <FiArrowRight />
              </Link>
              <Link to="/login" className="btn-secondary">
                Criar conta
              </Link>
            </div>
            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {[
                { value: '+120', label: 'Profissionais', icon: FiUsers },
                { value: '4.9', label: 'Avaliação média', icon: FiStar },
                { value: '100%', label: 'Transparência', icon: FiShield },
              ].map((stat) => (
                <div key={stat.label} className="stat-card text-center">
                  <stat.icon className="mx-auto text-xl text-brand-600 dark:text-brand-400" />
                  <p className="mt-2 text-2xl font-bold text-graphite-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-10 lg:mt-0">
            <div className="gradient-panel">
              <h2 className="text-xl font-bold">Como funciona</h2>
              <ul className="mt-6 space-y-3">
                {[
                  { step: '1', title: 'Escolha o serviço', desc: 'Filtre por tipo, localização e avaliação.' },
                  { step: '2', title: 'Compare e converse', desc: 'Veja perfil, especificações e horários livres.' },
                  { step: '3', title: 'Agende com confiança', desc: 'Marque no calendário e acompanhe o pedido.' },
                ].map((item) => (
                  <li
                    key={item.step}
                    className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-200">Passo {item.step}</span>
                    <strong className="mt-1 block text-base">{item.title}</strong>
                    <p className="mt-1 text-sm text-white/80">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-12 sm:pb-20">
        <div className="panel-dark md:grid md:grid-cols-2 md:gap-10">
          <div className="space-y-5">
            <p className="eyebrow border-white/10 bg-white/5 text-brand-300">Sobre a {BRAND.name}</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Tecnologia a serviço da confiança local.</h2>
            <p className="leading-relaxed text-graphite-300">
              Nascemos para conectar moradores e profissionais com transparência, segurança e experiência comparável às melhores plataformas SaaS.
            </p>
            <p className="leading-relaxed text-graphite-400">
              Cada perfil destaca especialidades, especificações da vaga e disponibilidade real — sem surpresas.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:mt-0">
            {[
              { title: 'Missão', text: 'Facilitar contratações seguras e gerar oportunidades reais para profissionais.' },
              { title: 'Visão', text: 'Ser a plataforma mais confiável para serviços residenciais e comerciais.' },
            ].map((block) => (
              <div key={block.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">{block.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite-300">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-24">
        <div className="card-elevated p-8">
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
                  src={pro.cover || pro.avatar || 'https://placehold.co/600x400?text=Profissional'}
                  alt={pro.name || 'Profissional'}
                  className="h-44 w-full rounded-xl object-cover"
                />
                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-graphite-900 dark:text-white">{pro.name || 'Profissional'}</h3>
                    <span className="badge-brand">⭐ {pro.rating || 5}</span>
                  </div>
                  <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                    {getCategoryName(pro.category)}
                  </p>
                  <p className="line-clamp-2 text-sm text-muted">
                    {pro.description || 'Profissional cadastrado na plataforma.'}
                  </p>
                  <p className="text-xs text-muted">{pro.location || 'Localização não informada'}</p>
                  <Link to={`/profissional/${pro.id}`} className="btn-primary mt-2 w-full">
                    Ver perfil
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

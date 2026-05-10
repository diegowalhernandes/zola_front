import type { FormEvent, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaBolt, FaBroom, FaCar, FaFaucet, FaLaptopCode, FaPaintRoller, FaTools } from 'react-icons/fa';
import { FiArrowRight, FiSearch, FiShield, FiStar, FiUsers } from 'react-icons/fi';
import { categories, reviews } from '../data/mock';
import { useProfessionals } from '../hooks/useProfessionals';
import { ProfessionalCard } from '../components/professionals/ProfessionalCard';
import { SkeletonCard } from '../components/common/Skeleton';

const icons: Record<string, ReactElement> = { FaBolt: <FaBolt />, FaFaucet: <FaFaucet />, FaBroom: <FaBroom />, FaCar: <FaCar />, FaPaintRoller: <FaPaintRoller />, FaTools: <FaTools />, FaLaptopCode: <FaLaptopCode /> };

export default function Home() {
  const navigate = useNavigate();
  const { featured, loading } = useProfessionals();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    navigate(`/buscar?servico=${data.get('servico') ?? ''}&local=${data.get('local') ?? ''}`);
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-slate-100 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="rounded-full bg-brand-100 px-4 py-2 text-sm font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-100">Serviços locais confiáveis</span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-6xl">Encontre o profissional certo em poucos minutos.</h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">Compare avaliações, preços, localização e disponibilidade em uma experiência simples, rápida e premium.</p>
            <form onSubmit={handleSearch} className="mt-8 grid gap-3 rounded-3xl bg-white p-3 shadow-premium dark:bg-slate-900 sm:grid-cols-[1fr_1fr_auto]">
              <input name="servico" className="input border-0 bg-slate-50 dark:bg-slate-800" placeholder="Qual serviço você precisa?" />
              <input name="local" className="input border-0 bg-slate-50 dark:bg-slate-800" placeholder="Cidade ou bairro" />
              <button className="btn-primary"><FiSearch /> Buscar</button>
            </form>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="card overflow-hidden shadow-premium"><img className="h-[460px] w-full object-cover" src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop" alt="Profissionais locais" /></div>
            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white p-5 shadow-premium dark:bg-slate-900"><strong className="text-3xl">4.9★</strong><p className="text-sm text-slate-500">Média dos profissionais</p></div>
          </motion.div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-8 flex items-end justify-between"><div><h2 className="text-3xl font-extrabold">Categorias populares</h2><p className="text-slate-500">Serviços mais buscados na sua região.</p></div><Link to="/buscar" className="hidden font-bold text-brand-600 md:flex items-center gap-2">Ver tudo <FiArrowRight /></Link></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => <motion.div whileHover={{ y: -5 }} key={category.id} className="card p-5"><div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${category.color} text-2xl text-white`}>{icons[category.icon]}</div><h3 className="font-bold">{category.name}</h3><p className="mt-1 text-sm text-slate-500">{category.description}</p></motion.div>)}
        </div>
      </section>

      <section className="container-page py-10">
        <h2 className="text-3xl font-extrabold">Profissionais em destaque</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">{loading ? [1,2,3,4].map((i) => <SkeletonCard key={i} />) : featured.map((item) => <ProfessionalCard key={item.id} professional={item} />)}</div>
      </section>

      <section className="container-page grid gap-6 py-16 lg:grid-cols-3">
        {[{ icon: FiSearch, title: 'Busque', text: 'Informe serviço, cidade e preferências.' }, { icon: FiUsers, title: 'Compare', text: 'Veja avaliações, preço e disponibilidade.' }, { icon: FiShield, title: 'Contrate', text: 'Converse e feche com segurança.' }].map((step) => <div className="card p-8" key={step.title}><step.icon className="text-4xl text-brand-600" /><h3 className="mt-5 text-xl font-bold">{step.title}</h3><p className="mt-2 text-slate-500">{step.text}</p></div>)}
      </section>

      <section className="container-page py-12">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-premium dark:bg-brand-700 lg:p-12">
          <h2 className="text-3xl font-extrabold">Avaliações reais de clientes</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">{reviews.map((review) => <div className="rounded-3xl bg-white/10 p-6" key={review.id}><FiStar className="text-amber-400" /><p className="mt-4">“{review.comment}”</p><strong className="mt-4 block">{review.clientName}</strong></div>)}</div>
        </div>
      </section>
    </div>
  );
}

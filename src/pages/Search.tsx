import { useMemo, useState } from 'react';
import { categories } from '../data/mock';
import { useProfessionals } from '../hooks/useProfessionals';
import { ProfessionalCard } from '../components/professionals/ProfessionalCard';
import { SkeletonCard } from '../components/common/Skeleton';

export default function Search() {
  const { professionals, loading } = useProfessionals();
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('0');
  const [price, setPrice] = useState('999');

  const filtered = useMemo(() => professionals.filter((item) =>
    (!category || item.category === category) &&
    (!location || item.location.toLowerCase().includes(location.toLowerCase())) &&
    item.rating >= Number(rating) && item.price <= Number(price)
  ), [professionals, category, location, rating, price]);

  return <section className="container-page py-10"><h1 className="text-4xl font-extrabold">Buscar profissionais</h1><p className="mt-2 text-slate-500">Filtre por categoria, localização, avaliação e preço.</p><div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]"><aside className="card h-max p-5"><div className="space-y-4"><select className="input" value={category} onChange={(e) => setCategory(e.target.value)}><option value="">Todas as categorias</option>{categories.map((cat) => <option key={cat.id}>{cat.name}</option>)}</select><input className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Localização" /><select className="input" value={rating} onChange={(e) => setRating(e.target.value)}><option value="0">Todas avaliações</option><option value="4.5">4.5+</option><option value="4.8">4.8+</option></select><select className="input" value={price} onChange={(e) => setPrice(e.target.value)}><option value="999">Qualquer preço</option><option value="100">Até R$100</option><option value="150">Até R$150</option><option value="200">Até R$200</option></select></div></aside><div><div className="mb-4 flex justify-between text-sm text-slate-500"><span>{filtered.length} profissionais encontrados</span><span>Página 1 de 1</span></div><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{loading ? [1,2,3,4,5,6].map((i) => <SkeletonCard key={i} />) : filtered.map((item) => <ProfessionalCard key={item.id} professional={item} />)}</div><div className="mt-8 flex justify-center gap-2"><button className="btn-secondary">Anterior</button><button className="btn-primary">1</button><button className="btn-secondary">Próxima</button></div></div></div></section>;
}

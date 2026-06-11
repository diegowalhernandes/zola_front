import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProfessionals } from '../hooks/useProfessionals';
import { ProfessionalCard } from '../components/professionals/ProfessionalCard';
import { SkeletonCard } from '../components/common/Skeleton';
import { PROFESSIONAL_TYPE_LABELS, PROFESSIONAL_TYPES } from '../constants/professionalSpecs';

export default function Search() {
  const [searchParams] = useSearchParams();
  const tipoFromUrl = searchParams.get('tipo') || '';
  const { professionals, loading } = useProfessionals();
  const [professionalType, setProfessionalType] = useState(tipoFromUrl);
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('0');
  const [price, setPrice] = useState('999');

  useEffect(() => {
    setProfessionalType(tipoFromUrl);
  }, [tipoFromUrl]);

  const filtered = useMemo(
    () =>
      professionals.filter(
        (item) =>
          (!professionalType || item.professionalType === professionalType) &&
          (!location || item.location.toLowerCase().includes(location.toLowerCase())) &&
          item.rating >= Number(rating) &&
          item.price <= Number(price)
      ),
    [professionals, professionalType, location, rating, price]
  );

  return (
    <section className="container-page py-10 sm:py-12">
      <span className="eyebrow">Busca</span>
      <h1 className="heading-page mt-4">Encontre profissionais de confiança</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Babás, diaristas e cuidadoras verificadas — filtre por local, avaliação e preço.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="card h-max p-5">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Tipo de serviço</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setProfessionalType('')}
                  className={
                    professionalType === ''
                      ? 'rounded-2xl bg-brand-600 py-2.5 text-sm font-bold text-white'
                      : 'rounded-2xl border border-brand-100 py-2.5 text-sm font-semibold text-ink-muted dark:border-brand-800'
                  }
                >
                  Todos
                </button>
                {PROFESSIONAL_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProfessionalType(type)}
                    className={
                      professionalType === type
                        ? 'rounded-2xl bg-brand-600 py-2.5 text-sm font-bold text-white'
                        : 'rounded-2xl border border-brand-100 py-2.5 text-sm font-semibold text-ink-muted dark:border-brand-800'
                    }
                  >
                    {PROFESSIONAL_TYPE_LABELS[type]}
                  </button>
                ))}
              </div>
            </div>
            <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Cidade ou bairro" />
            <select className="input" value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="0">Todas avaliações</option>
              <option value="4.5">4.5+</option>
              <option value="4.8">4.8+</option>
            </select>
            <select className="input" value={price} onChange={(e) => setPrice(e.target.value)}>
              <option value="999">Qualquer preço</option>
              <option value="100">Até R$100</option>
              <option value="150">Até R$150</option>
              <option value="200">Até R$200</option>
            </select>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex justify-between text-sm text-muted">
            <span>{filtered.length} profissionais encontrados</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {loading
              ? [1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)
              : filtered.map((item) => <ProfessionalCard key={item.id} professional={item} />)}
          </div>

          {!loading && filtered.length === 0 && (
            <p className="mt-8 text-center text-muted">Nenhum profissional encontrado com esses filtros.</p>
          )}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useMemo, useState } from 'react';

import { FiFilter, FiSearch, FiX } from 'react-icons/fi';

import { useSearchParams } from 'react-router-dom';

import { useProfessionals } from '../hooks/useProfessionals';

import { ProfessionalCard } from '../components/professionals/ProfessionalCard';

import { SkeletonCard } from '../components/common/Skeleton';

import { PROFESSIONAL_TYPE_LABELS, PROFESSIONAL_TYPES } from '../constants/professionalSpecs';



export default function Search() {

  const [searchParams] = useSearchParams();

  const tipoFromUrl = searchParams.get('tipo') || '';
  const localFromUrl = searchParams.get('local') || '';

  const { professionals, loading } = useProfessionals();

  const [professionalType, setProfessionalType] = useState(tipoFromUrl);

  const [location, setLocation] = useState(localFromUrl);

  const [rating, setRating] = useState('0');

  const [price, setPrice] = useState('999');

  const [filtersOpen, setFiltersOpen] = useState(false);



  useEffect(() => {

    setProfessionalType(tipoFromUrl);

    setLocation(searchParams.get('local') || '');

  }, [tipoFromUrl, searchParams]);



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



  const activeFiltersCount = [

    professionalType,

    location,

    rating !== '0' ? rating : '',

    price !== '999' ? price : '',

  ].filter(Boolean).length;



  const filtersPanel = (

    <div className="space-y-5">

      <div>

        <p className="form-label">Tipo de serviço</p>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">

          <button

            type="button"

            onClick={() => setProfessionalType('')}

            className={professionalType === '' ? 'filter-chip filter-chip-active' : 'filter-chip'}

          >

            Todos

          </button>

          {PROFESSIONAL_TYPES.map((type) => (

            <button

              key={type}

              type="button"

              onClick={() => setProfessionalType(type)}

              className={professionalType === type ? 'filter-chip filter-chip-active' : 'filter-chip'}

            >

              {PROFESSIONAL_TYPE_LABELS[type]}

            </button>

          ))}

        </div>

      </div>



      <div>

        <label className="form-label" htmlFor="search-location">

          Localização

        </label>

        <div className="relative">

          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-light" />

          <input

            id="search-location"

            className="input pl-11"

            value={location}

            onChange={(e) => setLocation(e.target.value)}

            placeholder="Cidade ou bairro"

          />

        </div>

      </div>



      <div>

        <label className="form-label" htmlFor="search-rating">

          Avaliação mínima

        </label>

        <select id="search-rating" className="input" value={rating} onChange={(e) => setRating(e.target.value)}>

          <option value="0">Todas avaliações</option>

          <option value="4.5">4.5+ estrelas</option>

          <option value="4.8">4.8+ estrelas</option>

        </select>

      </div>



      <div>

        <label className="form-label" htmlFor="search-price">

          Preço máximo

        </label>

        <select id="search-price" className="input" value={price} onChange={(e) => setPrice(e.target.value)}>

          <option value="999">Qualquer preço</option>

          <option value="100">Até R$ 100</option>

          <option value="150">Até R$ 150</option>

          <option value="200">Até R$ 200</option>

        </select>

      </div>

    </div>

  );



  return (

    <section className="container-page py-6 sm:py-10 lg:py-12">

      <header className="page-header">

        <span className="eyebrow">Busca</span>

        <h1 className="heading-page mt-3">Encontre profissionais de confiança</h1>

        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">

          Babás e diaristas verificadas — filtre por local, avaliação e preço.

        </p>

      </header>



      <div className="mt-6 flex items-center justify-between gap-3 lg:hidden">

        <button

          type="button"

          onClick={() => setFiltersOpen(true)}

          className="btn-secondary flex-1 gap-2"

        >

          <FiFilter />

          Filtros

          {activeFiltersCount > 0 && (

            <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs text-white">

              {activeFiltersCount}

            </span>

          )}

        </button>

        <p className="text-sm font-semibold text-muted">

          {loading ? '…' : filtered.length} resultados

        </p>

      </div>



      {filtersOpen && (

        <>

          <button

            type="button"

            className="fixed inset-0 z-40 bg-brand-950/30 backdrop-blur-sm lg:hidden"

            aria-label="Fechar filtros"

            onClick={() => setFiltersOpen(false)}

          />

          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-premium dark:bg-navy-900 lg:hidden">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="font-display text-lg font-bold">Filtros</h2>

              <button

                type="button"

                onClick={() => setFiltersOpen(false)}

                className="flex min-h-touch min-w-touch items-center justify-center rounded-xl text-muted"

                aria-label="Fechar"

              >

                <FiX className="text-xl" />

              </button>

            </div>

            {filtersPanel}

            <button type="button" className="btn-primary mt-6 w-full" onClick={() => setFiltersOpen(false)}>

              Ver {filtered.length} resultados

            </button>

          </div>

        </>

      )}



      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]">

        <aside className="card hidden h-max p-5 lg:block">{filtersPanel}</aside>



        <div>

          <div className="mb-4 hidden justify-between text-sm text-muted lg:flex">

            <span>{filtered.length} profissionais encontrados</span>

          </div>



          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">

            {loading

              ? [1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)

              : filtered.map((item) => <ProfessionalCard key={item.id} professional={item} />)}

          </div>



          {!loading && filtered.length === 0 && (

            <div className="card mt-8 p-8 text-center">

              <p className="font-semibold text-ink dark:text-white">Nenhum profissional encontrado</p>

              <p className="mt-2 text-sm text-muted">Tente ajustar os filtros ou buscar em outra região.</p>

            </div>

          )}

        </div>

      </div>

    </section>

  );

}



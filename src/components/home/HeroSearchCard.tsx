import { FormEvent, useState } from 'react';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { PROFESSIONAL_TYPE_LABELS, PROFESSIONAL_TYPES } from '../../constants/professionalSpecs';

type ServiceType = '' | 'diarista' | 'baba';

export function HeroSearchCard() {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState<ServiceType>('');
  const [location, setLocation] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    if (serviceType) params.set('tipo', serviceType);
    if (location.trim()) params.set('local', location.trim());

    const query = params.toString();
    navigate(`/buscar${query ? `?${query}` : ''}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hero-search-card"
      aria-label="Buscar profissionais"
    >
      <div className="hero-search-field">
        <label className="hero-search-label" htmlFor="hero-service-type">
          Tipo de serviço
        </label>
        <select
          id="hero-service-type"
          className="hero-search-input"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value as ServiceType)}
        >
          <option value="">Todos os serviços</option>
          {PROFESSIONAL_TYPES.map((type) => (
            <option key={type} value={type}>
              {PROFESSIONAL_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </div>

      <div className="hero-search-field">
        <label className="hero-search-label" htmlFor="hero-location">
          Cidade ou bairro
        </label>
        <div className="relative">
          <FiMapPin
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <input
            id="hero-location"
            type="text"
            className="hero-search-input pl-11"
            placeholder="Ex.: Santos, Praia Grande..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            autoComplete="address-level2"
          />
        </div>
      </div>

      <button type="submit" className="hero-search-btn">
        <FiSearch aria-hidden />
        Buscar profissionais
      </button>
    </form>
  );
}

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiCheck, FiShield } from 'react-icons/fi';
import { BRAND } from '../../design/brand';
import { HeroSearchCard } from './HeroSearchCard';

const BENEFITS = [
  'Profissionais verificadas',
  'Avaliações reais',
  'Suporte humanizado',
  'Pagamento seguro',
] as const;

const TRUST_AVATARS = [
  { initials: 'MC', tone: 'bg-brand-600' },
  { initials: 'AS', tone: 'bg-brand-400' },
  { initials: 'RF', tone: 'bg-brand-300' },
  { initials: 'JL', tone: 'bg-brand-600/80' },
] as const;

export function HeroBanner() {
  const [mobileSrc, setMobileSrc] = useState(BRAND.heroImageMobile);
  const [desktopSrc, setDesktopSrc] = useState(BRAND.heroImageDesktop);

  return (
    <section className="hero-premium" aria-labelledby="hero-heading">
      {/* Mobile: background — KATRIN BOLOVTSOVA / Pexels */}
      <div className="hero-premium-bg-mobile" aria-hidden>
        <img
          src={mobileSrc}
          alt=""
          className="hero-premium-bg-image"
          loading="eager"
          decoding="async"
          onError={() => {
            if (mobileSrc !== BRAND.heroImageDesktop) {
              setMobileSrc(BRAND.heroImageDesktop);
            }
          }}
        />
        <div className="hero-premium-bg-scrim" />
      </div>

      <div className="container-page hero-premium-inner">
        <div className="hero-premium-grid">
          <motion.div
            className="hero-premium-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="hero-premium-badge">
              <FiShield className="shrink-0 text-brand-600" aria-hidden />
              Cuidado que conecta. Confiança que fica.
            </span>

            <h1 id="hero-heading" className="hero-premium-title">
              Encontre babás e diaristas de confiança para a sua{' '}
              <span className="hero-premium-title-accent">casa</span>
            </h1>

            <p className="hero-premium-subtitle">
              Conectamos famílias a profissionais verificadas e avaliadas com carinho e segurança.
            </p>

            <ul className="hero-premium-benefits" aria-label="Benefícios da plataforma">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="hero-premium-benefit">
                  <span className="hero-premium-benefit-icon" aria-hidden>
                    <FiCheck />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <HeroSearchCard />

            <div className="hero-premium-trust" aria-label="Prova social">
              <div className="hero-premium-avatars" aria-hidden>
                {TRUST_AVATARS.map((avatar, index) => (
                  <span
                    key={avatar.initials}
                    className={`hero-premium-avatar ${avatar.tone}`}
                    style={{ zIndex: TRUST_AVATARS.length - index }}
                  >
                    {avatar.initials}
                  </span>
                ))}
              </div>
              <div className="hero-premium-trust-copy">
                <p className="hero-premium-stars" aria-label="Avaliação 4.9 de 5 estrelas">
                  <span aria-hidden>⭐⭐⭐⭐⭐</span>
                  <strong>4.9 de 5</strong>
                </p>
                <p className="hero-premium-trust-meta">Mais de 10.000 famílias atendidas</p>
              </div>
            </div>
          </motion.div>

          {/* Desktop: Yan Krukau / Pexels */}
          <motion.div
            className="hero-premium-media hidden lg:block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="hero-premium-image-wrap">
              <img
                src={desktopSrc}
                alt="Profissional de cuidado com criança em ambiente acolhedor"
                className="hero-premium-image"
                loading="eager"
                decoding="async"
                onError={() => {
                  if (desktopSrc !== BRAND.heroImageMobile) {
                    setDesktopSrc(BRAND.heroImageMobile);
                  }
                }}
              />
              <div className="hero-premium-image-overlay" aria-hidden />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

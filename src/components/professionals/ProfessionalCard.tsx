import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import { FiArrowRight, FiCheckCircle, FiMapPin } from 'react-icons/fi';

import { Professional } from '../../types';

import { Rating } from '../common/Rating';

import { PROFESSIONAL_TYPE_LABELS } from '../../constants/professionalSpecs';



export function ProfessionalCard({ professional }: { professional: Professional }) {

  const typeLabel = professional.professionalType

    ? PROFESSIONAL_TYPE_LABELS[professional.professionalType]

    : professional.category;



  return (

    <motion.article

      whileHover={{ y: -2 }}

      transition={{ duration: 0.2 }}

      className="card-interactive flex h-full flex-col overflow-hidden"

    >

      <div className="relative">

        <img

          src={professional.cover}

          alt=""

          className="h-40 w-full object-cover sm:h-44"

        />

        {professional.verified && (

          <span className="badge-verified absolute left-3 top-3 shadow-sm">

            <FiCheckCircle /> Verificado

          </span>

        )}

        <span className="price-tag absolute bottom-3 right-3 shadow-sm">

          R$ {professional.price}+

        </span>

      </div>



      <div className="flex flex-1 flex-col p-4 sm:p-5">

        <div className="flex items-start gap-3">

          <img

            src={professional.avatar}

            alt=""

            className="h-12 w-12 shrink-0 rounded-xl object-cover ring-2 ring-white dark:ring-brand-900 sm:h-14 sm:w-14 sm:rounded-2xl"

          />

          <div className="min-w-0 flex-1">

            <h3 className="truncate font-display text-base font-bold text-brand-700 dark:text-white sm:text-lg">

              {professional.name}

            </h3>

            <p className="text-sm font-medium text-brand-600 dark:text-brand-400">{typeLabel}</p>

            <Rating value={professional.rating} count={professional.reviewsCount} />

          </div>

        </div>



        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">

          {professional.description}

        </p>



        <p className="mt-3 flex items-center gap-1 text-xs text-muted sm:text-sm">

          <FiMapPin className="shrink-0 text-brand-500" />

          <span className="truncate">{professional.location}</span>

        </p>



        <Link to={`/profissional/${professional.id}`} className="btn-primary mt-4 w-full sm:mt-5">

          Ver perfil <FiArrowRight className="text-base" />

        </Link>

      </div>

    </motion.article>

  );

}



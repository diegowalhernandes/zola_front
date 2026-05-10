import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiMapPin } from 'react-icons/fi';
import { Professional } from '../../types';
import { Rating } from '../common/Rating';

export function ProfessionalCard({ professional }: { professional: Professional }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="card overflow-hidden">
      <img src={professional.cover} alt={professional.category} className="h-36 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-start gap-4">
          <img src={professional.avatar} alt={professional.name} className="h-16 w-16 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900" />
          <div className="min-w-0 flex-1"><h3 className="flex items-center gap-1 truncate text-lg font-bold">{professional.name}{professional.verified && <FiCheckCircle className="text-brand-600" />}</h3><p className="text-sm font-medium text-slate-500">{professional.category}</p><Rating value={professional.rating} count={professional.reviewsCount} /></div>
        </div>
        <p className="mt-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{professional.description}</p>
        <div className="mt-4 flex items-center justify-between text-sm"><span className="flex items-center gap-1 text-slate-500"><FiMapPin /> {professional.location}</span><strong>A partir de R$ {professional.price}</strong></div>
        <Link to={`/profissional/${professional.id}`} className="btn-primary mt-5 w-full">Ver perfil</Link>
      </div>
    </motion.article>
  );
}

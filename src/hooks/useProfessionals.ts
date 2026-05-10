import { useEffect, useMemo, useState } from 'react';
import { fakeApi } from '../services/api';
import { Professional } from '../types';

export function useProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fakeApi.getProfessionals().then(setProfessionals).finally(() => setLoading(false));
  }, []);

  const featured = useMemo(() => professionals.filter((item) => item.rating >= 4.8), [professionals]);

  return { professionals, featured, loading };
}

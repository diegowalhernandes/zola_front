import { Category, ChatMessage, Professional, Review, ServiceOrder } from '../types';

export const categories: Category[] = [
  { id: 'eletricista', name: 'Eletricista', icon: 'FaBolt', description: 'Instalações, reparos e emergência', color: 'from-yellow-400 to-orange-500' },
  { id: 'encanador', name: 'Encanador', icon: 'FaFaucet', description: 'Vazamentos, torneiras e tubulações', color: 'from-blue-400 to-cyan-500' },
  { id: 'diarista', name: 'Diarista', icon: 'FaBroom', description: 'Limpeza residencial e comercial', color: 'from-pink-400 to-rose-500' },
  { id: 'mecanico', name: 'Mecânico', icon: 'FaCar', description: 'Manutenção automotiva local', color: 'from-slate-500 to-zinc-700' },
  { id: 'pintor', name: 'Pintor', icon: 'FaPaintRoller', description: 'Pintura e acabamento premium', color: 'from-purple-400 to-indigo-600' },
  { id: 'montador', name: 'Montador', icon: 'FaTools', description: 'Móveis planejados e montagem', color: 'from-emerald-400 to-teal-600' },
  { id: 'informatica', name: 'Técnico de Informática', icon: 'FaLaptopCode', description: 'Redes, formatação e suporte', color: 'from-sky-400 to-blue-700' }
];

export const professionals: Professional[] = [
  {
    id: '1', name: 'Carlos Almeida', category: 'Eletricista', location: 'Santos, SP', price: 120, rating: 4.9, reviewsCount: 184,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop', verified: true,
    description: 'Eletricista residencial e comercial com atendimento rápido, laudo técnico e garantia de serviço.',
    services: ['Instalação elétrica', 'Troca de disjuntores', 'Quadro de energia', 'Emergência 24h'],
    gallery: ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=500&auto=format&fit=crop','https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=500&auto=format&fit=crop'],
    availableToday: true
  },
  {
    id: '2', name: 'Mariana Costa', category: 'Diarista', location: 'São Vicente, SP', price: 160, rating: 4.8, reviewsCount: 92,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop', verified: true,
    description: 'Limpeza detalhada, organização e pós-obra com materiais próprios sob consulta.',
    services: ['Faxina residencial', 'Limpeza pós-obra', 'Organização', 'Limpeza comercial'],
    gallery: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=500&auto=format&fit=crop','https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=500&auto=format&fit=crop'],
    availableToday: false
  },
  {
    id: '3', name: 'Roberto Lima', category: 'Encanador', location: 'Praia Grande, SP', price: 100, rating: 4.7, reviewsCount: 136,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=1200&auto=format&fit=crop', verified: false,
    description: 'Especialista em caça-vazamentos, troca de registros, reparos hidráulicos e manutenção preventiva.',
    services: ['Caça-vazamento', 'Troca de registro', 'Desentupimento', 'Instalação de torneira'],
    gallery: ['https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=500&auto=format&fit=crop','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=500&auto=format&fit=crop'],
    availableToday: true
  },
  {
    id: '4', name: 'Juliana Martins', category: 'Técnico de Informática', location: 'Santos, SP', price: 90, rating: 5.0, reviewsCount: 58,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop', verified: true,
    description: 'Suporte técnico, redes, notebooks, computadores e atendimento remoto com linguagem simples.',
    services: ['Formatação', 'Suporte remoto', 'Rede Wi-Fi', 'Backup e antivírus'],
    gallery: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=500&auto=format&fit=crop','https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop'],
    availableToday: true
  }
];

export const reviews: Review[] = [
  { id: 'r1', professionalId: '1', clientName: 'Ana Paula', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop', rating: 5, comment: 'Atendimento rápido, organizado e muito profissional.', date: '2026-04-22' },
  { id: 'r2', professionalId: '2', clientName: 'Fernando Silva', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop', rating: 5, comment: 'Minha casa ficou impecável. Recomendo demais.', date: '2026-04-10' },
  { id: 'r3', professionalId: '3', clientName: 'Beatriz Souza', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop', rating: 4, comment: 'Resolveu o vazamento no mesmo dia.', date: '2026-03-28' }
];

export const orders: ServiceOrder[] = [
  { id: 'o1', title: 'Instalação de tomada 220V', status: 'pending', date: '2026-05-12', value: 180, clientName: 'Ana Paula', professionalName: 'Carlos Almeida' },
  { id: 'o2', title: 'Limpeza residencial completa', status: 'done', date: '2026-05-02', value: 220, clientName: 'Rafael Lima', professionalName: 'Mariana Costa' },
  { id: 'o3', title: 'Configurar rede Wi-Fi', status: 'accepted', date: '2026-05-15', value: 140, clientName: 'Bianca Reis', professionalName: 'Juliana Martins' }
];

export const messages: ChatMessage[] = [
  { id: 'm1', sender: 'other', text: 'Olá! Posso te ajudar com esse serviço hoje.', time: '09:32' },
  { id: 'm2', sender: 'me', text: 'Perfeito. Você atende em Santos?', time: '09:33' },
  { id: 'm3', sender: 'other', text: 'Sim, tenho horário no fim da tarde.', time: '09:34' }
];

export type UserRole = 'client' | 'professional';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface Review {
  id: string;
  professionalId: string;
  clientName: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export type ProfessionalType = 'diarista' | 'baba' | 'montador';

export type JobSpecs = Record<string, string | number | boolean | string[]>;

export type WeeklyAvailability = Record<string, string[]>;

export interface Professional {
  id: string;
  name: string;
  title: string;
  category: string;
  professionalType?: ProfessionalType;
  location: string;
  price: number;
  rating: number;
  reviewsCount: number;
  avatar: string;
  cover: string;
  verified: boolean;
  description: string;
  services: string[];
  gallery: string[];
  availableToday: boolean;
  jobSpecs?: JobSpecs;
  availability?: WeeklyAvailability;
}

export interface DayAvailability {
  date: string;
  slots: string[];
}

export interface AppointmentPayload {
  professional_id: number;
  appointment_date: string;
  time_slot: string;
  notes?: string;
}

export interface ServiceOrder {
  id: string;
  title: string;
  status: 'pending' | 'accepted' | 'done' | 'cancelled';
  date: string;
  value: number;
  clientName?: string;
  professionalName?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

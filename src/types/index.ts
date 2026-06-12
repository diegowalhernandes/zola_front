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

export type ProfessionalType = 'diarista' | 'baba';

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

export interface DepositPreview {
  total_amount: number;
  deposit_amount: number;
  deposit_percent: number;
  payments_enabled: boolean;
}

export interface AppointmentCheckout {
  appointment_id: number;
  checkout_url: string | null;
  deposit_amount: number;
  total_amount: number;
  payments_required: boolean;
  status: string;
}

export interface AppointmentItem {
  id: number;
  professional_id: number;
  client_id: number;
  appointment_date: string;
  time_slot: string;
  status: string;
  deposit_amount: number;
  deposit_paid: boolean;
  payment_status: string;
  notes?: string | null;
  professional_name?: string | null;
  client_name?: string | null;
  created_at: string;
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

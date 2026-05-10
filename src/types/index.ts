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

export interface Professional {
  id: string;
  name: string;
  category: string;
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

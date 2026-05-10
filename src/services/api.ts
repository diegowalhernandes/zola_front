import axios from 'axios';
import { categories, messages, orders, professionals, reviews } from '../data/mock';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
  timeout: 7000
});

export const fakeApi = {
  async getProfessionals() {
    await wait(500);
    return professionals;
  },
  async getProfessional(id: string) {
    await wait(400);
    return professionals.find((professional) => professional.id === id) ?? null;
  },
  async getCategories() {
    await wait(300);
    return categories;
  },
  async getReviews(professionalId?: string) {
    await wait(300);
    return professionalId ? reviews.filter((review) => review.professionalId === professionalId) : reviews;
  },
  async getOrders() {
    await wait(300);
    return orders;
  },
  async getMessages() {
    await wait(250);
    return messages;
  }
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

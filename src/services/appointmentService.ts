import { api } from './api';
import { AppointmentPayload, DayAvailability } from '../types';

export async function getProfessionalAvailability(
  professionalId: number,
  from: string,
  to?: string
): Promise<DayAvailability[]> {
  const response = await api.get<DayAvailability[]>(`/appointments/professional/${professionalId}/availability`, {
    params: { from, to },
  });
  return response.data;
}

export async function bookAppointment(payload: AppointmentPayload) {
  const response = await api.post('/appointments', payload);
  return response.data;
}

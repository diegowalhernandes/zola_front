import { api } from './api';
import {
  AppointmentCheckout,
  AppointmentItem,
  AppointmentPayload,
  DayAvailability,
  DepositPreview,
} from '../types';

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

export async function getDepositPreview(professionalId: number): Promise<DepositPreview> {
  const response = await api.get<DepositPreview>(`/appointments/deposit-preview/${professionalId}`);
  return response.data;
}

export async function checkoutAppointment(payload: AppointmentPayload): Promise<AppointmentCheckout> {
  const response = await api.post<AppointmentCheckout>('/appointments/checkout', payload);
  return response.data;
}

export async function cancelAwaitingPayment(appointmentId: number) {
  const response = await api.post(`/appointments/${appointmentId}/cancel-awaiting`);
  return response.data;
}

export async function getMyAppointments(): Promise<AppointmentItem[]> {
  const response = await api.get<AppointmentItem[]>('/appointments/me');
  return response.data;
}

export async function getIncomingAppointments(): Promise<AppointmentItem[]> {
  const response = await api.get<AppointmentItem[]>('/appointments/incoming');
  return response.data;
}

/** @deprecated use checkoutAppointment */
export async function bookAppointment(payload: AppointmentPayload) {
  const response = await api.post('/appointments', payload);
  return response.data;
}

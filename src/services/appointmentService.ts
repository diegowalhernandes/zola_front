import { api, parseApiError } from './api';
import {
  AppointmentCheckout,
  AppointmentItem,
  AppointmentPayload,
  BatchCheckout,
  BatchCheckoutPayload,
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

export const FALLBACK_DEPOSIT_PREVIEW: DepositPreview = {
  total_amount: 0,
  deposit_amount: 0,
  deposit_percent: 30,
  payments_enabled: false,
  slot_count: 1,
};

export async function getDepositPreview(professionalId: number, slotCount = 1): Promise<DepositPreview> {
  try {
    const response = await api.get<DepositPreview>(`/appointments/deposit-preview/${professionalId}`, {
      params: { slots: slotCount },
    });
    return response.data;
  } catch (error) {
    const { status } = parseApiError(error);
    if (status === 404 || status === 503) {
      return { ...FALLBACK_DEPOSIT_PREVIEW, slot_count: slotCount };
    }
    throw error;
  }
}

export async function checkoutBatch(payload: BatchCheckoutPayload): Promise<BatchCheckout> {
  try {
    const response = await api.post<BatchCheckout>('/appointments/checkout-batch', payload);
    return response.data;
  } catch (error) {
    const { status } = parseApiError(error);
    if (status === 404) {
      for (const slot of payload.slots) {
        await bookAppointment({
          professional_id: payload.professional_id,
          appointment_date: slot.appointment_date,
          time_slot: slot.time_slot,
          notes: payload.notes,
        });
      }
      return {
        batch_id: '',
        appointment_ids: [],
        checkout_url: null,
        total_amount: 0,
        amount_due: 0,
        deposit_amount: 0,
        payment_mode: payload.payment_mode,
        payments_required: false,
        status: 'confirmed',
      };
    }
    throw error;
  }
}

export async function checkoutAppointment(payload: AppointmentPayload): Promise<AppointmentCheckout> {
  const batch = await checkoutBatch({
    professional_id: payload.professional_id,
    slots: [{ appointment_date: payload.appointment_date, time_slot: payload.time_slot }],
    notes: payload.notes,
    payment_mode: 'deposit',
  });
  return {
    appointment_id: batch.appointment_ids[0] ?? 0,
    checkout_url: batch.checkout_url,
    deposit_amount: batch.deposit_amount,
    total_amount: batch.total_amount,
    payments_required: batch.payments_required,
    status: batch.status,
  };
}

export async function cancelAwaitingBatch(batchId: string) {
  const response = await api.post(`/appointments/batch/${batchId}/cancel-awaiting`);
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

export async function bookAppointment(payload: AppointmentPayload) {
  const response = await api.post('/appointments', payload);
  return response.data;
}

export function slotKey(date: string, time: string) {
  return `${date}|${time}`;
}

export function parseSlotKey(key: string): { appointment_date: string; time_slot: string } {
  const [appointment_date, time_slot] = key.split('|');
  return { appointment_date, time_slot };
}

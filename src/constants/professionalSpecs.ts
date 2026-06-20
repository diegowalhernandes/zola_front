export type ProfessionalType = 'diarista' | 'baba';

export const PROFESSIONAL_TYPE_LABELS: Record<ProfessionalType, string> = {
  diarista: 'Diarista',
  baba: 'Babá',
};

export const PROFESSIONAL_TYPES: ProfessionalType[] = ['diarista', 'baba'];

export const WEEKDAYS = [
  { key: 'monday', label: 'Segunda' },
  { key: 'tuesday', label: 'Terça' },
  { key: 'wednesday', label: 'Quarta' },
  { key: 'thursday', label: 'Quinta' },
  { key: 'friday', label: 'Sexta' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
] as const;

export const TIME_SLOT_OPTIONS = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

export const DIARISTA_TURN_OPTIONS = [
  { value: 'manha', label: 'Manhã' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'dia_inteiro', label: 'Dia inteiro' },
] as const;

export type DiaristaTurn = (typeof DIARISTA_TURN_OPTIONS)[number]['value'];

export const DIARISTA_TURN_LABELS: Record<string, string> = {
  manha: 'Manhã',
  tarde: 'Tarde',
  dia_inteiro: 'Dia inteiro',
};

export const TURN_ORDER: DiaristaTurn[] = ['manha', 'tarde', 'dia_inteiro'];

export const DIARISTA_SPEC_FIELDS = [
  { key: 'tipo_limpeza', label: 'Tipo de limpeza', type: 'select', options: ['residencial', 'comercial', 'pós-obra'] },
  { key: 'frequencia', label: 'Frequência', type: 'select', options: ['avulsa', 'semanal', 'quinzenal', 'mensal'] },
  { key: 'metros_aprox', label: 'Metros² aproximados', type: 'number' },
  { key: 'traz_material', label: 'Traz material de limpeza', type: 'boolean' },
  { key: 'inclui_cozinha', label: 'Inclui cozinha', type: 'boolean' },
  { key: 'inclui_banheiros', label: 'Inclui banheiros', type: 'boolean' },
  { key: 'inclui_passar_roupa', label: 'Inclui passar roupa', type: 'boolean' },
] as const;

export const BABA_SPEC_FIELDS = [
  { key: 'faixa_etaria', label: 'Faixa etária atendida', type: 'select', options: ['0-3 anos', '4-7 anos', '8-12 anos', 'adolescentes'] },
  { key: 'experiencia_anos', label: 'Anos de experiência', type: 'number' },
  { key: 'numero_criancas', label: 'Nº máximo de crianças', type: 'number' },
  { key: 'turnos', label: 'Turnos disponíveis', type: 'multiselect', options: ['manhã', 'tarde', 'noite', 'pernoite'] },
  { key: 'primeiros_socorros', label: 'Curso de primeiros socorros', type: 'boolean' },
  { key: 'ajuda_tarefas_domesticas', label: 'Ajuda em tarefas domésticas leves', type: 'boolean' },
] as const;

export const SPEC_FIELD_LABELS: Record<string, string> = {
  tipo_limpeza: 'Tipo de limpeza',
  frequencia: 'Frequência',
  metros_aprox: 'Metros² aproximados',
  traz_material: 'Traz material',
  inclui_cozinha: 'Inclui cozinha',
  inclui_banheiros: 'Inclui banheiros',
  inclui_passar_roupa: 'Passa roupa',
  faixa_etaria: 'Faixa etária',
  experiencia_anos: 'Experiência (anos)',
  numero_criancas: 'Máx. de crianças',
  turnos: 'Turnos',
  primeiros_socorros: 'Primeiros socorros',
  ajuda_tarefas_domesticas: 'Tarefas domésticas leves',
};

export function getSpecFields(type: ProfessionalType) {
  return type === 'diarista' ? DIARISTA_SPEC_FIELDS : BABA_SPEC_FIELDS;
}

export function defaultJobSpecs(type: ProfessionalType): Record<string, string | number | boolean | string[]> {
  if (type === 'diarista') {
    return {
      tipo_limpeza: 'residencial',
      frequencia: 'semanal',
      traz_material: false,
      metros_aprox: 80,
      inclui_cozinha: true,
      inclui_banheiros: true,
      inclui_passar_roupa: false,
    };
  }
  return {
    faixa_etaria: '0-3 anos',
    experiencia_anos: 3,
    numero_criancas: 2,
    turnos: ['manhã', 'tarde'],
    primeiros_socorros: false,
    ajuda_tarefas_domesticas: true,
  };
}

export function formatSpecValue(key: string, value: unknown): string {
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? capitalizeLabel(item) : String(item)))
      .join(', ');
  }
  if (typeof value === 'string') return capitalizeLabel(value);
  return String(value ?? '—');
}

function capitalizeLabel(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export const DEFAULT_BABA_WEEKLY_AVAILABILITY: Record<string, string[]> = {
  monday: ['08:00', '09:00', '14:00'],
  tuesday: ['08:00', '09:00', '14:00'],
  wednesday: ['08:00', '14:00'],
  thursday: ['08:00', '09:00', '14:00'],
  friday: ['08:00', '14:00'],
  saturday: ['09:00', '10:00'],
  sunday: [],
};

export const DEFAULT_DIARISTA_WEEKLY_AVAILABILITY: Record<string, string[]> = {
  monday: ['manha', 'tarde'],
  tuesday: ['manha', 'tarde'],
  wednesday: ['manha', 'tarde'],
  thursday: ['manha', 'tarde'],
  friday: ['manha', 'tarde'],
  saturday: ['manha'],
  sunday: [],
};

/** @deprecated Use getDefaultWeeklyAvailability(type) */
export const DEFAULT_WEEKLY_AVAILABILITY = DEFAULT_BABA_WEEKLY_AVAILABILITY;

export function getDefaultWeeklyAvailability(type: ProfessionalType | undefined) {
  return type === 'diarista' ? DEFAULT_DIARISTA_WEEKLY_AVAILABILITY : DEFAULT_BABA_WEEKLY_AVAILABILITY;
}

export function isDiaristaType(type: ProfessionalType | undefined) {
  return type === 'diarista';
}

export function formatSlotLabel(slot: string, type?: ProfessionalType) {
  if (type === 'diarista' || slot in DIARISTA_TURN_LABELS) {
    return DIARISTA_TURN_LABELS[slot] ?? slot;
  }
  return slot;
}

export function sortAvailabilitySlots(slots: string[], type?: ProfessionalType) {
  if (isDiaristaType(type)) {
    const order = Object.fromEntries(TURN_ORDER.map((turn, index) => [turn, index]));
    return [...slots].sort((a, b) => (order[a] ?? 99) - (order[b] ?? 99));
  }
  return [...slots].sort();
}

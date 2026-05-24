export type ProfessionalType = 'diarista' | 'baba' | 'montador';

export const PROFESSIONAL_TYPE_LABELS: Record<ProfessionalType, string> = {
  diarista: 'Diarista',
  baba: 'Babá',
  montador: 'Montador de móveis',
};

export const PROFESSIONAL_TYPES: ProfessionalType[] = ['diarista', 'baba', 'montador'];

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

export const MONTADOR_SPEC_FIELDS = [
  { key: 'tipo_servico', label: 'Tipos de montagem', type: 'multiselect', options: ['móveis convencionais', 'móveis planejados', 'guarda-roupa', 'cozinha modulada', 'escrivaninha/cama', 'estantes e racks'] },
  { key: 'experiencia_anos', label: 'Anos de experiência', type: 'number' },
  { key: 'traz_ferramentas', label: 'Traz ferramentas próprias', type: 'boolean' },
  { key: 'desmontagem_inclusa', label: 'Faz desmontagem', type: 'boolean' },
  { key: 'segue_manual', label: 'Segue manual do fabricante', type: 'boolean' },
  { key: 'montagem_urgente', label: 'Atende montagem urgente', type: 'boolean' },
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
  tipo_servico: 'Tipos de montagem',
  traz_ferramentas: 'Traz ferramentas',
  desmontagem_inclusa: 'Desmontagem',
  segue_manual: 'Segue manual',
  montagem_urgente: 'Montagem urgente',
};

export function getSpecFields(type: ProfessionalType) {
  if (type === 'diarista') return DIARISTA_SPEC_FIELDS;
  if (type === 'baba') return BABA_SPEC_FIELDS;
  return MONTADOR_SPEC_FIELDS;
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
  if (type === 'baba') {
    return {
      faixa_etaria: '0-3 anos',
      experiencia_anos: 3,
      numero_criancas: 2,
      turnos: ['manhã', 'tarde'],
      primeiros_socorros: false,
      ajuda_tarefas_domesticas: true,
    };
  }
  return {
    tipo_servico: ['móveis convencionais', 'móveis planejados'],
    experiencia_anos: 3,
    traz_ferramentas: true,
    desmontagem_inclusa: true,
    segue_manual: true,
    montagem_urgente: false,
  };
}

export function formatSpecValue(key: string, value: unknown): string {
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  if (Array.isArray(value)) return value.join(', ');
  return String(value ?? '—');
}

export const DEFAULT_WEEKLY_AVAILABILITY: Record<string, string[]> = {
  monday: ['08:00', '09:00', '14:00'],
  tuesday: ['08:00', '09:00', '14:00'],
  wednesday: ['08:00', '14:00'],
  thursday: ['08:00', '09:00', '14:00'],
  friday: ['08:00', '14:00'],
  saturday: ['09:00', '10:00'],
  sunday: [],
};

export type DocumentType = 'cpf' | 'passport';

const INVALID_CPFS = new Set([
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
]);

export function normalizeDocumentNumber(documentType: DocumentType, value: string) {
  const cleaned = value.trim();
  if (documentType === 'cpf') {
    return cleaned.replace(/\D/g, '');
  }
  return cleaned.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}

export function isValidCpf(value: string) {
  const cpf = normalizeDocumentNumber('cpf', value);
  if (cpf.length !== 11 || INVALID_CPFS.has(cpf)) return false;

  const digits = cpf.split('').map(Number);
  const firstSum = digits.slice(0, 9).reduce((acc, digit, index) => acc + digit * (10 - index), 0);
  let firstCheck = (firstSum * 10) % 11;
  firstCheck = firstCheck === 10 ? 0 : firstCheck;
  if (digits[9] !== firstCheck) return false;

  const secondSum = digits.slice(0, 10).reduce((acc, digit, index) => acc + digit * (11 - index), 0);
  let secondCheck = (secondSum * 10) % 11;
  secondCheck = secondCheck === 10 ? 0 : secondCheck;
  return digits[10] === secondCheck;
}

export function isValidPassport(value: string) {
  const passport = normalizeDocumentNumber('passport', value);
  if (passport.length < 6 || passport.length > 20) return false;
  if (!/^[A-Z0-9]+$/.test(passport)) return false;
  return !/^\d+$/.test(passport);
}

export function validateDocument(documentType: DocumentType, value: string) {
  const normalized = normalizeDocumentNumber(documentType, value);
  if (!normalized) {
    return 'Informe o número do documento.';
  }

  if (documentType === 'cpf') {
    return isValidCpf(normalized) ? null : 'CPF inválido.';
  }

  return isValidPassport(normalized) ? null : 'Passaporte inválido.';
}

export function formatCpfInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

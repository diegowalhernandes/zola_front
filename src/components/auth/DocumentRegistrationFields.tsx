import { FiCreditCard } from 'react-icons/fi';
import { DocumentType, formatCpfInput } from '../../utils/documentValidation';

type Props = {
  documentType: DocumentType;
  documentNumber: string;
  onDocumentTypeChange: (value: DocumentType) => void;
  onDocumentNumberChange: (value: string) => void;
};

export function DocumentRegistrationFields({
  documentType,
  documentNumber,
  onDocumentTypeChange,
  onDocumentNumberChange,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p className="form-label">Documento de identificação</p>
        <p className="form-hint mb-2">
          Obrigatório para a segurança de clientes e profissionais na plataforma.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onDocumentTypeChange('cpf')}
            className={documentType === 'cpf' ? 'filter-chip filter-chip-active' : 'filter-chip'}
          >
            CPF
          </button>
          <button
            type="button"
            onClick={() => onDocumentTypeChange('passport')}
            className={documentType === 'passport' ? 'filter-chip filter-chip-active' : 'filter-chip'}
          >
            Passaporte
          </button>
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="auth-document">
          {documentType === 'cpf' ? 'Número do CPF' : 'Número do passaporte'}
        </label>
        <div className="relative">
          <FiCreditCard className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-light" />
          <input
            id="auth-document"
            name="document_number"
            className="input pl-11"
            placeholder={documentType === 'cpf' ? '000.000.000-00' : 'AB1234567'}
            value={documentNumber}
            onChange={(e) => {
              const nextValue =
                documentType === 'cpf' ? formatCpfInput(e.target.value) : e.target.value.toUpperCase();
              onDocumentNumberChange(nextValue);
            }}
            autoComplete="off"
            inputMode={documentType === 'cpf' ? 'numeric' : 'text'}
            required
          />
        </div>
        <input type="hidden" name="document_type" value={documentType} />
      </div>
    </div>
  );
}

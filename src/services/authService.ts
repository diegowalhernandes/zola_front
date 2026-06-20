import { api } from "./api";
import { JobSpecs, ProfessionalType } from "../types";
import { DocumentType } from "../utils/documentValidation";
import { formatPersonName } from "../utils/formatDisplay";

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: "client" | "professional";
  document_type: DocumentType;
  document_number: string;
  professional_type?: ProfessionalType;
  city?: string;
  state?: string;
  title?: string;
  description?: string;
  price_from?: number;
  job_specs?: JobSpecs;
};

function mapAuthUser(raw: { id: number; name: string; email: string; role: string; avatar?: string }) {
  return {
    ...raw,
    id: String(raw.id),
    name: formatPersonName(raw.name),
  };
}

export async function registerUser(data: RegisterData) {
  const response = await api.post("/auth/register", data);
  return {
    ...response.data,
    user: mapAuthUser(response.data.user),
  };
}

export async function loginUser(email: string, password: string) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return {
    ...response.data,
    user: mapAuthUser(response.data.user),
  };
}

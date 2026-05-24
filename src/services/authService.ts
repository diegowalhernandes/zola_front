import { api } from "./api";
import { JobSpecs, ProfessionalType } from "../types";

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: "client" | "professional";
  professional_type?: ProfessionalType;
  city?: string;
  state?: string;
  title?: string;
  description?: string;
  price_from?: number;
  job_specs?: JobSpecs;
};

export async function registerUser(data: RegisterData) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function loginUser(email: string, password: string) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}

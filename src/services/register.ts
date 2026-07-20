import { OrgsRepository } from "@/repositories/orgs-repositore";
import { hash } from "bcryptjs";
import { EmailAlreadeExistsError } from "./errors/email-already-exists";
import { Org } from "@/generated/prisma/client";

interface RegisterInterfaceRequest {
  name: string;
  email: string;
  password: string;
  whatsapp: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  latitude: string;
  longitude: string;
}

interface RegisterOrgServiceResponse {
  org: Org;
}

export class RegisterService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    whatsapp,
    cep,
    state,
    city,
    neighborhood,
    latitude,
    longitude,
  }: RegisterInterfaceRequest): Promise<RegisterOrgServiceResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new EmailAlreadeExistsError();
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      whatsapp,
      cep,
      state,
      city,
      neighborhood,
      latitude,
      longitude,
    });

    return { org };
  }
}

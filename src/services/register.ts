import { OrgsRepository } from "@/repositories/orgs-repositore";
import { hash } from "bcryptjs";

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
  }: RegisterInterfaceRequest) {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new Error("E-mail already exists.");
    }

    await this.orgsRepository.create({
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
  }
}

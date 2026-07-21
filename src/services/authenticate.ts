import { OrgsRepository } from "@/repositories/orgs-repositore";
import { InvalidCredentialsError } from "./errors/invalid-credentials-erros";
import { compare } from "bcryptjs";
import { Org } from "@/generated/prisma/client";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  org: Org;
}

export class AuthenticateServise {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, org.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}

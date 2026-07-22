import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateServise } from "../authenticate";

export function makeAuthenticateService() {
  const orgsRepository = new PrismaOrgsRepository();
  const authenticateOrgService = new AuthenticateServise(orgsRepository);

  return authenticateOrgService;
}

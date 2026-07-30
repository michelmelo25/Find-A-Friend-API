import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { GetOrgProfileService } from "../org/get-org-profile";

export function makeGetOrgService() {
  const orgsRepository = new PrismaOrgsRepository();
  const service = new GetOrgProfileService(orgsRepository);

  return service;
}

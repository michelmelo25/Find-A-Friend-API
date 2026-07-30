import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pet-repository";
import { GetPetService } from "../pet/get-pet";

export function makeGetPetService() {
  const petRepository = new PrismaPetsRepository();
  const service = new GetPetService(petRepository);

  return service;
}

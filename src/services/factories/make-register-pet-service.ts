import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pet-repository";
import { RegisterPetService } from "../pet/register";

export function makeRegisterPetService() {
  const petRepository = new PrismaPetsRepository();
  const service = new RegisterPetService(petRepository);

  return service;
}

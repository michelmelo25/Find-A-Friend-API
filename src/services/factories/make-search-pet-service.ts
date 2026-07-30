import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pet-repository";
import { SearchPetService } from "../pet/search-pet";

export function makeSearchPetService() {
  const petRepository = new PrismaPetsRepository();
  const service = new SearchPetService(petRepository);

  return service;
}

import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { RegisterPetService } from "@/services/pet/register";

export function makeRegisterPetInMemoryService() {
  const orgRepository = new InMemoryOrgsRepository();
  const petRepository = new InMemoryPetsRepository(orgRepository);
  const registerPetService = new RegisterPetService(petRepository);

  return registerPetService;
}

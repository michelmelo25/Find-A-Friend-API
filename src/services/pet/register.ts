import { Pet } from "@/generated/prisma/client";
import { EnergyLevel, IndependenceLevel, Size } from "@/generated/prisma/enums";
import { PetsRepository } from "@/repositories/pets-repositore";

interface RegisterPetInterfaceRequest {
  name: string;
  about: string;
  age: string;
  size: Size;
  energy_level: EnergyLevel;
  independence_level: IndependenceLevel;
  environment: string;
  org_id: string;
}

interface RegisterPetInterfaceResponse {
  pet: Pet;
}

export class RegisterPetService {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    org_id,
  }: RegisterPetInterfaceRequest): Promise<RegisterPetInterfaceResponse> {
    const pet = await this.petRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      org_id,
    });

    return { pet };
  }
}

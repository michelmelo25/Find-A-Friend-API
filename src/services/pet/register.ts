import { Pet } from "@/generated/prisma/client";
import {
  Age,
  AnimalType,
  EnergyLevel,
  IndependenceLevel,
  Size,
} from "@/generated/prisma/enums";
import { PetsRepository } from "@/repositories/pets-repositore";

interface PetRequirementInput {
  title: string;
}

interface RegisterPetInterfaceRequest {
  name: string;
  about: string;
  age: Age;
  animal_type: AnimalType;
  size: Size;
  energy_level: EnergyLevel;
  independence_level: IndependenceLevel;
  environment: string;
  org_id: string;
  petRequirements?: string[];
  petImages?: string[];
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
    animal_type,
    size,
    energy_level,
    independence_level,
    environment,
    org_id,
    petRequirements,
    petImages,
  }: RegisterPetInterfaceRequest): Promise<RegisterPetInterfaceResponse> {
    const pet = await this.petRepository.create({
      name,
      about,
      age,
      animal_type,
      size,
      energy_level,
      independence_level,
      environment,
      org_id,
      ...(petRequirements && petRequirements.length > 0
        ? {
            petRequirements: {
              create: petRequirements.map((requirement) => ({
                title: requirement,
              })),
            },
          }
        : {}),
      ...(petImages && petImages.length > 0
        ? {
            petImages: {
              create: petImages.map((url) => ({ url })),
            },
          }
        : {}),
    });

    return { pet };
  }
}

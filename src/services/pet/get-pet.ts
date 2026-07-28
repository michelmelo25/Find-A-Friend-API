import {
  EnergyLevel,
  IndependenceLevel,
  Pet,
  Size,
} from "@/generated/prisma/client";
import {
  PetWithRelations,
  PetsRepository,
} from "@/repositories/pets-repositore";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPetInterfaceResponse {
  pet: PetWithRelations;
}

export class GetPetService {
  constructor(private petRepository: PetsRepository) {}

  async execute(id: string): Promise<GetPetInterfaceResponse> {
    // const pets = await this.petRepository.findByCity(city, UF);
    const pet = await this.petRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}

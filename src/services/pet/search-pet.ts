import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Size,
} from "@/generated/prisma/client";
import {
  PetWithRelations,
  PetsRepository,
} from "@/repositories/pets-repositore";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface SearchPetInterfaceRequest {
  city: string;
  state: string;
  age?: Age;
  energy_level?: EnergyLevel;
  size?: Size;
  independence_level?: IndependenceLevel;
  page?: number;
}

interface SearchPetInterfaceResponse {
  pets: PetWithRelations[];
}

export class SearchPetService {
  constructor(private petRepository: PetsRepository) {}

  async execute(
    data: SearchPetInterfaceRequest,
  ): Promise<SearchPetInterfaceResponse> {
    // const pets = await this.petRepository.findByCity(city, UF);
    const pets = await this.petRepository.findManyByOptions(data);

    if (!pets) {
      throw new ResourceNotFoundError();
    }

    return { pets };
  }
}

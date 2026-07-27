import {
  EnergyLevel,
  IndependenceLevel,
  Pet,
  Size,
} from "@/generated/prisma/client";
import { PetsRepository } from "@/repositories/pets-repositore";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPetInterfaceRequest {
  city: string;
  uf: string;
  age?: string;
  energy_level?: EnergyLevel;
  size?: Size;
  independence_level?: IndependenceLevel;
  page?: number;
}

interface GetPetInterfaceResponse {
  pets: Pet[];
}

export class GetPetService {
  constructor(private petRepository: PetsRepository) {}

  async execute(
    data: GetPetInterfaceRequest,
  ): Promise<GetPetInterfaceResponse> {
    // const pets = await this.petRepository.findByCity(city, UF);
    const pets = await this.petRepository.findManyByOptions(data);

    if (!pets) {
      throw new ResourceNotFoundError();
    }

    return { pets };
  }
}

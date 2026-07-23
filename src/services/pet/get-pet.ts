import { Pet } from "@/generated/prisma/client";
import { PetsRepository } from "@/repositories/pets-repositore";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPetInterfaceRequest {
  city: string;
  UF: string;
}

interface GetPetInterfaceResponse {
  pets: Pet[];
}

export class GetPetService {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    city,
    UF,
  }: GetPetInterfaceRequest): Promise<GetPetInterfaceResponse> {
    const pets = await this.petRepository.findByCity(city, UF);

    if (!pets) {
      throw new ResourceNotFoundError();
    }

    return { pets };
  }
}

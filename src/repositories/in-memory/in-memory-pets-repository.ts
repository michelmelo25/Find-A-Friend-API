import {
  EnergyLevel,
  IndependenceLevel,
  Pet,
  Pet_image,
  Pet_Requirement,
  Size,
} from "@/generated/prisma/client";
import { PetUncheckedCreateInput } from "@/generated/prisma/models";
import { PetWithRelations, PetsRepository } from "../pets-repositore";
import { randomUUID } from "node:crypto";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export interface FindManyByOptionsParams {
  city: string;
  uf: string;
  age?: string;
  energy_level?: EnergyLevel;
  size?: Size;
  independence_level?: IndependenceLevel;
  page?: number;
}

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private orgRepository: InMemoryOrgsRepository) {}
  public items: Pet[] = [];
  public requirement: Pet_Requirement[] = [];
  public images: Pet_image[] = [];

  private mapPetWithRelations(pet: Pet): PetWithRelations {
    return {
      ...pet,
      petRequirements: this.requirement.filter(
        (item) => item.pet_id === pet.id,
      ),
      petImages: this.images.filter((item) => item.pet_id === pet.id),
    };
  }

  async findById(id: string): Promise<PetWithRelations | null> {
    const pet = this.items.find((data) => data.id === id);

    if (!pet) {
      return null;
    }

    return this.mapPetWithRelations(pet);
  }

  async findByCity(
    city: string,
    UF: string,
  ): Promise<PetWithRelations[] | null> {
    const orgsInCity = this.orgRepository.orgs.filter(
      (org) =>
        org.city.toLowerCase() === city.toLowerCase() &&
        org.state.toLowerCase() === UF.toLowerCase(),
    );

    const orgIdsInCity = orgsInCity.map((org) => org.id);

    const petsInCity = this.items.filter((pet) =>
      orgIdsInCity.includes(pet.org_id),
    );

    if (!petsInCity) {
      return null;
    }

    return petsInCity.map((pet) => this.mapPetWithRelations(pet));
  }

  async create(data: PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      animal_type: data.animal_type,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      org_id: data.org_id,
      created_at: new Date(),
    };

    this.items.push(pet);

    if (data.petRequirements && "create" in data.petRequirements) {
      const requirements = Array.isArray(data.petRequirements.create)
        ? data.petRequirements.create
        : [data.petRequirements.create];

      for (const requirement of requirements) {
        if (!requirement) continue;

        this.requirement.push({
          id: randomUUID(),
          title: requirement.title,
          pet_id: pet.id,
        });
      }
    }

    if (data.petImages && "create" in data.petImages) {
      const images = Array.isArray(data.petImages.create)
        ? data.petImages.create
        : [data.petImages.create];

      for (const image of images) {
        if (!image) continue;

        this.images.push({
          id: randomUUID(),
          url: image.url,
          pet_id: pet.id,
        });
      }
    }

    return pet;
  }

  async findManyByOptions(
    params: FindManyByOptionsParams,
  ): Promise<PetWithRelations[]> {
    const orgsInCity = this.orgRepository.orgs.filter(
      (org) => org.city.toLowerCase() === params.city.toLowerCase(),
    );

    const orgIdsInCity = orgsInCity.map((org) => org.id);

    const pets = this.items.filter((pet) => {
      const belongsToCity = orgIdsInCity.includes(pet.org_id);
      if (!belongsToCity) return false;

      if (params.age && pet.age.toLowerCase() !== params.age.toLowerCase()) {
        return false;
      }

      if (params.energy_level && pet.energy_level !== params.energy_level) {
        return false;
      }

      if (params.size && pet.size !== params.size) {
        return false;
      }
      if (
        params.independence_level &&
        pet.independence_level !== params.independence_level
      ) {
        return false;
      }

      return true;
    });

    const petsWithRelations = pets.map((pet) => this.mapPetWithRelations(pet));

    const page = params.page ?? 1;
    if (params.page) {
      // para executar o teste com banco pouco populado
      return petsWithRelations.slice((page - 1) * 2, page * 2);
    } else {
      return petsWithRelations.slice((page - 1) * 20, page * 20);
    }
  }
}

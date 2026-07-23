import {
  EnergyLevel,
  IndependenceLevel,
  Pet,
  Size,
} from "@/generated/prisma/client";
import { PetUncheckedCreateInput } from "@/generated/prisma/models";
import { PetsRepository } from "../pets-repositore";
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

  async findByCity(city: string, UF: string): Promise<Pet[] | null> {
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

    return petsInCity;
  }

  async create(data: PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      org_id: data.org_id,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  async findManyByOptions(params: FindManyByOptionsParams): Promise<Pet[]> {
    const orgsInCity = this.orgRepository.orgs.filter(
      (org) => org.city.toLowerCase() === params.city.toLowerCase(),
    );

    // 2. Extrai os IDs das ORGs encontradas
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

    const page = params.page ?? 1;
    return pets.slice((page - 1) * 20, page * 20);
  }
}

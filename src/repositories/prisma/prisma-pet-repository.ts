import { Pet } from "@/generated/prisma/client";
import { PetUncheckedCreateInput } from "@/generated/prisma/models";
import { FindManyByOptionsParams } from "../in-memory/in-memory-pets-repository";
import { PetsRepository, PetWithRelations } from "../pets-repositore";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        petRequirements: true,
        petImages: true,
      },
    });

    return pet;
  }
  async findByCity(city: string, UF: string) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city,
          state: UF,
        },
      },
      include: {
        petRequirements: true,
        petImages: true,
      },
    });

    return pets;
  }
  async findManyByOptions(params: FindManyByOptionsParams) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: { equals: params.city, mode: "insensitive" },
          state: { equals: params.uf, mode: "insensitive" },
        },
        age: params.age,
        energy_level: params.energy_level,
        size: params.size,
        independence_level: params.independence_level,
      },
      take: 20,
      skip: (params.page ?? 1 - 1) * 20,
      include: {
        petRequirements: true,
        petImages: true,
      },
    });

    return pets;
  }
}

import { Pet, Prisma } from "@/generated/prisma/client";
import { PetUncheckedCreateInput } from "@/generated/prisma/models";
import { FindManyByOptionsParams } from "../in-memory/in-memory-pets-repository";
import { PetsRepository, PetWithRelations } from "../pets-repositore";
import { prisma } from "@/lib/prisma";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: PetUncheckedCreateInput) {
    try {
      const pet = await prisma.pet.create({
        data,
      });

      return pet;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2003"
      ) {
        throw new ResourceNotFoundError();
      }

      throw error;
    }
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
  async findManyByOptions(
    params: FindManyByOptionsParams,
  ): Promise<PetWithRelations[]> {
    const page = params.page ?? 1;
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: { equals: params.city, mode: "insensitive" },
          state: { equals: params.state, mode: "insensitive" },
        },
        age: params.age,
        animal_type: params.animal_type,
        energy_level: params.energy_level,
        size: params.size,
        independence_level: params.independence_level,
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        petRequirements: true,
        petImages: true,
      },
    });

    return pets;
  }
}

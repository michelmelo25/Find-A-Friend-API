import {
  Pet,
  Pet_image,
  Pet_Requirement,
  Prisma,
} from "@/generated/prisma/client";
import { FindManyByOptionsParams } from "./in-memory/in-memory-pets-repository";

export type PetWithRelations = Pet & {
  petRequirements: Pet_Requirement[];
  petImages: Pet_image[];
};

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet | null>;
  findById(id: string): Promise<PetWithRelations | null>;
  findByCity(city: string, UF: string): Promise<PetWithRelations[] | null>;
  findManyByOptions(
    params: FindManyByOptionsParams,
  ): Promise<PetWithRelations[]>;
}

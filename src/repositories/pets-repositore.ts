import { Pet, Prisma } from "@/generated/prisma/client";
import { FindManyByOptionsParams } from "./in-memory/in-memory-pets-repository";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findByCity(city: string, UF: string): Promise<Pet[] | null>;
  findManyByOptions(params: FindManyByOptionsParams): Promise<Pet[]>;
}

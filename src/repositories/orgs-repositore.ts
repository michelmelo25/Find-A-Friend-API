import { Org, Prisma } from "@/generated/prisma/client";

export interface FindhManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>;
  findByEmail(email: string): Promise<Org | null>;
  findByName(name: string): Promise<Org[] | null>;
  findByCep(cep: string): Promise<Org[] | null>;
  findByCity(city: string): Promise<Org[] | null>;
  findManyNearby(params: FindhManyNearbyParams): Promise<Org[] | null>;
  create(data: Prisma.OrgCreateInput): Promise<Org>;
}

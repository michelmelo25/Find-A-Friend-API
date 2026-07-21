import { Org, Prisma } from "@/generated/prisma/client";

export interface FindhManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>;
  findByEmail(email: string): Promise<Org | null>;
  findByMany(query: string, page: number): Promise<Org[] | null>;
  findManyNearby(params: FindhManyNearbyParams): Promise<Org[] | null>;
  create(data: Prisma.OrgCreateInput): Promise<Org>;
}

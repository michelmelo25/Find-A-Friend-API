import { prisma } from "@/lib/prisma";
import { Org, Prisma } from "@/generated/prisma/client";
import { FindhManyNearbyParams, OrgsRepository } from "../orgs-repositore";

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }
  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }
  async findByName(name: string): Promise<Org[] | null> {
    const org = await prisma.org.findMany({
      where: {
        name,
      },
    });

    return org;
  }
  async findByCep(cep: string): Promise<Org[] | null> {
    const orgs = await prisma.org.findMany({
      where: {
        cep,
      },
    });

    return orgs;
  }
  async findByCity(city: string): Promise<Org[] | null> {
    const orgs = await prisma.org.findMany({
      where: {
        city,
      },
    });

    return orgs;
  }
  async findByNeighborhood(
    city: string,
    neighborhood: string,
  ): Promise<Org[] | null> {
    const orgs = await prisma.org.findMany({
      where: {
        city,
        neighborhood,
      },
    });

    return orgs;
  }

  async findManyNearby({ latitude, longitude }: FindhManyNearbyParams) {
    const orgs = await prisma.$queryRaw<Org[]>`
    SELECT * from orgs
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * 
    cos( radians( latitude ) ) * cos( radians( longitude ) - 
    radians(${longitude}) ) + sin( radians(${latitude}) ) * 
    sin( radians( latitude ) ) ) ) <= 10`;

    return orgs;
  }
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}

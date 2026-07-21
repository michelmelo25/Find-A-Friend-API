import { prisma } from "@/lib/prisma";
import { Org, Prisma } from "@/generated/prisma/client";
import { FindhManyNearbyParams, OrgsRepository } from "../orgs-repositore";

export class PrismaOrgsRepository implements OrgsRepository {
  findByMany(query: string, page: number): Promise<Org[] | null> {
    throw new Error("Method not implemented.");
  }

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

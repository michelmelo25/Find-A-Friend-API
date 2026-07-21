import { Org, Prisma } from "@/generated/prisma/client";
import { FindhManyNearbyParams, OrgsRepository } from "../orgs-repositore";
import { Decimal } from "@prisma/client/runtime/client";

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: any[] = [];

  async findById(id: string): Promise<Org | null> {
    const org = this.orgs.find((item) => item.id === id);

    if (!org) {
      return null;
    }

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  findByMany(query: string, page: number): Promise<Org[] | null> {
    throw new Error("Method not implemented.");
  }

  findManyNearby(params: FindhManyNearbyParams): Promise<Org[] | null> {
    throw new Error("Method not implemented.");
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.orgs.push(org);

    return org;
  }
}

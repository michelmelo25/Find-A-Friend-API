import { Prisma } from "@/generated/prisma/client";

export class InMemoryOrgsRepository {
  public orgs: any[] = [];
  async create(data: Prisma.OrgCreateInput) {
    this.orgs.push(data);
  }
}

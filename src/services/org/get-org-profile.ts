import { Org } from "@/generated/prisma/client";
import { OrgsRepository } from "@/repositories/orgs-repositore";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetOrgProfileServiseRequest {
  orgId: string;
}

interface GetOrgProfileServiseResponse {
  org: Org;
}

export class GetOrgProfileService {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileServiseRequest): Promise<GetOrgProfileServiseResponse> {
    const org = await this.orgRepository.findById(orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    return { org };
  }
}

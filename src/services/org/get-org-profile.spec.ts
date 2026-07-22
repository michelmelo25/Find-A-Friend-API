import { beforeEach, describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { hash } from "bcryptjs";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { GetOrgProfileService } from "./get-org-profile";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let orgRepository: InMemoryOrgsRepository;
let sut: GetOrgProfileService;

describe("Get ORG Profile ORG Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    sut = new GetOrgProfileService(orgRepository);
  });

  it("should be able to to get profile", async () => {
    const { id } = await orgRepository.create({
      name: "Pets",
      email: faker.internet.email(),
      password_hash: await hash("123456", 6),
      whatsapp: "88999998888",
      cep: "63690000",
      state: "CE",
      city: "Solonópole",
      neighborhood: "Centro",
      latitude: "-5.7338",
      longitude: "-39.0125",
    });

    const { org } = await sut.execute({
      orgId: id,
    });

    expect(org.id).toEqual(id);
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        orgId: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});

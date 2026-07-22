import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateServise } from "./authenticate";
import { faker } from "@faker-js/faker";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-erros";

let orgRepository: InMemoryOrgsRepository;
let sut: AuthenticateServise;

describe("Authenticate ORG Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateServise(orgRepository);
  });

  it("should be able to authenticate", async () => {
    const emailOrgReister = faker.internet.email();

    await orgRepository.create({
      name: "Pets",
      email: emailOrgReister,
      password_hash: await hash("123456", 6),
      whatsapp: "88999998888",
      cep: "63690000",
      state: "CE",
      city: "Solonópole",
      neighborhood: "Centro",
      latitude: -5.7338,
      longitude: -39.0125,
    });

    const { org } = await sut.execute({
      email: emailOrgReister,
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const emailOrgReister = faker.internet.email();

    await expect(() =>
      sut.execute({
        email: emailOrgReister,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const emailOrgReister = faker.internet.email();

    await orgRepository.create({
      name: "Pets",
      email: emailOrgReister,
      password_hash: await hash("123456", 6),
      whatsapp: "88999998888",
      cep: "63690000",
      state: "CE",
      city: "Solonópole",
      neighborhood: "Centro",
      latitude: -5.7338,
      longitude: -39.0125,
    });

    await expect(() =>
      sut.execute({
        email: emailOrgReister,
        password: "123123",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});

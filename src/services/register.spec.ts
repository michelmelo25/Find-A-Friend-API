import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { EmailAlreadeExistsError } from "./errors/email-already-exists";

describe("Register ORG Use Case", () => {
  it("should be able to register", async () => {
    const orgRepository = new InMemoryOrgsRepository();
    const registerService = new RegisterService(orgRepository);

    const { org } = await registerService.execute({
      name: "Pets",
      email: faker.internet.email(),
      password: "123456",
      whatsapp: "88999998888",
      cep: "63690000",
      state: "CE",
      city: "Solonópole",
      neighborhood: "Centro",
      latitude: "-5.7338",
      longitude: "-39.0125",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should hash org password upon registration", async () => {
    const orgRepository = new InMemoryOrgsRepository();
    const registerService = new RegisterService(orgRepository);

    const { org } = await registerService.execute({
      name: "Pets",
      email: faker.internet.email(),
      password: "123456",
      whatsapp: "88999998888",
      cep: "63690000",
      state: "CE",
      city: "Solonópole",
      neighborhood: "Centro",
      latitude: "-5.7338",
      longitude: "-39.0125",
    });

    const isPasswordCorrectHashed = await compare("123456", org.password_hash);

    expect(isPasswordCorrectHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const orgRepository = new InMemoryOrgsRepository();
    const registerService = new RegisterService(orgRepository);

    await registerService.execute({
      name: "Pets",
      email: "contato03@pets.org",
      password: "123456",
      whatsapp: "88999998888",
      cep: "63690000",
      state: "CE",
      city: "Solonópole",
      neighborhood: "Centro",
      latitude: "-5.7338",
      longitude: "-39.0125",
    });

    await expect(() =>
      registerService.execute({
        name: "Pets",
        email: "contato03@pets.org",
        password: "123456",
        whatsapp: "88999998888",
        cep: "63690000",
        state: "CE",
        city: "Solonópole",
        neighborhood: "Centro",
        latitude: "-5.7338",
        longitude: "-39.0125",
      }),
    ).rejects.toBeInstanceOf(EmailAlreadeExistsError);
  });
});

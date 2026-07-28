import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { faker } from "@faker-js/faker";
import { Decimal } from "@prisma/client/runtime/client";
import { GetPetService } from "./get-pet";

let sut: GetPetService;
let orgRepository: InMemoryOrgsRepository;
let petRepository: InMemoryPetsRepository;

describe("Get PET Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    petRepository = new InMemoryPetsRepository(orgRepository);
    sut = new GetPetService(petRepository);
  });

  it("should be able to get a pet by id", async () => {
    const org = await orgRepository.create({
      name: `ONG Proteção Animal Fotaleza`,
      email: `contato@ongfotalezace}.org.br`,
      password_hash: "$2a$06$v8j33L16K3e7pS/Y8fXGJe8L5u1h4sX6", // Hash Bcrypt simulado
      whatsapp: faker.phone.number({ style: "national" }),
      cep: faker.location.zipCode("#####-###"),
      state: "CE",
      city: "Fortaleza",
      neighborhood: faker.location.street(),
      latitude: new Decimal("-3.736970"),
      longitude: new Decimal("-38.543441"),
      created_at: faker.date.past(),
    });

    const { id } = await petRepository.create({
      name: faker.person.firstName(),
      about: faker.lorem.paragraph(),
      age: faker.helpers.arrayElement(["BABY", "PUPPY", "ADULT", "SENIOR"]),
      size: faker.helpers.arrayElement(["SMALL", "MEDIUM", "BIG"]),
      energy_level: faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
      independence_level: faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
      environment: faker.helpers.arrayElement([
        "Ambiente amplo",
        "Apartamento",
        "Casa com quintal",
      ]),
      org_id: org.id,
      petRequirements: {
        create: [
          {
            title: "Espaço amplo para correr e brincar",
          },
          {
            title: "Não deixar fechado em locais pequenos",
          },
        ],
      },
      petImages: {
        create: [
          {
            url: "https://example.com/pet.jpg",
          },
        ],
      },
    });

    const { pet } = await sut.execute(id);

    expect(pet.id).toBe(id);
    expect(pet.petRequirements).toHaveLength(2);
    expect(pet.petImages).toHaveLength(1);
  });
});

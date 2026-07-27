import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetService } from "./get-pet";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { populatePets } from "@/utils/populated-pet";

let sut: GetPetService;
let orgRepository: InMemoryOrgsRepository;
let petRepository: InMemoryPetsRepository;

describe("GET PET Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    petRepository = new InMemoryPetsRepository(orgRepository);
    sut = new GetPetService(petRepository);
  });

  it("should be able to get a list of pets allowed in a city", async () => {
    const { pets_Populate, orgs } = populatePets();

    orgRepository.orgs = orgs;
    petRepository.items = pets_Populate;

    const { pets } = await sut.execute({
      city: "São Paulo",
      uf: "SP",
    });

    expect(pets).toHaveLength(4);
  });

  it("It should be possible to obtain a list of permitted pets by age.", async () => {
    const { pets_Populate, orgs } = populatePets();

    orgRepository.orgs = orgs;
    petRepository.items = pets_Populate;

    const { pets } = await sut.execute({
      city: "São Paulo",
      uf: "SP",
      age: "BABY",
    });
    // ["BABY", "PUPPY", "ADULT", "SENIOR"]

    const allMatchAge = pets.every((pet) => pet.age === "BABY");

    expect(pets).toBeInstanceOf(Array);
    expect(allMatchAge).toBe(true);
  });

  it("should be able to search pets by age", async () => {
    const { pets_Populate, orgs } = populatePets();

    orgRepository.orgs = orgs;
    petRepository.items = pets_Populate;

    const { pets } = await sut.execute({
      city: "São Paulo",
      uf: "SP",
      age: "BABY",
    });
    // ["BABY", "PUPPY", "ADULT", "SENIOR"]

    const allMatchAge = pets.every((pet) => pet.age === "BABY");

    expect(pets).toBeInstanceOf(Array);
    expect(allMatchAge).toBe(true);
  });
});

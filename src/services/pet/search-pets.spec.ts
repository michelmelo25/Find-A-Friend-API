import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetService } from "./search-pet";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { populatePets } from "@/utils/populated-pet";
import { Age, EnergyLevel, Size } from "@/generated/prisma/enums";

let sut: SearchPetService;
let orgRepository: InMemoryOrgsRepository;
let petRepository: InMemoryPetsRepository;

describe("Search PET Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    petRepository = new InMemoryPetsRepository(orgRepository);
    sut = new SearchPetService(petRepository);
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

  it("should be able to search pets by energy level", async () => {
    const { pets_Populate, orgs } = populatePets();
    orgRepository.orgs = orgs;
    petRepository.items = pets_Populate;

    const targetEnergy = "HIGH";

    const { pets } = await sut.execute({
      city: "São Paulo",
      uf: "SP",
      energy_level: targetEnergy,
    });

    expect(pets).toBeInstanceOf(Array);
    expect(pets.every((pet) => pet.energy_level === targetEnergy)).toBe(true);
  });

  it("should be able to search pets by size", async () => {
    const { pets_Populate, orgs } = populatePets();
    orgRepository.orgs = orgs;
    petRepository.items = pets_Populate;

    const targetSize = "SMALL";

    const { pets } = await sut.execute({
      city: "São Paulo",
      uf: "SP",
      size: targetSize,
    });

    expect(pets).toBeInstanceOf(Array);
    expect(pets.every((pet) => pet.size === targetSize)).toBe(true);
  });
  it("should be able to search pets by independence level", async () => {
    const { pets_Populate, orgs } = populatePets();
    orgRepository.orgs = orgs;
    petRepository.items = pets_Populate;

    const targetIndependence = "MEDIUM"; // ou IndependenceLevel.MEDIUM

    const { pets } = await sut.execute({
      city: "São Paulo",
      uf: "SP",
      independence_level: targetIndependence,
    });

    expect(pets).toBeInstanceOf(Array);
    expect(
      pets.every((pet) => pet.independence_level === targetIndependence),
    ).toBe(true);
  });

  it("should be able to search pets combining multiple optional filters", async () => {
    const { pets_Populate, orgs } = populatePets();
    orgRepository.orgs = orgs;
    petRepository.items = pets_Populate;

    const data = {
      city: "São Paulo",
      uf: "SP",
      age: Age.ADULT,
      size: Size.MEDIUM,
      energy_level: EnergyLevel.LOW,
    };

    const { pets } = await sut.execute(data);

    expect(pets).toBeInstanceOf(Array);
    expect(
      pets.every(
        (pet) =>
          pet.age === data.age &&
          pet.size === data.size &&
          pet.energy_level === data.energy_level,
      ),
    ).toBe(true);
  });

  it("should be able to paginate pets search", async () => {
    const { pets_Populate, orgs } = populatePets();
    orgRepository.orgs = orgs;
    petRepository.items = pets_Populate;

    // Busca a página 1 e 2 com limite padrão (geralmente 20 por página)
    const page1 = await sut.execute({
      city: "São Paulo",
      uf: "SP",
      page: 1,
    });

    const page2 = await sut.execute({
      city: "São Paulo",
      uf: "SP",
      page: 2,
    });

    expect(page1.pets).toBeInstanceOf(Array);
    expect(page2.pets).toBeInstanceOf(Array);

    // Garante que os resultados da página 2 não são iguais aos da página 1
    if (page1.pets.length > 0 && page2.pets.length > 0) {
      expect(page1.pets[0].id).not.toBe(page2.pets[0].id);
    }
  });
});

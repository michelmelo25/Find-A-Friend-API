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
      UF: "SP",
    });

    expect(pets).toHaveLength(4);
  });
});

import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetService } from "./register";

let petRepository: InMemoryPetsRepository;
let sut: RegisterPetService;

describe("Register PET Use Case", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository();
    sut = new RegisterPetService(petRepository);
  });

  it("should be able to register a pet", async () => {
    const { pet } = await sut.execute({
      name: "Coloral",
      about: "Cate top",
      age: "2",
      size: "SMALL",
      energy_level: "MEDIUM",
      independence_level: "MEDIUM",
      environment: "Domestico",
      org_id: "ORG-01",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});

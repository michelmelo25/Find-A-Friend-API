import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetService } from "./register";
import { makeRegisterPetInMemoryService } from "../factories/in-memory/make-register-pet-in-memory-service";

// let petRepository: InMemoryPetsRepository;
let sut: RegisterPetService;

describe("Register PET Use Case", () => {
  beforeEach(() => {
    // petRepository = new InMemoryPetsRepository();
    sut = makeRegisterPetInMemoryService();
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

import { fakerPT_BR } from "@faker-js/faker";

export async function GeneratePet() {
  return {
    name: fakerPT_BR.animal.petName(),
    about: fakerPT_BR.animal.cat(),
    age: ["BABY", "PUPPY", "ADULT", "SENIOR"][Math.floor(Math.random() * 4)],
    size: ["SMALL", "MEDIUM", "BIG"][Math.floor(Math.random() * 3)],
    energy_level: ["LOW", "MEDIUM", "HIGH"][Math.floor(Math.random() * 3)],
    independence_level: ["LOW", "MEDIUM", "HIGH"][
      Math.floor(Math.random() * 3)
    ],
    animal_type: ["DOG", "CAT"][Math.floor(Math.random() * 2)],
    environment: "Domestico",
    petRequirements: [fakerPT_BR.lorem.sentences()],
    petImages: [fakerPT_BR.lorem.sentence()],
  };
}

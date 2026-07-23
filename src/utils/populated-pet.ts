import {
  EnergyLevel,
  IndependenceLevel,
  Org,
  Pet,
  Size,
} from "@/generated/prisma/client";
import { faker } from "@faker-js/faker";
import { Decimal } from "@prisma/client/runtime/client";
import { randomUUID } from "node:crypto";

interface PopulatePetsResponse {
  pets_Populate: Pet[];
  orgs: Org[];
}

export function populatePets(): PopulatePetsResponse {
  // Cidades pré-definidas para garantir múltiplos registros por cidade
  const baseCities = [
    { city: "São Paulo", state: "SP", lat: -23.55052, lng: -46.633308 },
    { city: "Campinas", state: "SP", lat: -22.909938, lng: -47.062633 },
    { city: "Rio de Janeiro", state: "RJ", lat: -22.906847, lng: -43.172896 },
    { city: "Curitiba", state: "PR", lat: -25.428954, lng: -49.267137 },
    { city: "Belo Horizonte", state: "MG", lat: -19.916681, lng: -43.934493 },
  ];

  const sizes: Size[] = ["SMALL", "MEDIUM", "BIG"];
  const energyLevels: EnergyLevel[] = ["LOW", "MEDIUM", "HIGH"];
  const independenceLevels: IndependenceLevel[] = ["LOW", "MEDIUM", "HIGH"];

  // Gera 5 ORGs fictícias com todos os novos campos do modelo
  const orgs: Org[] = baseCities.map((location, index) => {
    const orgId = randomUUID();
    return {
      id: orgId,
      name: `ONG Proteção Animal ${location.city}`,
      email: `contato@ong${index + 1}${location.state.toLowerCase()}.org.br`,
      password_hash: "$2a$06$v8j33L16K3e7pS/Y8fXGJe8L5u1h4sX6", // Hash Bcrypt simulado
      whatsapp: faker.phone.number({ style: "national" }),
      cep: faker.location.zipCode("#####-###"),
      state: location.state,
      city: location.city,
      neighborhood: faker.location.street(),
      latitude: new Decimal(location.lat),
      longitude: new Decimal(location.lng),
      created_at: faker.date.past(),
    };
  });

  const pets: Pet[] = [];

  for (let i = 1; i <= 20; i++) {
    const petId = randomUUID();

    // Distribui os 20 pets entre as 5 ORGs/cidades (4 por cidade)
    const selectedOrg = orgs[i % orgs.length];

    const pet: Pet = {
      id: petId,
      name: faker.person.firstName(),
      about: faker.lorem.paragraph(),
      age: faker.helpers.arrayElement(["Filhote", "Adulto", "Sênior"]),
      size: faker.helpers.arrayElement(sizes),
      energy_level: faker.helpers.arrayElement(energyLevels),
      independence_level: faker.helpers.arrayElement(independenceLevels),
      environment: faker.helpers.arrayElement([
        "Ambiente amplo",
        "Apartamento",
        "Casa com quintal",
      ]),
      org_id: selectedOrg.id,
      //   org: selectedOrg,
      created_at: new Date(),
      //   petRequirements: [
      //     {
      //       id: randomUUID(),
      //       title: "Espaço amplo para correr e brincar",
      //       pet_id: petId,
      //     },
      //     {
      //       id: randomUUID(),
      //       title: "Não deixar fechado em locais pequenos",
      //       pet_id: petId,
      //     },
      //   ],
    };

    pets.push(pet);
  }

  return { pets_Populate: pets, orgs };
}

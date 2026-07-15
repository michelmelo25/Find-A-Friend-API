import fastify from "fastify";
import { prisma } from "./lib/prisma";
import { Prisma } from "./generated/prisma/client";

export const app = fastify();

// const prisma = new prisma();

prisma.org.create({
  data: {
    name: "Pet Feliz Solonópole",
    email: "contato@petfeliz.org",
    password_hash:
      "$2b$10$coYV6lH5gWp9I9uC2P8CBe1XG1U78Y6p3eH3q2vK8s4p2eG1o2D3y", // hash de exemplo para 'senha123'
    whatsapp: "88999998888",
    cep: "63690000",
    state: "CE",
    city: "Solonópole",
    neighborhood: "Centro",

    // Como os campos são Decimal no banco de dados:
    latitude: new Prisma.Decimal(-5.7338), // Coordenadas aproximadas de Solonópole
    longitude: new Prisma.Decimal(-39.0125),
  },
});

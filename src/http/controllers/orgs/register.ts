import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";

export async function register(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    whatsapp: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    latitude: z.string(),
    longitude: z.string(),
  });

  const org = registerBodySchema.parse(request.body);

  await prisma.org.create({
    data: {
      name: org.name,
      email: org.email,
      password_hash: org.password,
      whatsapp: org.whatsapp,
      cep: org.cep,
      state: org.state,
      city: org.city,
      neighborhood: org.neighborhood,
      latitude: new Prisma.Decimal(org.latitude),
      longitude: new Prisma.Decimal(org.longitude),
    },
  });

  return replay.status(201).send();
}

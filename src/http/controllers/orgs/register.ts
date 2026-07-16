import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterService } from "@/services/register";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";

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

  try {
    const orgsRepository = new PrismaOrgsRepository();
    const registerOrgService = new RegisterService(orgsRepository);

    await registerOrgService.execute(org);
  } catch (error) {
    return replay.status(409).send({});
  }

  return replay.status(201).send();
}

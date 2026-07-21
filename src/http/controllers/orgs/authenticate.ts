import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateServise } from "@/services/authenticate";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-erros";

export async function authenticate(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const orgsRepository = new PrismaOrgsRepository();
    const authenticateOrgService = new AuthenticateServise(orgsRepository);

    await authenticateOrgService.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return replay.status(400).send({ message: error.message });
    }
    throw error;
  }

  return replay.status(200).send();
}

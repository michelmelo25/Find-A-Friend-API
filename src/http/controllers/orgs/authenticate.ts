import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-erros";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";

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
    const authenticateOrgService = makeAuthenticateService();

    await authenticateOrgService.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return replay.status(400).send({ message: error.message });
    }
    throw error;
  }

  return replay.status(200).send();
}

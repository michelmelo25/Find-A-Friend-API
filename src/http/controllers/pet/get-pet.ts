import { makeGetPetService } from "@/services/factories/make-get-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getPet(request: FastifyRequest, replay: FastifyReply) {
  const petService = makeGetPetService();

  const petParamsSchema = z.object({
    id: z.uuid(),
  });

  try {
    const { id } = petParamsSchema.parse(request.params);

    const { pet } = await petService.execute(id);

    return replay.status(200).send({ pet });
  } catch (error) {
    return { error };
  }
}

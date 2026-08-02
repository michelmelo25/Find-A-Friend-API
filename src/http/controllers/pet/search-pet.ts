import {
  Age,
  AnimalType,
  EnergyLevel,
  IndependenceLevel,
  Size,
} from "@/generated/prisma/enums";
import { makeSearchPetService } from "@/services/factories/make-search-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function searchPet(request: FastifyRequest, replay: FastifyReply) {
  const searchService = makeSearchPetService();

  const searchQuerySchema = z.object({
    city: z.string(),
    state: z.string().length(2, "State must have exactly 2 letters."),
    age: z.enum(Age).optional(),
    animal_type: z.enum(AnimalType).optional(),
    energy_level: z.enum(EnergyLevel).optional(),
    size: z.enum(Size).optional(),
    independence_level: z.enum(IndependenceLevel).optional(),
    page: z.coerce.number().min(1).default(1),
  });

  try {
    const body = searchQuerySchema.parse(request.query);

    const { pets } = await searchService.execute(body);

    return replay.status(200).send({ pets });
  } catch (error) {
    return error;
  }
}

import {
  Age,
  AnimalType,
  EnergyLevel,
  IndependenceLevel,
  Size,
} from "@/generated/prisma/enums";
import { makeRegisterPetService } from "@/services/factories/make-register-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    name: z
      .string()
      .min(1, "O nome do pet é obrigatório.")
      .max(100, "O nome deve ter no máximo 100 caracteres."),
    about: z
      .string()
      .min(1, "A descrição sobre o pet é obrigatória.")
      .max(300, "A descrição deve ter no máximo 300 caracteres."),
    age: z.enum(Object.values(Age)),
    animal_type: z.enum(Object.values(AnimalType)),
    size: z.enum(Object.values(Size)),
    energy_level: z.enum(Object.values(EnergyLevel)),
    independence_level: z.enum(Object.values(IndependenceLevel)),
    environment: z.string().min(1, "O ambiente ideal é obrigatório."),
    org_id: z.uuid(),
    petRequirements: z.array(z.string().min(1)).optional(),
    petImages: z.array(z.string().min(1)).optional(),
  });

  const body = registerBodySchema.parse(request.body);

  try {
    const registerPetService = makeRegisterPetService();

    const { pet } = await registerPetService.execute(body);

    return replay.status(201).send({ pet });
  } catch (error) {
    throw error;
  }
}

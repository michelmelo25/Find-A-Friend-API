import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { EmailAlreadeExistsError } from "@/services/errors/email-already-exists";
import { makeRegisterOrgService } from "@/services/factories/make-register-org-service";

export async function register(request: FastifyRequest, replay: FastifyReply) {
  const nonEmtpyString = z
    .string()
    .trim()
    .min(1, "The field cannot be empty or contain only spaces.");

  const registerBodySchema = z.object({
    name: nonEmtpyString,
    email: z.email(),
    password: z.string().min(6),
    whatsapp: z.string().length(11, "WhatsApp number not provided or invalid."),
    cep: nonEmtpyString
      .transform((val) => val.replace(/\D/g, ""))
      .refine((val) => val.length === 8, {
        message: "zip code must contain 8 digits.",
      }),
    state: nonEmtpyString.length(2, "State must have exactly 2 letters."),
    city: nonEmtpyString,
    neighborhood: nonEmtpyString,
    latitude: z.number().refine((value) => Math.abs(value) <= 90, {
      error: "The latitude should be a number between -90 and 90 degrees.",
    }),
    longitude: z.number().refine((value) => Math.abs(value) <= 180, {
      error: "Longitude must be a valid number between -180 and 180 degrees.",
    }),
  });

  const org = registerBodySchema.parse(request.body);

  try {
    const registerOrgService = makeRegisterOrgService();

    await registerOrgService.execute(org);
  } catch (error) {
    if (error instanceof EmailAlreadeExistsError) {
      return replay.status(409).send({ message: error.message });
    }
    throw error;
  }

  return replay.status(201).send();
}

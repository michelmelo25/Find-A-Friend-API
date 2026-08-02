import fastify from "fastify";
import { orgsRoutes } from "./http/controllers/orgs/routes";
import z, { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { petsRoutes } from "./http/controllers/pet/routes";
import { ResourceNotFoundError } from "./services/errors/resource-not-found-error";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(orgsRoutes);
app.register(petsRoutes);

app.setErrorHandler((error, _, replay) => {
  if (error instanceof ZodError) {
    return replay
      .status(400)
      .send({ message: "Validation error.", issues: z.treeifyError(error) });
  }

  if (error instanceof ResourceNotFoundError) {
    return replay.status(404).send({ message: error.message });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return replay.status(500).send({ message: "Internal sever error." });
});

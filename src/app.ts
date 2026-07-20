import fastify from "fastify";
import { orgsRoutes } from "./http/controllers/orgs/routes";
import z, { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(orgsRoutes);

app.setErrorHandler((error, _, replay) => {
  if (error instanceof ZodError) {
    return replay
      .status(400)
      .send({ message: "Validation error.", issues: z.treeifyError(error) });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return replay.status(500).send({ message: "Internal sever error." });
});

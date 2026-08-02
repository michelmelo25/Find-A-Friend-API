import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getPet } from "./get-pet";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", register);
  app.get("/pets/:petId", getPet);
}

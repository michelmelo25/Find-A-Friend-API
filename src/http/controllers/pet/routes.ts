import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getPet } from "./get-pet";
import { searchPet } from "./search-pet";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", register);
  app.get("/pets/search", searchPet);
  app.get("/pets/:petId", getPet);
}

import { fakerPT_BR } from "@faker-js/faker";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function CreateAndAuthenticateOrg(app: FastifyInstance) {
  const email = fakerPT_BR.internet.email();

  await request(app.server)
    .post("/orgs")
    .send({
      name: `Pets ${fakerPT_BR.company.name()}`,
      email,
      password: "123456",
      whatsapp: fakerPT_BR.phone.number(),
      cep: fakerPT_BR.location.zipCode(),
      state: fakerPT_BR.location.state({ abbreviated: true }),
      city: fakerPT_BR.location.city(),
      neighborhood: "Centro",
      latitude: fakerPT_BR.location.latitude(),
      longitude: fakerPT_BR.location.longitude(),
    });

  const authResponse = await request(app.server).post("/sessions").send({
    email,
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token, email };
}

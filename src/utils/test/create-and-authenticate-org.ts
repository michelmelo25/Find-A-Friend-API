import { Faker, pt_BR, en } from "@faker-js/faker";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function CreateAndAuthenticateOrg(app: FastifyInstance) {
  const faker = new Faker({
    locale: [pt_BR, en],
  });

  const email = faker.internet.email();

  const response = await request(app.server)
    .post("/orgs")
    .send({
      name: `Pets ${faker.company.name()}`,
      email,
      password: "123456",
      whatsapp: faker.phone.number(),
      cep: faker.location.zipCode(),
      state: faker.location.state({ abbreviated: true }),
      city: faker.location.city(),
      neighborhood: "Centro",
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    });

  const { org } = response.body.org;

  const authResponse = await request(app.server).post("/sessions").send({
    email,
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token, email, org };
}

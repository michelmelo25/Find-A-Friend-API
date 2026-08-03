import { app } from "@/app";
import { fakerPT_BR } from "@faker-js/faker";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate ORG E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate a org", async () => {
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

    const response = await request(app.server).post("/sessions").send({
      email,
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});

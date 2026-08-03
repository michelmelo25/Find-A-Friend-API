import { app } from "@/app";
import { CreateAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-user";
import { fakerPT_BR } from "@faker-js/faker";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get profile a ORG e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get profile a org", async () => {
    const { token, email } = await CreateAndAuthenticateOrg(app);

    const response = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.org).toEqual(expect.objectContaining({ email }));
  });
});

import { app } from "@/app";
import request from "supertest";
import { CreateAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { GeneratePet } from "@/utils/test/generate-pet";

describe("Register PET E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to register a pet", async () => {
    const { token, email } = await CreateAndAuthenticateOrg(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(await GeneratePet());

    expect(response.statusCode).toEqual(201);
  });
});

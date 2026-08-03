import { app } from "@/app";
import { CreateAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { GeneratePet } from "@/utils/test/generate-pet";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("GET PET E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get a pet", async () => {
    const { token, email } = await CreateAndAuthenticateOrg(app);

    const petCreated = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(await GeneratePet());

    const petResponse = await request(app.server).get(
      `/pets/${petCreated.body.pet.id}`,
    );

    expect(petResponse.statusCode).toEqual(200);
    expect(petResponse.body.pet.id).toEqual(petCreated.body.pet.id);
  });
});

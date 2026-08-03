import { app } from "@/app";
import request from "supertest";
import { CreateAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { GeneratePet } from "@/utils/test/generate-pet";

describe("Search a PET E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Shoude be able a search pet", async () => {
    const { token, email, org } = await CreateAndAuthenticateOrg(app);

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(await GeneratePet());
    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(await GeneratePet());
    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(await GeneratePet());
    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(await GeneratePet());

    const searchPet = await request(app.server).get("/pets/search").query({
      city: org.city,
      state: org.state,
    });

    expect(searchPet.statusCode).toEqual(200);
    expect(searchPet.body.pets).toHaveLength(4);
  });

  it("Shoude be able filter search a pet", async () => {
    const { token, email, org } = await CreateAndAuthenticateOrg(app);

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(await GeneratePet());
    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(await GeneratePet());
    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(await GeneratePet());
    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(await GeneratePet());

    const searchPet = await request(app.server).get("/pets/search").query({
      city: org.city,
      state: org.state,
      age: "BABY",
    });

    expect(searchPet.statusCode).toEqual(200);
    expect(searchPet.body.pets).toEqual(expect.any(Array));
  });
});

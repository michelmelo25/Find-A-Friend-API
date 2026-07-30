import { makeGetOrgService } from "@/services/factories/make-get-org-service";
import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, replay: FastifyReply) {
  const getOrgProfile = makeGetOrgService();

  const { org } = await getOrgProfile.execute({
    orgId: request.user.sub,
  });

  return replay.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  });
}

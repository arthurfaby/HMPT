import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { Match } from "../../models/match_model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const authenticatedUser = await getAuthenticatedUser(req.sessionID);
  if (!authenticatedUser || !authenticatedUser.id) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }

  const likers = await Match.select({
    liked_id: {
      equal: authenticatedUser.id,
    },
  });

  return res.status(200).send(likers.map((like) => like.dto));
});

export default router;

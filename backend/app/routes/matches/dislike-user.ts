import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { Dislike } from "../../models/dislike_model";

const router = Router();

router.post("/dislikeUser/:id", async (req: Request, res: Response) => {
  const authUser = await getAuthenticatedUser(req.sessionID);

  if (!authUser || !authUser.id) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }

  const userToLikeId = req.params.id;

  if (userToLikeId.match(/^[0-9]+$/) === null) {
    return res.status(400).send({
      error: "Invalid user ID",
    });
  }

  const existingDislike = await Dislike.select({
    disliker_id: {
      equal: authUser.id,
    },
    disliked_id: {
      equal: parseInt(userToLikeId),
    },
  });

  if (existingDislike.length > 0) {
    return res.status(200).send(existingDislike[0].dto);
  }

  const dislike = new Dislike({
    disliker_id: authUser.id,
    disliked_id: parseInt(userToLikeId),
  });

  await dislike.create();

  return res.status(200).send(dislike.dto);
});

export default router;

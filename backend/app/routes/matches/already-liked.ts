import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { User } from "../../models/user_model";
import { Match } from "../../models/match_model";
import createNotifications from "../notifications/create-notifications";
import { io } from "../../app";

const router = Router();

router.get("/alreadyLiked/:id", async (req: Request, res: Response) => {
  const authUser = await getAuthenticatedUser(req.sessionID);
  if (!authUser || !authUser.id) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }

  if (req.params.id.match(/^[0-9]+$/) === null) {
    return res.status(400).send({
      error: "Invalid user id",
    });
  }

  const userId = parseInt(req.params.id);
  if (userId === authUser.id) {
    return res.status(400).send({
      error: "You cannot cancel a match with yourself",
    });
  }

  const like = (
    await Match.select({
      liker_id: { equal: authUser.id },
      liked_id: { equal: userId },
    })
  )[0];

  const match = (
    await Match.select({
      liker_id: { equal: userId },
      liked_id: { equal: authUser.id },
    })
  )[0];


  return res.status(200).send({
    liked: like ? true : false,
    matched: match ? true : false,
  });
});

export default router;

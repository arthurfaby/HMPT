import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { User } from "../../models/user_model";
import { Match } from "../../models/match_model";

const router = Router();

router.post("/cancel/:id", async (req: Request, res: Response) => {
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

  const users = await User.select({ id: { equal: userId } });
  if (users.length === 0) {
    return res.status(404).send({
      error: "User not found",
    });
  }

  const user = users[0];
  if (user.id == null) {
    return res.status(404).send({
      error: "User not found",
    });
  }

  // authUser.id is liker_id
  const matches = await Match.select({
    liker_id: { equal: authUser.id },
    liked_id: { equal: user.id },
  });
  if (matches.length === 0) {
    return res.status(404).send({
      error: "Match not found",
    });
  }

  const match = matches[0];
  await match.delete();
  return res.status(200).send(match.dto);
});

export default router;

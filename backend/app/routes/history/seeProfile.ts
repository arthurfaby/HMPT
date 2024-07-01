import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { History } from "../../models/history_model";

const router = Router();

router.post("/seeProfile/:userId", async (req: Request, res: Response) => {
  const authenticatedUser = await getAuthenticatedUser(req.sessionID);
  if (!authenticatedUser || !authenticatedUser.id) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }

  const userId = req.params.userId;
  if (userId.match(/^\d+$/) == null) {
    return res.status(400).send({
      error: "Invalid user id",
    });
  }

  const existingHistory = await History.select({
    visitor_id: {
      equal: authenticatedUser.id,
    },
    visited_id: {
      equal: parseInt(userId),
    },
  });

  if (existingHistory.length > 0) {
    existingHistory[0].date = new Date();
    await existingHistory[0].update();
    return res.status(200).send(existingHistory[0].dto);
  }

  const history = new History({
    visitor_id: authenticatedUser.id,
    visited_id: parseInt(userId),
    date: new Date().toISOString(),
  });

  await history.create();
  return res.status(200).send(history.dto);
});

export default router;

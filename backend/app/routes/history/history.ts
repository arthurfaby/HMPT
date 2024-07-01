import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { History } from "../../models/history_model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const authenticatedUser = await getAuthenticatedUser(req.sessionID);
  if (!authenticatedUser || !authenticatedUser.id) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }

  const histories = await History.select({
    visitor_id: {
      equal: authenticatedUser.id,
    },
  });

  return res.status(200).send(histories.map((history) => history.dto));
});

export default router;

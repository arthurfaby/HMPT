import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../utils/auth/getAuthenticatedUser";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const user = await getAuthenticatedUser(req.sessionID);
  if (!user) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  return res.status(200).send(user.dto);
});

export default router;

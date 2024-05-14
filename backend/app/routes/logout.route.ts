import { Router, Request, Response } from "express";
import { Session } from "../models/session_model";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  console.log(req.sessionID);
  const sessions = await Session.select({
    token: {
      equal: req.sessionID,
    },
  });
  if (sessions[0]) {
    await sessions[0].delete();
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});

export default router;

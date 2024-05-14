import { Router, Request, Response } from "express";
import { Session } from "../models/session_model";
import { User } from "../models/user_model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const session = (
    await Session.select({ token: { equal: req.sessionID } })
  )[0];
  const user = (
    await User.select({
      id: {
        equal: session.userId,
      },
    })
  )[0];
  return res.status(200).send(user.dto);
});

export default router;

import { Router, Request, Response } from "express";
import db from "../database";
import { User } from "../models/user_model";
import { Session } from "../models/session_model";
import { SessionDto } from "../dtos/session_dto";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  //const result = await db.query('SELECT username FROM users')
  const users = await User.select({
    username: {
      equal: req.body.username,
    },
  });
  if (users.length === 0) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { password, id } = users[0];
  if (password === req.body.password) {
    const session = new Session({
      user_id: id,
      token: req.sessionID,
    } as SessionDto);
    await session.create();
    res.status(200).send("auth");
  } else {
    res.status(401).send("Unauthorized");
  }
});

export default router;

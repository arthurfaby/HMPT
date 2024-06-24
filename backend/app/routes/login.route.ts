import { Router, Request, Response } from "express";
import { User } from "../models/user_model";
import { Session } from "../models/session_model";
import { SessionDto } from "../dtos/session_dto";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const users = await User.select({
    username: {
      equal: req.body.username,
    },
  });
  console.log(req.body, users)
  if (users.length === 0) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { password, id } = users[0];
  const compare = await bcrypt.compare(req.body.password, password);
  console.log(compare)
  if (compare) {
    const session = new Session({
      user_id: id,
      token: req.sessionID,
    } as SessionDto);
    await session.create();
    res.status(200).send(users[0]);
  } else {
    res.status(401).send("Unauthorized");
  }
});

export default router;

import { Router, Request, Response } from "express";
import { User } from "../models/user_model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await User.select();
  const usersDto = users.map((user) => user.dto);
  return res.json(usersDto);
});

export default router;

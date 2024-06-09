import { Router, Request, Response } from "express";
import UserFactory from "../../factories/user_factory";

const router = Router();

router.get("/create_user", async (req: Request, res: Response) => {
  const user = await UserFactory.createOne();
  return res.json(user.dto);
});

router.get("/create_users/:number", async (req: Request, res: Response) => {
  const number = parseInt(req.params.number);
  const users = await UserFactory.createMany(number);
  const usersDto = users.map((user) => user.dto);
  return res.json(usersDto);
});

export default router;

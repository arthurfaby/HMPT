import { Router, Request, Response } from "express";
import { User } from "../../models/user_model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await User.select();
  const usersDto = users.map((user) => user.dto);
  return res.json(usersDto);
});

router.get("/:ids", async (req: Request, res: Response) => {
  const rawParamIds = req.params.ids;
  if (rawParamIds.match(/^(?:\d+)(?:,\d+)*$/) == null) {
    return res.status(400).send({
      error: "Invalid user ids",
    });
  }

  const tmpUserIds = rawParamIds.split(",").map((id) => parseInt(id));
  // Remove duplicates
  const userIds = [...new Set(tmpUserIds)];
  const users: User[] = [];
  for (const userId of userIds) {
    const user = await User.select({
      id: {
        equal: userId,
      },
    });
    if (user.length > 0) {
      users.push(user[0]);
    }
  }

  return res.status(200).send(users.map((user) => user.dto));
});

export default router;

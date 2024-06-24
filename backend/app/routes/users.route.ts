import { Router, Request, Response } from "express";
import { User } from "../models/user_model";
import getAuthenticatedUser from "../utils/auth/getAuthenticatedUser";
import { getGPSDistance } from "../utils/getGPSDistance";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await User.select();
  const usersDto = users.map((user) => user.dto);
  return res.json(usersDto);
});

router.get("/distance/:id", async (req: Request, res: Response) => {
  const authUser = await getAuthenticatedUser(req.sessionID);
  if (!authUser) {
    return res.status(404).send({
      error: "User not found",
    });
  }
  if (req.params.id.match(/^[0-9]+$/) === null) {
    return res.status(400).send({
      error: "Invalid user id",
    });
  }

  const userId = parseInt(req.params.id);
  if (userId === authUser.id) {
    return res.status(400).send({
      error: "You cannot calculate distance with yourself",
    });
  }

  const user = await User.select({ id: { equal: userId } });
  if (user.length === 0) {
    return res.status(404).send({
      error: "User not found",
    });
  }

  const distance = getGPSDistance(authUser.geolocation, user[0].geolocation);
  return res.status(200).json({ distance });
});

export default router;

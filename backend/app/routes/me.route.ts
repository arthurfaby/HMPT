import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../utils/auth/getAuthenticatedUser";
import { User } from "../models/user_model";
import { UserDto } from "../dtos/user_dto";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const user = await getAuthenticatedUser(req.sessionID);
  console.log(user)
  if (!user) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  return res.status(200).send(user.dto);
});

router.post("/update", async (req: Request, res: Response) => {
  try {
      const user: User = new User(req.body) 
      await user.update()
      return res.status(200).send("user updated")
    }
  catch(error){
    console.log(error)
    return res.status(501).send("error server")
  }
});

export default router;

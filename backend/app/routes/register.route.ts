import { Router, Request, Response } from "express";
import { User } from "../models/user_model";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  //const result = await db.query('SELECT username FROM users')
  const userDto = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    first_name: req.body.firstName,
    last_name: req.body.lastname
  }
  console.log(userDto)
  try {
    const user = new User(userDto)
    await user.hash()
    await user.create()
    res.status(200).send("user created")
  }
  catch (error){
    console.error(error)
    res.status(401).send("server error")
  }
});

export default router;

import { Router, Request, Response } from "express";
import { User } from "../models/user_model";
import { Preference } from "../models/preference_model";
import { Session } from "../models/session_model";
import { SessionDto } from "../dtos/session_dto";

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
  try {
    const user = new User(userDto)
    user.pictures = ["", "", "", "", "", ""]
    await user.hash()
    await user.create()
    const newUser = await User.select({username: {equal: user.username}})
    if(newUser.length > 0 && newUser[0].id !== undefined) {
      const userPreference = new Preference({
        user_id: newUser[0].id,
        age_gap_min: 18,
        fame_rating_min: 0,
        sexual_preference: "bisexual",
        location: {
          x: 0,
          y: 0
        }
      })
      await userPreference.create()
      const session = new Session({
        user_id: newUser[0].id,
        token: req.sessionID,
      } as SessionDto);
      await session.create();
     const newSession = await Session.select({token: {equal: req.sessionID}})
      console.log(newSession)

    }
    res.status(200).send(user.dto)
  }
  catch (error){
    console.error(error)
    res.status(401).send("server error")
  }
});

export default router;

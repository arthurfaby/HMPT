import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../utils/auth/getAuthenticatedUser";
import { Preference } from "../models/preference_model";

const router = Router()

router.get("/sexualPreference", async(req: Request, res: Response) => {

    const user = await getAuthenticatedUser(req.sessionID);
    if(!user || !user.id)
        return res.status(401).send({error: "not authorized"})
    const sexualPreference = await Preference.select({user_id: {equal: user.id}}) 
    console.log(sexualPreference[0])
    return res.status(200).send("bisexual")
})

export default router
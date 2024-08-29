import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../utils/auth/getAuthenticatedUser";
import { Preference } from "../models/preference_model";

const router = Router();

router.get("/sexualPreference", async (req: Request, res: Response) => {
  const user = await getAuthenticatedUser(req.sessionID);
  if (!user || !user.id)
    return res.status(401).send({ error: "not authorized" });
  const sexualPreference = await Preference.select({
    user_id: { equal: user.id },
  });
  if (sexualPreference.length > 0)
    return res
      .status(200)
      .send({ sexualPreference: sexualPreference[0].sexualPreference });
  else return res.status(400).send({ error: "bad request" });
});

router.post("/sexualPreference", async (req: Request, res: Response) => {
  const user = await getAuthenticatedUser(req.sessionID);
  if (!user || !user.id)
    return res.status(401).send({ error: "not authorized" });
  const sexualPreference = await Preference.select({
    user_id: { equal: user.id },
  });
  if (!sexualPreference) return res.status(400).send({ error: "bad request" });
  sexualPreference[0].sexualPreference = req.body.sexualPreference;
  await sexualPreference[0].update();
  return res.status(200).send("ok");
});

router.get("/preferences", async (req: Request, res: Response) => {
  const user = await getAuthenticatedUser(req.sessionID);
  if (!user || !user.id)
    return res.status(401).send({ error: "not authorized" });
  const sexualPreference = await Preference.select({
    user_id: { equal: user.id },
  });
  if (sexualPreference.length > 0)
    return res.status(200).send(sexualPreference[0].dto);
  else return res.status(400).send({ error: "bad request" });
});

router.post("/preferences", async (req: Request, res: Response) => {
  const preferenceUser = new Preference(req.body);
  await preferenceUser.update();
  return res.status(200).send("ok");
});

export default router;

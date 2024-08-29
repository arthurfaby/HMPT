import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";

const router = Router();
router.post("/geolocation", async (req: Request, res: Response) => {
  const authUser = await getAuthenticatedUser(req.sessionID);
  if (!authUser) {
    return res.status(404).send({
      error: "User not found",
    });
  }

  const { latitude, longitude } = req.body;
  if (
    !latitude ||
    !longitude ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).send({
      error: "Invalid request",
    });
  }

  if (authUser.geolocation.latitude && authUser.geolocation.longitude)
    return res.status(200).send({
    geolocation: authUser.geolocation,
  })
  
  authUser.geolocation = {
    latitude,
    longitude,
  };

  await authUser.update();
  return res.status(200).send({
    geolocation: authUser.geolocation,
  });
});

export default router;

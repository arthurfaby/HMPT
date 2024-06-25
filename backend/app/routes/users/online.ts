import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";

const router = Router();

router.post("/online", async (req: Request, res: Response) => {
  const authUser = await getAuthenticatedUser(req.sessionID);
  if (!authUser || !authUser.id) {
    return res.status(404).send({
      error: "User not found",
    });
  }

  const body = req.body;
  if (body.online == null || typeof body.online !== "boolean") {
    return res.status(400).send({
      error: "Invalid request. Body must contain a boolean 'online' field",
    });
  }

  const typedBody: { online: boolean } = body as { online: boolean };
  authUser.online = typedBody.online;
  if (authUser.online) {
    authUser.lastOnlineDate = new Date();
  }
  await authUser.update();
  return res.status(200).json({ online: authUser.online });
});

export default router;

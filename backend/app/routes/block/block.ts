import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { Block } from "../../models/block_model";
import { User } from "../../models/user_model";

const router = Router();

router.post("/:userId", async (req: Request, res: Response) => {
  const authenticatedUser = await getAuthenticatedUser(req.sessionID);
  if (!authenticatedUser || !authenticatedUser.id) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }

  const userId = req.params.userId;
  if (userId.match(/^\d+$/) == null) {
    return res.status(400).send({
      error: "Invalid user id",
    });
  }

  const existingBlock = await Block.select({
    blocker_id: {
      equal: authenticatedUser.id,
    },
    blocked_id: {
      equal: parseInt(userId),
    },
  });

  if (existingBlock.length > 0) {
    return res.status(200).send(existingBlock[0].dto);
  }

  const block = new Block({
    blocker_id: authenticatedUser.id,
    blocked_id: parseInt(userId),
  });

  await block.create();

  const blockedUser = await User.select({ id: { equal: parseInt(userId) } });
  if (blockedUser.length > 0) {
    blockedUser[0].fameRating = blockedUser[0].fameRating * 0.9;
    if (blockedUser[0].fameRating < 0) {
      blockedUser[0].fameRating = 0;
    }
    await blockedUser[0].update();
  }
  
  return res.status(200).send(block.dto);
});

export default router;

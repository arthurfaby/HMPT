import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { User } from "../../models/user_model";
import { Chat } from "../../models/chat_model";

const router = Router();

router.get("/chatUserIds", async (req: Request, res: Response) => {
  const authUser = await getAuthenticatedUser(req.sessionID);
  if (!authUser || authUser.id == null) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }

  const chats1 = await Chat.select({
    user1_id: {
      equal: authUser.id,
    },
  });

  const chats2 = await Chat.select({
    user2_id: {
      equal: authUser.id,
    },
  });

  const chats = [...chats1, ...chats2];

  const chatUserIds = chats.map((chat) => {
    return {
      userId: chat.userId1 == authUser.id ? chat.userId2 : chat.userId1,
      firstName: "",
    };
  });

  for (const userId of chatUserIds) {
    const user = (
      await User.select({
        id: {
          equal: userId.userId,
        },
      })
    )[0];

    userId.firstName = user.firstName;
  }

  return res.status(200).send(chatUserIds);
});

export default router;

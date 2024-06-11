import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { ChatDto } from "../../dtos/chat_dto";
import { MessageDto } from "../../dtos/message_dto";
import { UserDto } from "../../dtos/user_dto";
import { User } from "../../models/user_model";
import { Chat } from "../../models/chat_model";
import { Message } from "../../models/message_model";

const router = Router();

type ChatData = {
  user: UserDto;
  chat: ChatDto;
  messages: MessageDto[];
};

router.get("/:userId", async (req: Request, res: Response) => {
  const authUser = await getAuthenticatedUser(req.sessionID);
  if (!authUser || authUser.id == null) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }
  const userId = req.params.userId;
  if (userId.match(/^\d+$/) == null) {
    return res.status(400).send({
      error: "Bad request",
    });
  }

  if (parseInt(userId) === authUser.id) {
    return res.status(400).send({
      error: "Bad request",
    });
  }

  const user = (
    await User.select({
      id: {
        equal: parseInt(userId),
      },
    })
  )[0];

  if (!user) {
    return res.status(404).send({
      error: "User not found",
    });
  }

  const chat = (
    await Chat.select({
      user1_id: {
        equal: authUser.id,
      },
      user2_id: {
        equal: parseInt(userId),
      },
    })
  )[0];

  if (!chat || chat.id == null) {
    return res.status(404).send({
      error: "Chat not found",
    });
  }

  const messages = await Message.select({
    chat_id: {
      equal: chat.id,
    },
  });

  const chatData: ChatData = {
    user: user.dto,
    chat: chat.dto,
    messages: messages.map((message) => message.dto),
  };

  return res.status(200).send(chatData);
});

export default router;

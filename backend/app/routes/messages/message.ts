import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { ChatDto } from "../../dtos/chat_dto";
import query from "../../libs/orm/queries/abstract_query";
import { Message } from "../../models/message_model";
import { Chat } from "../../models/chat_model";
import { io } from "../../app";
import validateInput from "../../libs/orm/utils/check_injections";

const router = Router();

router.post("/:chatId", async (req: Request, res: Response) => {
  const chatId = req.params.chatId;
  if (chatId.match(/^\d+$/) == null) {
    return res.status(400).send({
      error: "Invalid chat id",
    });
  }

  const chat = (
    await Chat.select({
      id: {
        equal: chatId,
      },
    })
  )[0];

  if (!chat || !chat.id) {
    return res.status(404).send({
      error: "Chat not found",
    });
  }

  const messageContent = req.body.message;
  if (!messageContent || messageContent.length === 0) {
    return res.status(400).send({
      error: "Message cannot be empty",
    });
  }

  const authUser = await getAuthenticatedUser(req.sessionID);
  if (!authUser || authUser.id == null) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }

  const message = new Message({
    chat_id: parseInt(chatId),
    user_id: authUser.id,
    content: messageContent,
    seen: false,
    date: new Date().toISOString(),
  });

  await message.create();
  const messageWithId = (
    await Message.select({
      chat_id: {
        equal: chatId,
      },
      user_id: {
        equal: authUser.id,
      },
      date: {
        equal: message.date.toISOString(),
      },
      seen: {
        equal: false,
      },
      content: {
        equal: validateInput(messageContent),
      },
    })
  )[0];
  if (!messageWithId || !messageWithId.id) {
    return res.status(500).send({
      error: "Internal server error",
    });
  }
  io.to(`chat-${chatId}`).emit("message", messageWithId.dto);

  return res.status(200).send(messageWithId.dto);
});

export default router;

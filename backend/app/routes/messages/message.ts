import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { ChatDto } from "../../dtos/chat_dto";
import query from "../../libs/orm/queries/abstract_query";
import { Message } from "../../models/message_model";
import { Chat } from "../../models/chat_model";

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

  return res.status(200).send(message.dto);
});

export default router;

import { Socket } from "socket.io";
import { MessageDto } from "../../dtos/message_dto";
import { Message } from "../../models/message_model";

export function eventMessages(socket: Socket) {
  socket.on("seen", async (data: MessageDto) => {
    if (data.id == null) {
      return;
    }
    const messages = await Message.select({
      id: {
        equal: data.id,
      },
    });
    messages[0].seen = true;
    await messages[0].update();

    socket.to(`chat-${messages[0].chatId}`).emit("seen", messages[0].dto);
  });
}

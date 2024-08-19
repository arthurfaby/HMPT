import { Socket } from "socket.io";
import { NotificationDto } from "../../dtos/notification_dto";
import { Notification } from "../../models/notification_model";
import { MessageDto } from "../../dtos/message_dto";

export function eventNotifications(socket: Socket) {
  socket.on("read", async (data: MessageDto) => {
    if (data.id == null) {
      return;
    }

    const notification = await Notification.select({
        id: {
            equal: data.id,
        },
    });
    notification[0].seen = true;
    await notification[0].update();
  });
}
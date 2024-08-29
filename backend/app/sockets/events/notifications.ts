import { Socket } from "socket.io";
import { NotificationDto } from "../../dtos/notification_dto";
import {
  Notification,
  NOTIFICATION_TABLE_NAME,
} from "../../models/notification_model";

export function eventNotifications(socket: Socket) {
  socket.on("read", async (data: NotificationDto) => {
    if (data.id == null) {
      return;
    }

    if (data.chat_id) {
      const notification = await Notification.select({
        user_id: {
          equal: data.id,
        },
        chat_id: {
          equal: data.chat_id,
        },
      });
      return notification.map(async (notification) => {
        if (notification.chat_id && notification.chat_id == data.chat_id)
          notification.seen = true;
        await notification.update();
        socket.emit("read", notification.chat_id);
      });
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

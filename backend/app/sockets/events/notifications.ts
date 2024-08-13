import { Socket } from "socket.io";
import { NotificationDto } from "../../dtos/notification_dto";
import { Notification } from "../../models/notification_model";

export function eventNotifications(socket: Socket) {
  socket.on("notification", async (data: NotificationDto) => {
    if (data.id == null) {
      return;
    }

    const notification = await Notification.select({
        id: {
            equal: data.id,
        },
    });
    socket.emit("notification", notification[0].dto);
  });
}
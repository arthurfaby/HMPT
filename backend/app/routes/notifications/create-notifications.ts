import { Notification } from "../../models/notification_model";
import socketClient from "../../sockets/init";

export default async function createNotifications(message: string, userReceiverId: number, chat_id: number | undefined) {
       const notification = new Notification({
    user_id: userReceiverId,
    message: message,
    seen: false,
    date: new Date(),
    chat_id: chat_id
  })
  await notification.create();
  setTimeout(async () => {
    const sendNotification = await Notification.select({
      user_id: {
        equal: userReceiverId
      },
      message: {
        equal: message
      }
    })
    if (sendNotification.length > 0 && sendNotification.at(-1)) {
      const socketReceiver = socketClient[userReceiverId];
      if(socketReceiver) {
        socketReceiver.emit("notification", sendNotification.sort((a, b) => b.date.getTime() - a.date.getTime())[0].dto);
      }
  }
  }, 200)
  
}
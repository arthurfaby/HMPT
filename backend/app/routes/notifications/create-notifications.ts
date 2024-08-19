import { Notification } from "../../models/notification_model";
import { User } from "../../models/user_model";
import socketClient from "../../sockets/init";

async function checkChatExisting(userReceiverId: number, chat_id: number | undefined) {
  if(chat_id){
    const notification = await Notification.select({
       user_id: {
          equal: userReceiverId,
        },
        chat_id: {
          equal: chat_id
        },
        seen: {
          equal: false
        }
    })
    if(notification.length > 0)
      return true
    return false
  }
  return false
}

export default async function createNotifications(message: string, userReceiverId: number, chat_id: number | undefined) {
    if(await checkChatExisting(userReceiverId, chat_id))
      return

    const notification = new Notification({
    user_id: userReceiverId,
    message: message,
    seen: false,
    date: new Date().toDateString(),
    chat_id: chat_id
  })
  await notification.create();
  const socketReceiver = socketClient[userReceiverId];
  if(socketReceiver) {
    console.log(notification.dto)
    socketReceiver.emit("notification", notification.dto);
  }
}
import { apiUrl } from "@/config/apiUrl";
import { NotificationDto } from "@/dtos/notification_dto";
import ky from "ky";

export async function getNotifications(): Promise<NotificationDto[] | null>{
  try {
    const notification: NotificationDto[] =  await ky.get(`${apiUrl}/notifications`, {
    credentials: "include"
    }).json();
    notification.map((notif) => notif.date = new Date(notif.date))
    return notification
  }
  catch {
    return null 
  }
 
} 

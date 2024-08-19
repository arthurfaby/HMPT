import { apiUrl } from "@/config/apiUrl";
import ky from "ky";

export async function getNotifications() {
  return await ky.get(`${apiUrl}/notifications`, {
    credentials: "include"
  }).json();
} 

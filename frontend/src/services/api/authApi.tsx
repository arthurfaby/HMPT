import ky from "ky";
import {apiUrl} from '@/config/apiUrl';
import User from "@/types/user";

export async function postLogin(user: {
  username: string;
  password: string;
}): Promise<User | null> {
  try {
        return await ky.post(`${apiUrl}/login`, {
            credentials: "include",
            json: user,
          }).json();
  }
  catch(error){
    return null
  }
}

export async function getUser(): Promise<User | null> {
  try {
    return await ky
    .get(`${apiUrl}/me`, { credentials: "include" }).json();
  }
  catch{
    return null
  }
}

export async function postLogout() {
  await ky.post(`${apiUrl}/logout`, { credentials: "include" });
}

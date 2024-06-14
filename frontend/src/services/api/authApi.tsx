import ky from "ky";
import {apiUrl} from '@/config/apiUrl';

export async function postLogin(user: {
  username: string;
  password: string;
}): Promise<string> {
  return (
    await ky.post(`${apiUrl}/login`, {
      credentials: "include",
      json: user,
    })
  ).text();
}

export async function getUser(): Promise<string> {
  return await ky
    .get(`${apiUrl}/me`, { credentials: "include" })
    .text();
}

export async function postLogout() {
  await ky.post(`${apiUrl}/logout`, { credentials: "include" });
}

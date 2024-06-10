import ky from "ky";
import { apiUrl } from "@/config/apiUrl";

export default async function postRegister(user: any): Promise<Response> {
  return ky.post(`${apiUrl}/register`, { json: user });
}

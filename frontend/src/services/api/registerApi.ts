import ky from "ky";
import { apiUrl } from "@/config/apiUrl";

export default async function postRegister(
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastname: string,
): Promise<string> {
  return (
    await ky.post("http://localhost:5000/register", {
      json: { username, email, password, firstName, lastname },
    })
  ).text();
}

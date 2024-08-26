import ky from "ky";
import User from "@/types/user";

export default async function postRegister(
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastname: string,
) : Promise<{ error: string } | { message: User }>{
  return (
    await ky.post("http://localhost:5000/register", {
      json: { username, email, password, firstName, lastname },
      credentials: "include",
    })
  ).json();
}
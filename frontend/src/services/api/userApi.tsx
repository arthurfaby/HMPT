import User from "@/types/user";
import ky from "ky";

export default async function getUser() {
   return await ky.get("http://localhost:5000/user") 
}

export async function postUser(newUser: User): Promise<boolean> {
  try {
      await ky.post("http://localhost:5000/me/update", {
         credentials: "include",
         json: newUser 
      }) 
      return true
  }
  catch {
      return false
  }
 
}
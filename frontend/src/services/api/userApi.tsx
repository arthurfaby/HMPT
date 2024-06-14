import ky from "ky";

export default async function getUser() {
   return await ky.get("http://localhost:5000/user") 
}
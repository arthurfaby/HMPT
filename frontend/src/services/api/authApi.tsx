import ky from "ky";
import User from "../../types/user";

export  async function postLogin(user: {username: string, password: string}): Promise<Response>{
  return ky.post("http://localhost:5000/login", { credentials: "include", json: user });
}

export  async function getUser(): Promise<Response>{
  return ky.get("http://localhost:5000/me", { credentials: "include"});
}
import ky from "ky";

export  async function postLogin(user: {username: string, password: string}): Promise<string>{
  return (await ky.post("http://localhost:5000/login", { credentials: "include", json: user })).text();
}

export  async function getUser(): Promise<string>{
  return await ky.get("http://localhost:5000/me", { credentials: "include"}).text();
}
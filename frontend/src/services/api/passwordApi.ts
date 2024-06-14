import ky from "ky";

export async function postForgetPassword(username: string): Promise<Response> {
  return await ky.post("http://localhost:5000/mail/forget_password", {json: {username}});
}

export async function changePassword(newPassord: string, token: string) { 
    return await ky.post("http://localhost:5000/mail/change_password", {json: {newPassword: newPassord, token: token}})
}
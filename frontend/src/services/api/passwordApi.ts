import ky from "ky";

export async function postForgetPassword(username: string): Promise<{ error: string} | {message: string}> {
  return await ky.post("http://localhost:5000/mail/forget_password", {json: {username}}).json();
}

export async function changePassword(newPassord: string, token: string): Promise<{ error: string} | {message: string}>{ 
    return await ky.post("http://localhost:5000/mail/change_password", {json: {newPassword: newPassord, token: token}}).json()
}
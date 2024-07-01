import ky from "ky";

export default async function postRegister(
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastname: string,
) {
  return (
    await ky.post("http://localhost:5000/register", {
      json: { username, email, password, firstName, lastname },
    })
  ).json();
}

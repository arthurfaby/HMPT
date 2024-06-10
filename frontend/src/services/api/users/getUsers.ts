import { apiUrl } from "@/config/apiUrl";
import { UserDto } from "@/dtos/user_dto";
import ky from "ky";

/**
 * Get all the users
 */
export async function getUsersToMatch(): Promise<UserDto[]> {
  const data = await ky
    .get(`${apiUrl}/matches/usersToMatch`, {
      credentials: "include",
    })
    .json<{ error: string } | UserDto[]>();

  if (Array.isArray(data)) return data;
  //TODO: handle error
  throw new Error(data.error);
}

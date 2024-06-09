import { apiUrl } from "@/config/apiUrl";
import { UserDto } from "@/dtos/user_dto";

/**
 * Get all the users
 */
export async function getUsers(): Promise<UserDto[]> {
  const response = await fetch(`${apiUrl}/users`);
  return await response.json();
}

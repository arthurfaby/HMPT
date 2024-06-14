import { apiUrl } from "@/config/apiUrl";
import ky, { HTTPError } from "ky";

export async function kyGET<T>(
  endpoint: string,
  logout: () => void,
): Promise<T | null> {
  try {
    const data = await ky
      .get(`${apiUrl}/${endpoint}`, {
        credentials: "include",
      })
      .json<T>();
    return data;
  } catch (error) {
    if (error instanceof HTTPError) {
      if (error.response.status === 401) {
        logout();
      }
    }
    return null;
  }
}

export async function kyPOST<T, U>(
  endpoint: string,
  body: U,
  logout: () => void,
): Promise<T | null> {
  try {
    const data = await ky
      .post(`${apiUrl}/${endpoint}`, {
        json: body,
        credentials: "include",
      })
      .json<T>();
    return data;
  } catch (error) {
    if (error instanceof HTTPError) {
      if (error.response.status === 401) {
        logout();
      }
    }
    return null;
  }
}

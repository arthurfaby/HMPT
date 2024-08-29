import { apiUrl } from "@/config/apiUrl";
import { PreferenceDto } from "@/dtos/preference_dto";
import { SexualPreference } from "@/types/sexual_preference_type";
import ky from "ky";

export async function getSexualPreferences(): Promise<SexualPreference> {
  try {
    const response = await ky
      .get(`${apiUrl}/preferences/sexualPreference`, {
        credentials: "include",
      })
      .json();

    if (
      response &&
      typeof response === "object" &&
      "sexualPreference" in response
    )
      return response.sexualPreference as SexualPreference;

    return "bisexual";
  } catch {
    return "bisexual";
  }
}

export async function getSexualPreferencesById(
  id: number,
): Promise<SexualPreference> {
  try {
    const response = await ky
      .get(`${apiUrl}/preferences/sexualPreference/${id}`, {
        credentials: "include",
      })
      .json();

    if (
      response &&
      typeof response === "object" &&
      "sexualPreference" in response
    )
      return response.sexualPreference as SexualPreference;

    return "bisexual";
  } catch {
    return "bisexual";
  }
}

export async function postSexualPreferences(
  sexualPreference: SexualPreference,
): Promise<boolean> {
  try {
    const response = await ky.post(`${apiUrl}/preferences/sexualPreference`, {
      credentials: "include",
      json: { sexualPreference },
    });

    if (response.ok) return true;
    return false;
  } catch {
    return false;
  }
}

export async function getPreferences(): Promise<PreferenceDto | null> {
  try {
    const response = await ky
      .get(`${apiUrl}/preferences/preferences`, {
        credentials: "include",
      })
      .json();
    return response as PreferenceDto;
  } catch {
    return null;
  }
}

export async function postPreferences(
  preferences: PreferenceDto,
): Promise<boolean> {
  try {
    const response = await ky.post(`${apiUrl}/preferences/preferences`, {
      credentials: "include",
      json: preferences,
    });
    return response.ok;
  } catch {
    return false;
  }
}

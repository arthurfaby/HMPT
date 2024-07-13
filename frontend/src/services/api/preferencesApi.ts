import { apiUrl } from "@/config/apiUrl";
import { SEXUAL_PREFERENCES, SexualPreference } from "@/types/sexual_preference_type";
import ky from "ky";

export async function getSexualPreferences():Promise<SexualPreference> {
    try {
        const response = await ky.get(`${apiUrl}/preferences/sexualPreference`, {
            credentials: "include",
        }).json()

        console.log("response :", response)
        if (!response)
            return("bisexual")
        return("bisexual")
    }
    catch {
        return("bisexual")
    }
}
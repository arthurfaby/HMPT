import { apiUrl } from "@/config/apiUrl";
import { SexualPreference } from "@/types/sexual_preference_type";
import ky from "ky";

export async function getSexualPreferences():Promise<SexualPreference> {
    try {
        const response = await ky.get(`${apiUrl}/preferences/sexualPreference`, {
            credentials: "include",
        }).json() 
        
        if (response && typeof response === 'object' && 'sexualPreference' in response)
            return response.sexualPreference as SexualPreference

        return "bisexual"
    }
    catch{
        return("bisexual")
    }
}

export async function postSexualPreferences(sexualPreference: SexualPreference):Promise<boolean> {
    try{
        const response = await ky.post(`${apiUrl}/preferences/sexualPreference`, {
            credentials: "include",
            json: {sexualPreference}
        })

        if (response.ok)
            return true
        return false
    }
    catch {
        return false
    }

}
    
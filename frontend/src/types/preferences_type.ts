import { SexualPreference } from "./sexual_preference_type";

export default interface Preferences {

    ageGapMin: number,
    ageGapMax: number,
    fameRatingMin: number,
    fameRatingMax: number,
    sexualPreference: SexualPreference,
    location: Location
}
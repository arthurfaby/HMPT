import { AbstractDto } from "@/dtos/abstract_dto";
import { SexualPreference } from "../types/sexual_preference_type";

export interface PreferenceDto extends AbstractDto {
  user_id: number;
  age_gap_min: number;
  age_gap_max?: number;
  fame_rating_min: number;
  fame_rating_max?: number;
  sexual_preference: SexualPreference;
  location: number;
}

import { AbstractDto } from "../libs/orm/dtos/abstract_dto";
import { SexualPreference } from "../types/sexual_preference_type";
import { Location } from "../types/geolocation_type";

export interface PreferenceDto extends AbstractDto {
  user_id: number;
  age_gap_min: number;
  age_gap_max?: number;
  fame_rating_min: number;
  fame_rating_max?: number;
  sexual_preference: SexualPreference;
  // @TODO change any to Location preference type
  location: any;
}

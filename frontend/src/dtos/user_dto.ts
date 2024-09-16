import { AbstractDto } from "@/dtos/abstract_dto";
import { Gender } from "../types/gender_type";
import { Location } from "@/types/geolocation_type";

export interface UserDto extends AbstractDto {
  email?: string;
  username?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  gender?: Gender;
  biography?: string;
  interests?: string[];
  pictures?: string[];
  verified: boolean;
  fame_rating: number;
  geolocation?: Location;
  accept_location: boolean;
  age: number;
  online: boolean;
  last_online_date?: string;
}

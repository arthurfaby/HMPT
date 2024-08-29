import { Location } from "@/types/geolocation_type";

export default interface User {
  username: string;
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  gender: string | null;
  biography: string | null;
  interests: string[] | [];
  profil_picture: string | null;
  pictures: string[];
  verified: boolean | null;
  geolocation: Location | undefined;
  acceptLocation: false;
  age: number;
  online: boolean;
  lastOnlineDate: string;
}

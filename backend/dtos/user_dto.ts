import { AbstractDto } from "../libs/orm/dtos/abstract_dto";
import { Gender } from "../types/gender_type";

export interface UserDto extends AbstractDto {
    id: number;
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    gender: Gender;
    biography: string;
    interests: any;
    pictures: any;
    verified: boolean;
    fame_rating: number;
    geolocation: {
        latitude: number;
        longitude: number;
    };
    accept_location: boolean;
    age: number;
    online: boolean;
    last_online_date: string;
}
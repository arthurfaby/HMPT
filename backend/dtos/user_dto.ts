export type UserDto = {
    id: number;
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    gender: string;
    biography: string;
    interests: string[];
    pictures: string[];
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
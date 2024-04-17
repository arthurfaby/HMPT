export interface User {
    id: number;
    email:string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    gender: string;
    biography: string;
    interests: string;
    verified: boolean;
    fame_rating: number;
    geoloaction: {
        x: number;
        y: number;
    }
    accept_location: number;
    age: number;
    online: boolean;
    last_online_date: Date;
}
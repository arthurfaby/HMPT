export default interface User {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    gender: string;
    biography: string | null;
    interests: string[];
    profil_picture: string;
    pictures: string[];
    verified: boolean;
    geolaction: {
        x: number,
        y: number
    }
    age: number;
}
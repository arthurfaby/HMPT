import { UserDto } from "../dtos/user_dto";
import { AbstractModel } from "../libs/orm/models/abstract_model";
import create from "../libs/orm/queries/create_query";
import select from "../libs/orm/queries/select_query";
import { Filters } from "../libs/orm/types/filter_type";
import { GENDERS, Gender } from "../types/gender_type";
import { Geolocation } from "../types/geolocation_type";

export const USER_TABLE_NAME = "users";

export class User extends AbstractModel<UserDto> {

    /**
     * The user's id
     * @type {number}
     * @public
     */
    public id: number;

    /**
     * The user's email
     * @type {string}
     * @public
     */
    public email: string;

    /**
     * The user's username
     * @type {string}
     * @public
     */
    public username: string;

    /**
     * The user's password
     * @type {string}
     * @public
     */
    public password: string;

    /**
     * The user's first name
     * @type {string}
     * @public
     */
    public firstName: string;

    /**
     * The user's last name
     * @type {string}
     * @public
     */
    public lastName: string;

    /**
     * The user's gender
     * @type {Gender}
     * @public
     */
    public gender: Gender;

    /**
     * The user's biography
     * @type {string}
     * @public
     */
    public biography: string;

    /**
     * The user's interests
     * @type {string[]}
     * @public
     */
    public interests: string[];

    /**
     * The user's pictures
     * @type {string[]}
     * @public
     */
    public pictures: string[];

    /**
     * The user's verification status
     * @type {boolean}
     * @public
     */
    public verified: boolean;

    /**
     * The user's fame rating
     * @type {number}
     * @public
     */
    public fameRating: number;

    /**
     * The user's geolocation
     * @type {Geolocation}
     * @public
     */
    public geolocation: Geolocation;

    /**
     * The user's location sharing status
     * @type {boolean}
     * @public
     */
    public acceptLocation: boolean;

    /**
     * The user's age
     * @type {number}
     * @public
     */
    public age: number;

    /**
     * The user's online status
     * @type {boolean}
     * @public
     */
    public online: boolean; 

    /**
     * The user's last online date
     * @type {string}
     * @public
     */
    public lastOnlineDate: Date;


    public constructor(dto: UserDto) {
        super(dto, USER_TABLE_NAME);
        this.id = dto.id;
        this.email = dto.email;
        this.username = dto.username;
        this.password = dto.password;
        this.firstName = dto.first_name;
        this.lastName = dto.last_name;
        if (!GENDERS.includes(dto.gender)) {
            throw new Error("Invalid gender");
        }
        this.gender = dto.gender as Gender;
        this.biography = dto.biography;
        this.interests = dto.interests;
        this.pictures = dto.pictures;
        this.verified = dto.verified;
        this.fameRating = dto.fame_rating;
        if (!(dto.geolocation.latitude && dto.geolocation.longitude)) {
            throw new Error("Invalid geolocation");
        }
        this.geolocation = dto.geolocation as Geolocation;
        this.acceptLocation = dto.accept_location;
        this.age = dto.age;
        this.online = dto.online;
        this.lastOnlineDate = new Date(dto.last_online_date);
    }

    public static select(columns: string[], filters: Filters): Promise<User[]> {
        return select(USER_TABLE_NAME, columns, filters);
    }

    public create() {
        return create("users", this.toDto());
    }

    public toDto(): UserDto {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            password: this.password,
            first_name: this.firstName,
            last_name: this.lastName,
            gender: this.gender,
            biography: this.biography,
            interests: this.interests,
            pictures: this.pictures,
            verified: this.verified,
            fame_rating: this.fameRating,
            geolocation: this.geolocation,
            accept_location: this.acceptLocation,
            age: this.age,
            online: this.online,
            last_online_date: this.lastOnlineDate.toISOString().split("T")[0],

        }
    }
    
}
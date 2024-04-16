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
     * @private
     */
    private _id: number;

    /**
     * The user's email
     * @type {string}
     * @private
     */
    private _email: string;

    /**
     * The user's username
     * @type {string}
     * @private
     */
    private _username: string;

    /**
     * The user's password
     * @type {string}
     * @private
     */
    private _password: string;

    /**
     * The user's first name
     * @type {string}
     * @private
     */
    private _firstName: string;

    /**
     * The user's last name
     * @type {string}
     * @private
     */
    private _lastName: string;

    /**
     * The user's gender
     * @type {Gender}
     * @private
     */
    private _gender: Gender;

    /**
     * The user's biography
     * @type {string}
     * @private
     */
    private _biography: string;

    /**
     * The user's interests
     * @type {string[]}
     * @private
     */
    private _interests: string[];

    /**
     * The user's pictures
     * @type {string[]}
     * @private
     */
    private _pictures: string[];

    /**
     * The user's verification status
     * @type {boolean}
     * @private
     */
    private _verified: boolean;

    /**
     * The user's fame rating
     * @type {number}
     * @private
     */
    private _fameRating: number;

    /**
     * The user's geolocation
     * @type {Geolocation}
     * @private
     */
    private _geolocation: Geolocation;

    /**
     * The user's location sharing status
     * @type {boolean}
     * @private
     */
    private _acceptLocation: boolean;

    /**
     * The user's age
     * @type {number}
     * @private
     */
    private _age: number;

    /**
     * The user's online status
     * @type {boolean}
     * @private
     */
    private _online: boolean; 

    /**
     * The user's last online date
     * @type {string}
     * @private
     */
    private _lastOnlineDate: Date;

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this.dto.id = value;
        this._id = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this.dto.email = value;
        this._email = value;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this.dto.username = value;
        this._username = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this.dto.password = value;
        this._password = value;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public set firstName(value: string) {
        this.dto.first_name = value;
        this._firstName = value;
    }

    public get lastName(): string {
        return this._lastName;
    }

    public set lastName(value: string) {
        this.dto.last_name = value;
        this._lastName = value;
    }

    public get gender(): Gender {
        return this._gender;
    }

    public set gender(value: Gender) {
        this.dto.gender = value;
        this._gender = value;
    }

    public get biography(): string {
        return this._biography;
    }

    public set biography(value: string) {
        this.dto.biography = value;
        this._biography = value;
    }

    public get interests(): string[] {
        return this._interests;
    }

    public set interests(value: string[]) {
        this.dto.interests = value;
        this._interests = value;
    }

    public get pictures(): string[] {
        return this._pictures;
    }

    public set pictures(value: string[]) {
        this.dto.pictures = value;
        this._pictures = value;
    }

    public get verified(): boolean {
        return this._verified;
    }

    public set verified(value: boolean) {
        this.dto.verified = value;
        this._verified = value;
    }

    public get fameRating(): number {
        return this._fameRating;
    }

    public set fameRating(value: number) {
        this.dto.fame_rating = value;
        this._fameRating = value;
    }

    public get geolocation(): Geolocation {
        return this._geolocation;
    }

    public set geolocation(value: Geolocation) {
        this.dto.geolocation = value;
        this._geolocation = value;
    }

    public get acceptLocation(): boolean {
        return this._acceptLocation;
    }

    public set acceptLocation(value: boolean) {
        this.dto.accept_location = value;
        this._acceptLocation = value;
    }

    public get age(): number {
        return this._age;
    }

    public set age(value: number) {
        this.dto.age = value;
        this._age = value;
    }

    public get online(): boolean {
        return this._online;
    }

    public set online(value: boolean) {
        this.dto.online = value;
        this._online = value;
    }

    public get lastOnlineDate(): Date {
        return this._lastOnlineDate;
    }

    public set lastOnlineDate(value: Date) {
        this.dto.last_online_date = value.toISOString().split("T")[0];
        this._lastOnlineDate = value;
    }

    public constructor(dto: UserDto) {
        super(dto, USER_TABLE_NAME);
        this._id = dto.id;
        this._email = dto.email;
        this._username = dto.username;
        this._password = dto.password;
        this._firstName = dto.first_name;
        this._lastName = dto.last_name;
        if (!GENDERS.includes(dto.gender)) {
            throw new Error("Invalid gender");
        }
        this._gender = dto.gender as Gender;
        this._biography = dto.biography;
        this._interests = dto.interests;
        this._pictures = dto.pictures;
        this._verified = dto.verified;
        this._fameRating = dto.fame_rating;
        if (!(dto.geolocation.latitude && dto.geolocation.longitude)) {
            throw new Error("Invalid geolocation");
        }
        this._geolocation = dto.geolocation as Geolocation;
        this._acceptLocation = dto.accept_location;
        this._age = dto.age;
        this._online = dto.online;
        this._lastOnlineDate = new Date(dto.last_online_date);
    }

    public static select(columns: string[], filters: Filters): Promise<UserDto[]> {
        return select<UserDto>(USER_TABLE_NAME, columns, filters);
    }


    public toDto(): UserDto {
        return {
            id: this.id,
            email: this._email,
            username: this._username,
            password: this._password,
            first_name: this._firstName,
            last_name: this._lastName,
            gender: this._gender,
            biography: this._biography,
            interests: this._interests,
            pictures: this._pictures,
            verified: this._verified,
            fame_rating: this._fameRating,
            geolocation: this._geolocation,
            accept_location: this._acceptLocation,
            age: this._age,
            online: this._online,
            last_online_date: this._lastOnlineDate.toISOString().split("T")[0],

        }
    }
    
}
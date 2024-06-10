import { UserDto } from "../dtos/user_dto";
import { faker } from "@faker-js/faker";
import { Gender } from "../types/gender_type";
import { User } from "../models/user_model";

/**
 * UserFactory
 *
 * @example
 * import UserFactory from 'path/to/user_factory';
 *
 * const user = UserFactory.createOne();
 * const user2 = UserFactory.createOne({ username: 'Arthur', fameRating: 4 });
 *
 * const users = UserFactory.createMany(5);
 *
 */
class UserFactory {
  private async _generateUser(overrides?: Partial<UserDto>): Promise<UserDto> {
    const n1 = faker.number.float({ min: 0, max: 1 });
    const randomGender: Gender =
      n1 > 0.33 ? (faker.person.sex() as Gender) : "other";

    const n2 = faker.number.int({ min: 1, max: 5 });
    const pictures: string[] = [];
    for (let i = 0; i < n2; i++) {
      pictures.push(faker.image.url());
    }

    const n3 = faker.number.int({ min: 2, max: 8 });
    const interests: string[] = [];
    for (let i = 0; i < n3; i++) {
      interests.push(faker.lorem.words(1));
    }

    return {
      username:
        overrides?.username || faker.internet.userName().replace("'", ""),
      email: overrides?.email || faker.internet.email(),
      password: overrides?.password || faker.internet.password(),
      first_name:
        overrides?.first_name || faker.person.firstName().replace("'", ""),
      last_name:
        overrides?.last_name || faker.person.lastName().replace("'", ""),
      age: overrides?.age || faker.number.int({ min: 18, max: 99 }),
      biography:
        overrides?.biography || faker.lorem.words(15).substring(0, 512),
      fame_rating:
        overrides?.fame_rating ||
        faker.number.float({ min: 0, max: 5, fractionDigits: 2 }),
      gender: overrides?.gender || randomGender,
      accept_location: overrides?.accept_location || faker.datatype.boolean(),
      online: overrides?.online || faker.datatype.boolean(),
      verified: overrides?.verified || faker.datatype.boolean(),
      pictures: overrides?.pictures || pictures,
      geolocation: overrides?.geolocation || {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
      interests: overrides?.interests || interests,
      last_online_date:
        overrides?.last_online_date ||
        faker.date.past().toISOString().split("T")[0],
    } as UserDto;
  }

  public async createOne(overrides?: Partial<UserDto>): Promise<User> {
    const userToCreate = await this._generateUser(overrides);
    const user = new User(userToCreate);
    await user.create();
    return user;
  }

  public async createMany(n: number): Promise<User[]> {
    const users: User[] = [];
    for (let i = 0; i < n; i++) {
      users.push(await this.createOne());
    }
    return users;
  }
}

export default new UserFactory();

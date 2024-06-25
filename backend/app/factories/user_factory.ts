import { UserDto } from "../dtos/user_dto";
import { faker } from "@faker-js/faker";
import { Gender } from "../types/gender_type";
import { User } from "../models/user_model";
import { PreferenceDto } from "../dtos/preference_dto";
import { SexualPreference } from "../types/sexual_preference_type";
import { Preference } from "../models/preference_model";

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
    const randomGender: Gender = faker.person.sex() as Gender;

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

  public async generatePreferences(user: User): Promise<void> {
    const userWithId = await User.select({
      email: {
        equal: user.email,
      },
    });
    if (userWithId.length === 0) return;
    const user_id = userWithId[0].id;
    if (!user_id) return;
    const age_gap_min = faker.number.int({ min: 18, max: 95 });
    const age_gap_max = faker.number.int({ min: age_gap_min, max: 99 });
    const fame_rating_min = faker.number.float({
      min: 0,
      max: 4.5,
      fractionDigits: 2,
    });
    const fame_rating_max = faker.number.float({
      min: fame_rating_min,
      max: 5,
      fractionDigits: 2,
    });
    const sexual_preferences: SexualPreference[] = [
      "heterosexual",
      "homosexual",
      "bisexual",
    ];
    const sexual_preference: SexualPreference =
      sexual_preferences[faker.number.int({ min: 0, max: 2 })];

    const preferenceDto: PreferenceDto = {
      age_gap_min,
      age_gap_max,
      fame_rating_min,
      fame_rating_max,
      user_id,
      sexual_preference,
      distance: faker.number.int({ min: 1, max: 20000000 }),
    };
    const preference = new Preference(preferenceDto);
    await preference.create();
  }

  public async createOne(overrides?: Partial<UserDto>): Promise<User> {
    const userToCreate = await this._generateUser(overrides);
    const user = new User(userToCreate);
    await user.hash();
    await user.create();
    console.log("[FACTORY] User created");
    await this.generatePreferences(user);
    console.log("[FACTORY] Preferences created");
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

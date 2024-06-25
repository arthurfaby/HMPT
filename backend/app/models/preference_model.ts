import { PreferenceDto } from "../dtos/preference_dto";
import { AbstractModel } from "../libs/orm/models/abstract_model";
import {
  SEXUAL_PREFERENCES,
  SexualPreference,
} from "../types/sexual_preference_type";
import { Location } from "../types/geolocation_type";
import { APIResponse } from "../libs/orm/types/response_type";
import { getStringFilters } from "../libs/orm/utils/get_string_filters";
import query from "../libs/orm/queries/abstract_query";
import { Filters } from "../libs/orm/types/filter_type";

export const PREFERENCE_TABLE_NAME = "preferences";

export class Preference extends AbstractModel<PreferenceDto> {
  /**
   * The user's id.
   * @type {number}
   * @private
   */
  private _userId: number;

  /**
   * The minimum age gap.
   * @type {number}
   * @private
   */
  private _ageGapMin: number;

  /**
   * The maximum age gap.
   * @type {number}
   * @private
   */
  private _ageGapMax?: number;

  /**
   * The minimum fame rating.
   * @type {number}
   * @private
   */
  private _fameRatingMin: number;

  /**
   * The maximum fame rating.
   * @type {number}
   * @private
   */
  private _fameRatingMax?: number;

  /**
   * The sexual preference.
   * @type {SexualPreference}
   * @private
   */
  private _sexualPreference: SexualPreference;

  /**
   * The distance (in meters).
   * @type {number}
   * @private
   */
  private _distance: number;

  public get userId(): number {
    return this._userId;
  }

  public set userId(value: number) {
    this._dto.user_id = value;
    this._userId = value;
  }

  public get ageGapMin(): number {
    return this._ageGapMin;
  }

  public set ageGapMin(value: number) {
    this._dto.age_gap_min = value;
    this._ageGapMin = value;
  }

  public get ageGapMax(): number | undefined {
    return this._ageGapMax;
  }

  public set ageGapMax(value: number) {
    this._dto.age_gap_max = value;
    this._ageGapMax = value;
  }

  public get fameRatingMin(): number {
    return this._fameRatingMin;
  }

  public set fameRatingMin(value: number) {
    this._dto.fame_rating_min = value;
    this._fameRatingMin = value;
  }

  public get fameRatingMax(): number | undefined {
    return this._fameRatingMax;
  }

  public set fameRatingMax(value: number) {
    this._dto.fame_rating_max = value;
    this._fameRatingMax = value;
  }

  public get sexualPreference(): SexualPreference {
    return this._sexualPreference;
  }

  public set sexualPreference(value: SexualPreference) {
    this._dto.sexual_preference = value;
    this._sexualPreference = value;
  }

  public get distance(): number {
    return this._distance;
  }

  public set distance(value: number) {
    this._dto.distance = value;
    this._distance = value;
  }

  public constructor(dto: PreferenceDto) {
    super(dto, PREFERENCE_TABLE_NAME);
    this._userId = dto.user_id;
    this._ageGapMin = dto.age_gap_min;
    this._ageGapMax = dto.age_gap_max;
    this._fameRatingMin = dto.fame_rating_min;
    this._fameRatingMax = dto.fame_rating_max;
    if (!SEXUAL_PREFERENCES.includes(dto.sexual_preference)) {
      throw new Error(
        `Sexual preference ${dto.sexual_preference} is not valid`
      );
    }
    this._sexualPreference = dto.sexual_preference;
    this._distance = dto.distance;
  }

  public static async select(filters?: Filters): Promise<Preference[]> {
    let apiResponse: APIResponse<PreferenceDto>;
    if (filters) {
      const [stringFilters, values] = getStringFilters(filters);
      apiResponse = await query<PreferenceDto>(
        `SELECT * FROM ${PREFERENCE_TABLE_NAME} WHERE ${stringFilters}`,
        values
      );
    } else {
      apiResponse = await query<PreferenceDto>(
        `SELECT * FROM ${PREFERENCE_TABLE_NAME}`
      );
    }
    const dtos: PreferenceDto[] = apiResponse.rows;
    const models: Preference[] = dtos.map((dto) => new Preference(dto));
    return models;
  }
}

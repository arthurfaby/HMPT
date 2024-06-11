import { MatchDto } from "../dtos/match_dto";
import { AbstractModel } from "../libs/orm/models/abstract_model";
import query from "../libs/orm/queries/abstract_query";
import { Filters } from "../libs/orm/types/filter_type";
import { APIResponse } from "../libs/orm/types/response_type";
import validateInput from "../libs/orm/utils/check_injections";
import { getStringFilters } from "../libs/orm/utils/get_string_filters";

export const MATCH_TABLE_NAME = "matches";

export class Match extends AbstractModel<MatchDto> {
  /**
   * The liked user's id
   * @type {number}
   * @private
   */
  private _likedId: number;

  /**
   * The liker user's id
   * @type {number}
   * @private
   */
  private _likerId: number;

  /**
   * The chat id
   * @type {number}
   * @private
   */
  private _chatId?: number;

  public get likedId(): number {
    return this._likedId;
  }

  public set likedId(value: number) {
    this._dto.liked_id = value;
    this._likedId = value;
  }

  public get likerId(): number {
    return this._likerId;
  }

  public set likerId(value: number) {
    this._dto.liker_id = value;
    this._likerId = value;
  }

  public get chatId(): number | undefined {
    return this._chatId;
  }

  public set chatId(value: number | undefined) {
    this._dto.chat_id = value;
    this._chatId = value;
  }

  constructor(dto: MatchDto) {
    super(dto, MATCH_TABLE_NAME);
    this._likedId = dto.liked_id;
    this._likerId = dto.liker_id;
    this._chatId = dto.chat_id;
  }

  public static async select(filters?: Filters): Promise<Match[]> {
    const validatedTableName: string = validateInput(MATCH_TABLE_NAME);
    let apiResponse: APIResponse<MatchDto>;
    if (filters) {
      const stringFilters: string = getStringFilters(filters);
      apiResponse = await query<MatchDto>(
        `SELECT * FROM ${validatedTableName} WHERE ${stringFilters}`
      );
    } else {
      apiResponse = await query<MatchDto>(
        `SELECT * FROM ${validatedTableName}`
      );
    }
    const dtos: MatchDto[] = apiResponse.rows;
    const models: Match[] = dtos.map((dto) => new Match(dto));
    return models;
  }
}

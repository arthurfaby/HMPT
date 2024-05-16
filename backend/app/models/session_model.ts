import { AbstractModel } from "../libs/orm/models/abstract_model";
import query from "../libs/orm/queries/abstract_query";
import { Filters } from "../libs/orm/types/filter_type";
import { APIResponse } from "../libs/orm/types/response_type";
import validateInput from "../libs/orm/utils/check_injections";
import { getStringFilters } from "../libs/orm/utils/get_string_filters";
import { SessionDto } from "../dtos/session_dto";

export const SESSION_TABLE_NAME = "sessions";

export class Session extends AbstractModel<SessionDto> {
  /**
   * The user's session id
   * @type {number}
   * @private
   */
  private _userId: number;

  /**
   * The session's token
   * @type {string}
   * @private
   */
  private _token: string;

  public get userId(): number {
    return this._userId;
  }

  public set userId(value: number) {
    this._dto.user_id = value;
    this._userId = value;
  }

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._dto.token = value;
    this._token = value;
  }

  public constructor(dto: SessionDto) {
    super(dto, SESSION_TABLE_NAME);
    this._userId = dto.user_id;
    this._token = dto.token;
  }

  public static async select(filters?: Filters): Promise<Session[]> {
    const validatedTableName: string = validateInput(SESSION_TABLE_NAME);
    let apiResponse: APIResponse<SessionDto>;
    if (filters) {
      const stringFilters: string = getStringFilters(filters);
      apiResponse = await query<SessionDto>(
        `SELECT * FROM ${validatedTableName} WHERE ${stringFilters}`,
      );
    } else {
      apiResponse = await query<SessionDto>(
        `SELECT * FROM ${validatedTableName}`,
      );
    }
    const dtos: SessionDto[] = apiResponse.rows;
    return dtos.map((dto) => new Session(dto));
  }
}

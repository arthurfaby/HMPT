import { AbstractModel } from "../libs/orm/models/abstract_model";
import query from "../libs/orm/queries/abstract_query";
import { Filters } from "../libs/orm/types/filter_type";
import { APIResponse } from "../libs/orm/types/response_type";
import { getStringFilters } from "../libs/orm/utils/get_string_filters";
import { VerificationTokenDto } from "../dtos/verification_token_dto";

export const VERIFICATION_TOKEN_TABLE_NAME = "verification_tokens";

export class VerificationToken extends AbstractModel<VerificationTokenDto> {
  /**
   * The user's verification_token id
   * @type {number}
   * @private
   */
  private _userId: number;

  /**
   * The verification_token's token
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

  public constructor(dto: VerificationTokenDto) {
    super(dto, VERIFICATION_TOKEN_TABLE_NAME);
    this._userId = dto.user_id;
    this._token = dto.token;
  }

  public static async select(filters?: Filters): Promise<VerificationToken[]> {
    let apiResponse: APIResponse<VerificationTokenDto>;
    if (filters) {
      const [stringFilters, values] = getStringFilters(filters);
      apiResponse = await query<VerificationTokenDto>(
        `SELECT * FROM ${VERIFICATION_TOKEN_TABLE_NAME} WHERE ${stringFilters}`,
        values
      );
    } else {
      apiResponse = await query<VerificationTokenDto>(
        `SELECT * FROM ${VERIFICATION_TOKEN_TABLE_NAME}`
      );
    }
    const dtos: VerificationTokenDto[] = apiResponse.rows;
    return dtos.map((dto) => new VerificationToken(dto));
  }
}

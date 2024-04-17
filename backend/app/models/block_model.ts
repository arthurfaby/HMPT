import { BlockDto } from "../dtos/block_dto";
import { AbstractModel } from "../libs/orm/models/abstract_model";
import query from "../libs/orm/queries/abstract_query";
import { Filters } from "../libs/orm/types/filter_type";
import { APIResponse } from "../libs/orm/types/response_type";
import validateInput from "../libs/orm/utils/check_injections";
import { getStringFilters } from "../libs/orm/utils/get_string_filters";

export const BLOCK_TABLE_NAME = "blocks";

export class Block extends AbstractModel<BlockDto> {
  /**
   * The blocked user's id
   * @type {number}
   * @private
   */
  private _blockedId: number;

  /**
   * The blocker user's id
   * @type {number}
   * @private
   */
  private _blockerId: number;

  public get blockedId(): number {
    return this._blockedId;
  }

  public set blockedId(value: number) {
    this._dto.blocked_id = value;
    this._blockedId = value;
  }

  public get blockerId(): number {
    return this._blockerId;
  }

  public set blockerId(value: number) {
    this._dto.blocker_id = value;
    this._blockerId = value;
  }

  public constructor(dto: BlockDto) {
    super(dto, BLOCK_TABLE_NAME);
    this._blockedId = dto.blocked_id;
    this._blockerId = dto.blocker_id;
  }

  public static async select(filters?: Filters): Promise<Block[]> {
    const validatedTableName: string = validateInput(BLOCK_TABLE_NAME);
    let apiResponse: APIResponse<BlockDto>;
    if (filters) {
      const stringFilters: string = getStringFilters(filters);
      apiResponse = await query<BlockDto>(
        `SELECT * FROM ${validatedTableName} WHERE ${stringFilters}`
      );
    } else {
      apiResponse = await query<BlockDto>(
        `SELECT * FROM ${validatedTableName}`
      );
    }
    const dtos: BlockDto[] = apiResponse.rows;
    const models: Block[] = dtos.map((dto) => new Block(dto));
    return models;
  }
}

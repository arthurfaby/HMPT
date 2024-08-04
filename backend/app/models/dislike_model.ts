import { DislikeDto } from "../dtos/dislike_dto";
import { AbstractModel } from "../libs/orm/models/abstract_model";
import query from "../libs/orm/queries/abstract_query";
import { Filters } from "../libs/orm/types/filter_type";
import { APIResponse } from "../libs/orm/types/response_type";
import { getStringFilters } from "../libs/orm/utils/get_string_filters";

export const DISLIKE_TABLE_NAME = "dislikes";

export class Dislike extends AbstractModel<DislikeDto> {
  /**
   * The disliked user's id
   * @type {number}
   * @private
   */
  private _dislikedId: number;

  /**
   * The disliker user's id
   * @type {number}
   * @private
   */
  private _dislikerId: number;

  public get dislikedId(): number {
    return this._dislikedId;
  }

  public set dislikedId(value: number) {
    this._dto.disliked_id = value;
    this._dislikedId = value;
  }

  public get dislikerId(): number {
    return this._dislikerId;
  }

  public set dislikerId(value: number) {
    this._dto.disliker_id = value;
    this._dislikerId = value;
  }

  constructor(dto: DislikeDto) {
    super(dto, DISLIKE_TABLE_NAME);
    this._dislikedId = dto.disliked_id;
    this._dislikerId = dto.disliker_id;
  }

  public static async select(filters?: Filters): Promise<Dislike[]> {
    let apiResponse: APIResponse<DislikeDto>;
    if (filters) {
      const [stringFilters, values] = getStringFilters(filters);
      apiResponse = await query<DislikeDto>(
        `SELECT * FROM ${DISLIKE_TABLE_NAME} WHERE ${stringFilters}`,
        values
      );
    } else {
      apiResponse = await query<DislikeDto>(
        `SELECT * FROM ${DISLIKE_TABLE_NAME}`
      );
    }
    const dtos: DislikeDto[] = apiResponse.rows;
    const models: Dislike[] = dtos.map((dto) => new Dislike(dto));
    return models;
  }
}

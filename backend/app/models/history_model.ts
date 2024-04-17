import { HistoryDto } from "../dtos/history_dto";
import { AbstractModel } from "../libs/orm/models/abstract_model";
import query from "../libs/orm/queries/abstract_query";
import { Filters } from "../libs/orm/types/filter_type";
import { APIResponse } from "../libs/orm/types/response_type";
import validateInput from "../libs/orm/utils/check_injections";
import { getStringFilters } from "../libs/orm/utils/get_string_filters";

export const HISTORY_TABLE_NAME = "histories";

export class History extends AbstractModel<HistoryDto> {
  /**
   * The visited user's id
   * @type {number}
   * @private
   */
  private _visitedId: number;

  /**
   * The visitor user's id
   * @type {number}
   * @private
   */
  private _visitorId: number;

  /**
   * The date of the visit
   * @type {string}
   * @private
   */
  private _date: Date;

  public get visitedId(): number {
    return this._visitedId;
  }

  public set visitedId(value: number) {
    this._dto.visited_id = value;
    this._visitedId = value;
  }

  public get visitorId(): number {
    return this._visitorId;
  }

  public set visitorId(value: number) {
    this._dto.visitor_id = value;
    this._visitorId = value;
  }

  public get date(): Date {
    return this._date;
  }

  public set date(value: Date) {
    this._dto.date = value.toISOString().split("T")[0];
    this._date = value;
  }

  public constructor(dto: HistoryDto) {
    super(dto, HISTORY_TABLE_NAME);
    this._visitedId = dto.visited_id;
    this._visitorId = dto.visitor_id;
    this._date = new Date(dto.date);
  }

  public static async select(filters?: Filters): Promise<History[]> {
    const validatedTableName: string = validateInput(HISTORY_TABLE_NAME);
    let apiResponse: APIResponse<HistoryDto>;
    if (filters) {
      const stringFilters: string = getStringFilters(filters);
      apiResponse = await query<HistoryDto>(
        `SELECT * FROM ${validatedTableName} WHERE ${stringFilters}`
      );
    } else {
      apiResponse = await query<HistoryDto>(
        `SELECT * FROM ${validatedTableName}`
      );
    }
    const dtos: HistoryDto[] = apiResponse.rows;
    const models: History[] = dtos.map((dto) => new History(dto));
    return models;
  }
}

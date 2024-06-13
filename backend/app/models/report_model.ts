import { ReportDto } from "../dtos/report_dto";
import { AbstractModel } from "../libs/orm/models/abstract_model";
import query from "../libs/orm/queries/abstract_query";
import { Filters } from "../libs/orm/types/filter_type";
import { APIResponse } from "../libs/orm/types/response_type";
import { getStringFilters } from "../libs/orm/utils/get_string_filters";

export const REPORT_TABLE_NAME = "reports";

export class Report extends AbstractModel<ReportDto> {
  /**
   * The reported user's id
   * @type {number}
   * @private
   */
  private _reportedId: number;

  /**
   * The reporting user's id
   * @type {number}
   * @private
   */
  private _reporterId: number;

  public get reportedId(): number {
    return this._reportedId;
  }

  public set reportedId(value: number) {
    this._dto.reported_id = value;
    this._reportedId = value;
  }

  public get reporterId(): number {
    return this._reporterId;
  }

  public set reporterId(value: number) {
    this._dto.reporter_id = value;
    this._reporterId = value;
  }

  public constructor(dto: ReportDto) {
    super(dto, REPORT_TABLE_NAME);
    this._reportedId = dto.reported_id;
    this._reporterId = dto.reporter_id;
  }

  public static async select(filters?: Filters): Promise<Report[]> {
    let apiResponse: APIResponse<ReportDto>;
    if (filters) {
      const [stringFilters, values] = getStringFilters(filters);
      apiResponse = await query<ReportDto>(
        `SELECT * FROM ${REPORT_TABLE_NAME} WHERE ${stringFilters}`,
        values
      );
    } else {
      apiResponse = await query<ReportDto>(
        `SELECT * FROM ${REPORT_TABLE_NAME}`
      );
    }
    const dtos: ReportDto[] = apiResponse.rows;
    const models: Report[] = dtos.map((dto) => new Report(dto));
    return models;
  }
}

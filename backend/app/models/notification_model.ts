import { NotificationDto } from "../dtos/notification_dto";
import { AbstractModel } from "../libs/orm/models/abstract_model";
import query from "../libs/orm/queries/abstract_query";
import { Filters } from "../libs/orm/types/filter_type";
import { APIResponse } from "../libs/orm/types/response_type";
import { getStringFilters } from "../libs/orm/utils/get_string_filters";

export const NOTIFICATION_TABLE_NAME = "notifications";

export class Notification extends AbstractModel<NotificationDto> {
  /**
   * The user's id
   * @type {number}
   * @private
   */
  private _userId: number;

  /**
   * The content of the notification
   * @type {string}
   * @private
   */
  private _message: string;

  /**
   * The seen status
   * @type {boolean}
   * @private
   */
  private _seen: boolean;

  /**
   * The date of the notification
   * @type {string}
   * @private
   */
  private _date: Date;

  public get userId(): number {
    return this._userId;
  }

  public set userId(value: number) {
    this._dto.user_id = value;
    this._userId = value;
  }

  public get message(): string {
    return this._message;
  }

  public set message(value: string) {
    this._dto.message = value;
    this._message = value;
  }

  public get seen(): boolean {
    return this._seen;
  }

  public set seen(value: boolean) {
    this._dto.seen = value;
    this._seen = value;
  }

  public get date(): Date {
    return this._date;
  }

  public set date(value: Date) {
    this._dto.date = value.toISOString().split("T")[0];
    this._date = value;
  }

  public constructor(dto: NotificationDto) {
    super(dto, NOTIFICATION_TABLE_NAME);
    this._userId = dto.user_id;
    this._message = dto.message;
    this._seen = dto.seen;
    this._date = new Date(dto.date);
  }

  public static async select(filters?: Filters): Promise<Notification[]> {
    let apiResponse: APIResponse<NotificationDto>;
    if (filters) {
      const [stringFilters, values] = getStringFilters(filters);
      apiResponse = await query<NotificationDto>(
        `SELECT * FROM ${NOTIFICATION_TABLE_NAME} WHERE ${stringFilters}`,
        values
      );
    } else {
      apiResponse = await query<NotificationDto>(
        `SELECT * FROM ${NOTIFICATION_TABLE_NAME}`
      );
    }
    const dtos: NotificationDto[] = apiResponse.rows;
    const models: Notification[] = dtos.map((dto) => new Notification(dto));
    return models;
  }
}

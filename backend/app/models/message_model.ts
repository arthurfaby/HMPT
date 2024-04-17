import { MessageDto } from "../dtos/message_dto";
import { AbstractModel } from "../libs/orm/models/abstract_model";
import query from "../libs/orm/queries/abstract_query";
import { Filters } from "../libs/orm/types/filter_type";
import { APIResponse } from "../libs/orm/types/response_type";
import validateInput from "../libs/orm/utils/check_injections";
import { getStringFilters } from "../libs/orm/utils/get_string_filters";

export const MESSAGE_TABLE_NAME = "messages";

export class Message extends AbstractModel<MessageDto> {
  /**
   * The sender user's id
   * @type {number}
   * @private
   */
  private _userId: number;

  /**
   * The content of the message
   * @type {string}
   * @private
   */
  private _content: string;

  /**
   * The chat id
   * @type {number}
   * @private
   */
  private _chatId: number;

  /**
   * The date of the message
   * @type {string}
   * @private
   */
  private _date: Date;

  /**
   * The seen status
   * @type {boolean}
   * @private
   */
  private _seen: boolean;

  public get userId(): number {
    return this._userId;
  }

  public set userId(value: number) {
    this._dto.user_id = value;
    this._userId = value;
  }

  public get content(): string {
    return this._content;
  }

  public set content(value: string) {
    this._dto.content = value;
    this._content = value;
  }

  public get chatId(): number {
    return this._chatId;
  }

  public set chatId(value: number) {
    this._dto.chat_id = value;
    this._chatId = value;
  }

  public get date(): Date {
    return this._date;
  }

  public set date(value: Date) {
    this._dto.date = value.toISOString().split("T")[0];
    this._date = value;
  }

  public get seen(): boolean {
    return this._seen;
  }

  public set seen(value: boolean) {
    this._dto.seen = value;
    this._seen = value;
  }

  public constructor(dto: MessageDto) {
    super(dto, MESSAGE_TABLE_NAME);
    this._userId = dto.user_id;
    this._content = dto.content;
    this._chatId = dto.chat_id;
    this._date = new Date(dto.date);
    this._seen = dto.seen;
  }

  public static async select(filters?: Filters): Promise<Message[]> {
    const validatedTableName: string = validateInput(MESSAGE_TABLE_NAME);
    let apiResponse: APIResponse<MessageDto>;
    if (filters) {
      const stringFilters: string = getStringFilters(filters);
      apiResponse = await query<MessageDto>(
        `SELECT * FROM ${validatedTableName} WHERE ${stringFilters}`
      );
    } else {
      apiResponse = await query<MessageDto>(
        `SELECT * FROM ${validatedTableName}`
      );
    }
    const dtos: MessageDto[] = apiResponse.rows;
    const models: Message[] = dtos.map((dto) => new Message(dto));
    return models;
  }
}

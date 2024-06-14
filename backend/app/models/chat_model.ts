import { ChatDto } from "../dtos/chat_dto";
import { AbstractModel } from "../libs/orm/models/abstract_model";
import query from "../libs/orm/queries/abstract_query";
import { Filters } from "../libs/orm/types/filter_type";
import { APIResponse } from "../libs/orm/types/response_type";
import { getStringFilters } from "../libs/orm/utils/get_string_filters";

export const CHAT_TABLE_NAME = "chats";

export class Chat extends AbstractModel<ChatDto> {
  /**
   * One of the user id
   * @type {number}
   * @private
   */
  private _user1Id: number;

  /**
   * The other user id
   * @type {number}
   * @private
   */
  private _user2Id: number;

  public get userId1(): number {
    return this._user1Id;
  }

  public set userId1(value: number) {
    this._dto.user1_id = value;
    this._user1Id = value;
  }

  public get userId2(): number {
    return this._user2Id;
  }

  public set userId2(value: number) {
    this._dto.user2_id = value;
    this._user2Id = value;
  }

  constructor(dto: ChatDto) {
    super(dto, CHAT_TABLE_NAME);
    this._user1Id = dto.user1_id;
    this._user2Id = dto.user2_id;
  }

  public static async select(filters?: Filters): Promise<Chat[]> {
    let apiResponse: APIResponse<ChatDto>;
    if (filters) {
      const [stringFilters, values] = getStringFilters(filters);
      apiResponse = await query<ChatDto>(
        `SELECT * FROM ${CHAT_TABLE_NAME} WHERE ${stringFilters}`,
        values
      );
    } else {
      apiResponse = await query<ChatDto>(`SELECT * FROM ${CHAT_TABLE_NAME}`);
    }
    const dtos: ChatDto[] = apiResponse.rows;
    const models: Chat[] = dtos.map((dto) => new Chat(dto));
    return models;
  }
}

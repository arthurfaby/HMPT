import { AbstractDto } from "../libs/orm/dtos/abstract_dto";

export interface MatchDto extends AbstractDto {
  liked_id: number;
  liker_id: number;
  chat_id?: number;
}

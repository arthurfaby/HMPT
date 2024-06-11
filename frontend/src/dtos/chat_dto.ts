import { AbstractDto } from "./abstract_dto";

export interface ChatDto extends AbstractDto {
  user1_id: number;
  user2_id: number;
}

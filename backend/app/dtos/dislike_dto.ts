import { AbstractDto } from "../libs/orm/dtos/abstract_dto";

export interface DislikeDto extends AbstractDto {
  disliker_id: number;
  disliked_id: number;
}

import { AbstractDto } from "../libs/orm/dtos/abstract_dto";

export interface HistoryDto extends AbstractDto {
  visited_id: number;
  visitor_id: number;
  date: string;
}

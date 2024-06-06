import { AbstractDto } from "@/dtos/abstract_dto";

export interface HistoryDto extends AbstractDto {
  visited_id: number;
  visitor_id: number;
  date: string;
}

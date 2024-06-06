import { AbstractDto } from "@/dtos/abstract_dto";

export interface ReportDto extends AbstractDto {
  reported_id: number;
  reporter_id: number;
}

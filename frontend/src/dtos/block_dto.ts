import { AbstractDto } from "@/dtos/abstract_dto";

export interface BlockDto extends AbstractDto {
  blocked_id: number;
  blocker_id: number;
}

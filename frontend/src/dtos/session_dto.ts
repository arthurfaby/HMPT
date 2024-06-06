import { AbstractDto } from "@/dtos/abstract_dto";

export interface SessionDto extends AbstractDto {
  user_id: number;
  token: string;
}

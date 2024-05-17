import { AbstractDto } from "@/dtos/abstract_dto";

export interface NotificationDto extends AbstractDto {
  user_id: number;
  message: string;
  seen: boolean;
  date: string;
}

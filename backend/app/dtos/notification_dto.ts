import { AbstractDto } from "../libs/orm/dtos/abstract_dto";

export interface NotificationDto extends AbstractDto {
  user_id: number;
  message: string;
  seen: boolean;
  date: string;
}

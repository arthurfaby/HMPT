import { AbstractDto } from "@/dtos/abstract_dto";

export interface MessageDto extends AbstractDto {
  user_id: number;
  content: string;
  chat_id: number;
  date: string;
  seen: boolean;
}

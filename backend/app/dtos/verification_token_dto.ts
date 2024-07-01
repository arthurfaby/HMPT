import { AbstractDto } from "../libs/orm/dtos/abstract_dto";

export interface VerificationTokenDto extends AbstractDto {
  user_id: number;
  token: string;
}

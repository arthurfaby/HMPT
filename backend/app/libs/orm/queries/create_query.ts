import { UserDto } from "../../../dtos/user_dto";
import { AbstractDto } from "../dtos/abstract_dto";
import { getParsedValue } from "../utils/get_parsed_value";
import query from "./abstract_query";

const create = async <T extends AbstractDto>(tableName: string, dto: T) => {
  const keys = Object.keys(dto);
  const values = Object.values(dto);
  const parsedKeys = keys.join(", ");
  const parsedValues = values
    .map((value) => {
      return getParsedValue(value);
    })
    .join(", ");
  return await query(
    `INSERT INTO ${tableName} (${parsedKeys}) VALUES (${parsedValues});`
  );
};

export default create;

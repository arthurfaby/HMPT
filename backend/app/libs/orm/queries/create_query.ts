import { AbstractDto } from "../dtos/abstract_dto";
import validateInput from "../utils/check_injections";
import { getParsedValue } from "../utils/get_parsed_value";
import query from "./abstract_query";

const create = async <T extends AbstractDto>(tableName: string, dto: T) => {
  const validatedTableName = validateInput(tableName);
  const keys = Object.keys(dto);
  const values = Object.values(dto);
  const parsedKeys = keys.map((key) => validateInput(key)).join(", ");
  const parsedValues = values
    .map((value) => {
      const validatedValue = validateInput(value);
      return getParsedValue(validatedValue);
    })
    .join(", ");
  return await query(
    `INSERT INTO ${validatedTableName} (${parsedKeys}) VALUES (${parsedValues});`
  );
};

export default create;

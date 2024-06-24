import { AbstractDto } from "../dtos/abstract_dto";
import { getParsedValue } from "../utils/get_parsed_value";
import query from "./abstract_query";

const create = async <T extends AbstractDto>(tableName: string, dto: T) => {
  const keys = Object.keys(dto);
  const values = Object.values(dto);
  const parsedKeys = keys.join(", ");
  const nValues = values.length;
  const valuesVariables = Array.from(
    { length: nValues },
    (_, i) => `$${i + 1}`
  ).join(", ");
  return await query<T>(
    `INSERT INTO ${tableName} (${parsedKeys}) VALUES (${valuesVariables});`,
    values
  );
};

export default create;

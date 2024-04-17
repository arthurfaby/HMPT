import { AbstractDto } from "../dtos/abstract_dto";
import { AbstractModel } from "../models/abstract_model";
import { Filters } from "../types/filter_type";
import validateInput from "../utils/check_injections";
import query from "./abstract_query";

/**
 *
 * @param {string} tableName Name of the table to select from
 * @param {string[]} columns Columns to select from the table
 * @param {Filters} filters Filters to apply to the query
 * @throws {Error} if the query fails
 * @returns {Promise<any>} Returns the result of the query
 */
const select = async <T extends AbstractDto>(
  tableName: string,
  filters: Filters
) => {
  const validatedTableName = validateInput(tableName);
  const dtos = await query<T>(`SELECT * FROM ${validatedTableName}`);

  return dtos;
};

export default select;

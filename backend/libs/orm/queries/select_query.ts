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
const select = async (tableName: string, columns: string[], filters: Filters): Promise<any> => {
    const validatedTableName = validateInput(tableName);
    const validatedColumns = columns.map((field) => validateInput(field)).join(", ");
    return await query(`SELECT ${validatedColumns} FROM ${validatedTableName}`);
};

export default select;
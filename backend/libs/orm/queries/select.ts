import pool from "../../../database";
import validateInput from "../utils/check_injections";

const select = async (tableName: string, columns: string[], filters: any): Promise<any> => {
    const validatedTableName = validateInput(tableName);
    const validatedColumns = columns.map((field) => validateInput(field)).join(", ");
    if (filters) {
        const keys = Object.keys(filters);
        const values = Object.values(filters);
        // const validatedFilters = keys.map((field, index) => {
        //     return `${field} = ${validateInput(values[index])}`;
        // }).join(" AND ");
        // return await pool.query(`SELECT ${validatedColumns} FROM ${validatedTableName} WHERE ${validatedFilters}`);
    }
    return await pool.query(`SELECT ${validatedColumns} FROM ${validatedTableName}`);
};

export default select;
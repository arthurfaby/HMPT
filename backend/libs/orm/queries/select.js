const { pool } = require("../../../database");
const { validateInput } = require("../utils/check_injections");

/**
 * @param tableName {string} - The name of the table
 * @param columns {string[]} - The columns to select
 * @param filters {object} - The filters to apply
 * @returns {object}
 */
const select = async (tableName, columns, filters) => {
    const validatedTableName = validateInput(tableName);
    const validatedColumns = columns.map((field) => validateInput(field)).join(", ");
    if (filters) {
        const keys = Object.keys(filters);
        const values = Object.values(filters);
        const validatedFilters = keys.map((field, index) => {
            return `${field} = ${validateInput(values[index])}`;
        }).join(" AND ");
        return await pool.query(`SELECT ${validatedColumns} FROM ${validatedTableName} WHERE ${validatedFilters}`);
    }
    return await pool.query(`SELECT ${validatedColumns} FROM ${validatedTableName}`);
};


module.exports = {
    select
};
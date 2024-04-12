import pool from "../../../database";

const query = async <T>(query: string): Promise<any> => {
    return await pool.query(query);
}

export default query;
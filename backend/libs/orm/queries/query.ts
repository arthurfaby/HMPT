import pool from "../../../database";
import { APIResponse } from "../types/response_type";

const query = async <T>(query: string): Promise<APIResponse<T>> => {
    return await pool.query(query);
}

export default query;
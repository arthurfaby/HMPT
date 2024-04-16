import pool from "../../../database";
import { AbstractDto } from "../dtos/abstract_dto";
import { APIResponse } from "../types/response_type";

const query = async <T extends AbstractDto>(query: string): Promise<T[]> => {
    return (await pool.query(query) as APIResponse<T>).rows;
}

export default query;
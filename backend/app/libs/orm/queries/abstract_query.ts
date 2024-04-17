import pool from "../../../database";
import { AbstractDto } from "../dtos/abstract_dto";
import { APIResponse } from "../types/response_type";

const query = async <T>(query: string): Promise<APIResponse<T>> => {
  return (await pool.query(query)) as APIResponse<T>;
};

export default query;

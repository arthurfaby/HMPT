import pool from "../../../database";
import { APIResponse } from "../types/response_type";

const query = async <T>(
  query: string,
  values: unknown[] = []
): Promise<APIResponse<T>> => {
  try {
    if (values.length > 0) {
      return (await pool.query(query, values)) as APIResponse<T>;
    }
    return (await pool.query(query)) as APIResponse<T>;
  } catch (error: unknown) {
    return { command: "Failed.", rows: [], rowCount: 0 };
  }
};

export default query;

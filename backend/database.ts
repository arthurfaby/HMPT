import { Pool } from "pg";

const pool: Pool = new Pool({
    user: 'postgres',
    password: 'changeme',
    host: 'postgres',
    port: 5432,
    database: 'matcha'
})

export default pool;
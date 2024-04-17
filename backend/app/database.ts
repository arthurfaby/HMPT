import pg from 'pg'


const pool = new pg.Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'matcha',
    password: 'changeme',
    port: 5432,
});

export default pool;


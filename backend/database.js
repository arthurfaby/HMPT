const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'changeme',
    host: 'postgres',
    port: 5432,
    database: 'matcha'
})

module.exports = {pool};
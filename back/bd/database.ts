import { Pool } from 'pg';

const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'postgres',
    password: '123',
    port: 5432,
});

export default pool;

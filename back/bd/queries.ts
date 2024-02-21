import pool from './database';

export async function getUserByEmail(email: string)
{
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return rows[0];
    } catch (error) {
        console.error('Erro ao buscar usuario por e-mail: ', error);
        throw error;
    }
}
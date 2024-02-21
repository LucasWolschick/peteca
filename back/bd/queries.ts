import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getUserByEmail(email: string)
{
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuario por e-mail: ', error);
        throw error;
    }
}
import { PrismaClient, User } from '@prisma/client'

export class UserRepository {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma
    }

    async create(user: Omit<User, 'id'>): Promise<User> {
        return this.prisma.user.create({ data: user })
    }
}
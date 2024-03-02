import { User } from '@prisma/client'


export interface UserService {
    register(user: Omit<User, 'id'>): Promise<User>;
    login(email: string, password: string, remember: boolean): Promise<User>;
}
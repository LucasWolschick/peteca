import { User } from '@prisma/client'
import { UserRepository } from '../repository/UsuarioRepository'
import { UserService } from '../service/UsuarioService'
import bcrypt from 'bcrypt'


export class UserServiceImpl implements UserService {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async register(user: Omit<User, 'id'>): Promise<User> {
        if(!user.email.includes('@')) {
            throw new Error('Email invalido')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.senha, salt)

        user.senha = hashedPassword

        return this.userRepository.create(user)
    }
}
import express from 'express';
import { UserServiceImpl } from '../serviceImpl/UsuarioServiceImpl';
import { UserRepository } from '../repository/UsuarioRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const userService = new UserServiceImpl(userRepository);

const router = express.Router();

router.post('/register', async (req, res) => {
  const user = await userService.register(req.body);
  res.json(user);
});

export default router;
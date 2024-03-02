import * as express from 'express';
import { UserServiceImpl } from '../serviceImpl/UsuarioServiceImpl';
import { UserRepository } from '../repository/UsuarioRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const userService = new UserServiceImpl(userRepository);

// prefix: /usuario
const router = express.Router();

router.post('/register', async (req, res) => {
  const user = await userService.register(req.body);
  res.json(user);
});

router.post('/login', async (req, res) => {
  const { email, password, remember } = req.body;
  const user = await userService.login(email, password, remember);
  res.json(user);
});

export default router;
import * as express from 'express';
import passswordResetRoutes from './controller/passwordResetRoutes';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
const PORT = 8080;

app.use(express.json());

// Rotas para redefinicao de senhaq
app.use('/resetpassword', passswordResetRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
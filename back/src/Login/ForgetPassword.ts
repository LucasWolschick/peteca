import express from 'express';
import { forgotPasswordController } from './ForgetPasswordController';

const router = express.Router();

router.post('/forgot-password', forgotPasswordController);

export default router;
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { getRepository } from 'typeorm';
import User from '../../../front/peteca-front/src/app/components/items/system/User';

export const forgotPasswordController = async (req: Request, res: Response) => {
    const { email } = req.body;

    //  Verificar se o email existe no seu banco de dados
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
        return res.status(404).send({ message: 'Email não encontrado' });
    }
    // Enviar um email para o usuario com instrucoes de como refenicar a senha
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password'
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Recuperação de senha',
        text: 'Você esqueceu sua senha? Não se preocupe, clique no link para recuperá-la',
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send({ message: 'Erro ao enviar email' });
        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).send({ message: 'Email enviado com sucesso' });
        }
    });
};
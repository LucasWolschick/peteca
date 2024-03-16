import { Transporter, createTransport } from "nodemailer";
import logger from "../logger";

export class EmailService {
  private transporter: Transporter;
  private mock: boolean;

  constructor(mock: true | undefined) {
    this.mock = !!mock;

    if (mock) {
      this.transporter = createTransport({
        jsonTransport: true,
      });
    } else {
      this.transporter = createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    logger.info(`Enviando email para: ${to}; assunto: ${subject}`);

    const res = await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    if (this.mock) {
      logger.debug(res.message);
    }
  }
}

import { Transporter, createTransport } from "nodemailer";

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
    const res = await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    if (this.mock) {
      console.log(res.message);
    }
  }
}

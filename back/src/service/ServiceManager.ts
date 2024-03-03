import { EmailService } from "./EmailService";
import { UserService } from "./UserService";

export class ServiceManager {
  private static userService: UserService | null = null;
  private static emailService: EmailService | null = null;

  static getUserService(): UserService {
    if (!this.userService) this.userService = new UserService();
    return this.userService;
  }

  static getEmailService(): EmailService {
    if (!this.emailService)
      this.emailService = new EmailService(
        process.env.MOCK_EMAIL ? true : undefined
      );
    return this.emailService;
  }
}

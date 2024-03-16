import { User } from "@prisma/client";
import { EmailService } from "./EmailService";
import { PermissionsService } from "./PermissionsService";
import { UserService } from "./UserService";

export class ServiceManager {
  private static userService: UserService | null = null;
  private static emailService: EmailService | null = null;
  private static permissionsService: PermissionsService | null = null;

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

  static getPermissionsService(): PermissionsService {
    if (!this.permissionsService)
      this.permissionsService = new PermissionsService();
    return this.permissionsService;
  }

}

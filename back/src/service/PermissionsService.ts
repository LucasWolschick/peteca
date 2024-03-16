import { PermissionsRepository } from "../repository/PermissionsRepository";
import RepositoryService from "./RepositoryService";

export class PermissionsService {
  private permissionsRepository: PermissionsRepository;

  constructor() {
    this.permissionsRepository = RepositoryService.getPermissionRepository();
  }

  async getAllPermissions() {
    return await this.permissionsRepository.getAllPermissions();
  }

  async getUserPermissions(id: number) {
    return await this.permissionsRepository.getPermissions(id);
  }

  async userHasPermission(id: number, permission: string) {
    const permissions = await this.permissionsRepository.getPermissions(id);
    return permissions.includes(permission) || permissions.includes("admin");
  }
}

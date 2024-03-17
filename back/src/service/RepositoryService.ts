import ItemRepository from "../repository/ItemRepository";
import MovimentacaoItemRepository from "../repository/MovimentacaoItemRepository";
import { PermissionsRepository } from "../repository/PermissionsRepository";
import { TokenRepository } from "../repository/TokenRepository";
import { UserRepository } from "../repository/UserRepository";
import { PrismaClient } from "@prisma/client";

class RepositoryService {
  private tokenRepository: TokenRepository | null = null;
  private userRepository: UserRepository | null = null;
  private permissionRepository: PermissionsRepository | null = null;
  private prisma: PrismaClient;
  private itemRepository: ItemRepository | null = null;
  private movimentacaoItemRepository: MovimentacaoItemRepository | null = null;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getTokenRepository(): TokenRepository {
    if (!this.tokenRepository)
      this.tokenRepository = new TokenRepository(this.prisma);
    return this.tokenRepository;
  }

  getUserRepository(): UserRepository {
    if (!this.userRepository)
      this.userRepository = new UserRepository(this.prisma);
    return this.userRepository;
  }

  getPermissionRepository(): PermissionsRepository {
    if (!this.permissionRepository)
      this.permissionRepository = new PermissionsRepository(this.prisma);
    return this.permissionRepository;
  }

  getItemRepository(): ItemRepository {
    if (!this.itemRepository)
      this.itemRepository = new ItemRepository(this.prisma);
    return this.itemRepository;
  }

  getMovimentacaoItemRepository(): MovimentacaoItemRepository {
    if (!this.movimentacaoItemRepository)
      this.movimentacaoItemRepository = new MovimentacaoItemRepository(
        this.prisma
      );
    return this.movimentacaoItemRepository;
  }
}

export default new RepositoryService(new PrismaClient());

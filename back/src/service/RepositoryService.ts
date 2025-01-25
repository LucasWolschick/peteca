import { AccountChangeRepository } from "../repository/AccountChangeRepository";
import { AccountRepository } from "../repository/AccountRepository";
import { FinancialReportRepository } from "../repository/FinancialReportRepository";
import { FinancialStatementRepository } from "../repository/FinancialStatementRepository";
import { ItemRepository } from "../repository/ItemRepository";
import { MovimentacaoItemRepository } from "../repository/MovimentacaoItemRepository";
import { PermissionsRepository } from "../repository/PermissionsRepository";
import { TokenRepository } from "../repository/TokenRepository";
import { TransactionRepository } from "../repository/TransactionRepository";
import { UserRepository } from "../repository/UserRepository";
import { PrismaClient } from "@prisma/client";

class RepositoryService {
  private tokenRepository: TokenRepository | null = null;
  private userRepository: UserRepository | null = null;
  private permissionRepository: PermissionsRepository | null = null;
  private prisma: PrismaClient;
  private itemRepository: ItemRepository | null = null;
  private movimentacaoItemRepository: MovimentacaoItemRepository | null = null;
  private accountRepository: AccountRepository | null = null;
  private accountChangeRepository: AccountChangeRepository | null = null;
  private transactionRepository: TransactionRepository | null = null;
  private financialReportRepository: FinancialReportRepository | null = null;
  private financialStatementRepository: FinancialStatementRepository | null =
    null;

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

  getAccountRepository(): AccountRepository {
    if (!this.accountRepository)
      this.accountRepository = new AccountRepository(this.prisma);
    return this.accountRepository;
  }

  getAccountChangeRepository(): AccountChangeRepository {
    if (!this.accountChangeRepository)
      this.accountChangeRepository = new AccountChangeRepository(this.prisma);
    return this.accountChangeRepository;
  }

  getTransactionRepository(): TransactionRepository {
    if (!this.transactionRepository)
      this.transactionRepository = new TransactionRepository(this.prisma);
    return this.transactionRepository;
  }

  getFinancialReportRepository(): FinancialReportRepository {
    if (!this.financialReportRepository)
      this.financialReportRepository = new FinancialReportRepository(
        this.prisma
      );
    return this.financialReportRepository;
  }

  getFinancialStatementRepository(): FinancialStatementRepository {
    if (!this.financialStatementRepository)
      this.financialStatementRepository = new FinancialStatementRepository(
        this.prisma
      );
    return this.financialStatementRepository;
  }
}

export default new RepositoryService(new PrismaClient());

import * as fs from "fs";
import * as readline from "readline";
import BackupRepository from "../repository/BackupRespository";
import logger from "../logger";

export class AdminService {
  private backupRepository: BackupRepository;

  constructor() {
    this.backupRepository = new BackupRepository();
  }

  async getLogs(
    from: Date,
    to: Date,
    limit: number,
    level: "debug" | "info" | "warn" | "error"
  ): Promise<any[]> {
    if (!from) {
      from = new Date(0);
    }

    if (!to) {
      to = new Date();
    }

    if (!limit) {
      limit = 100;
    }

    if (!level) {
      level = "info";
    }

    const levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };

    const logs: any[] = [];

    const fileStream = fs.createReadStream("combined.log");
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const log = JSON.parse(line);
      const date = new Date(log.timestamp ?? 0);

      if (from <= date && date <= to && levels[log.level] >= levels[level]) {
        logs.push(log);

        if (logs.length >= limit) {
          break;
        }
      }
    }

    return logs;
  }

  async performBackup() {
    try {
      const readStream = await this.backupRepository.backupDatabase();
      logger.info("Backup realizado com sucesso.");
      return readStream;
    } catch (error) {
      logger.error("Falha ao realizar o backup:", error);
      return null;
    }
  }

  async performImport(backupFilePath: string) {
    try {
      await this.backupRepository.importBackup(backupFilePath);
      console.log("Importação do backup realizada com sucesso.");

      fs.unlink(backupFilePath, (err) => {
        if (err) {
          console.error(`Erro ao remover o arquivo de backup: ${err}`);
        } else {
          console.log("Arquivo de backup removido com sucesso.");
        }
      });
    } catch (error) {
      console.error("Falha na importação do backup:", error);
    }
  }
}

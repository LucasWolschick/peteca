import { PrismaClient } from "@prisma/client";
import { env } from "process";
import logger from "../logger";
import * as path from "path";
import * as fs from "fs";
import { exec } from "child_process";

require("dotenv").config({ path: "../.env" });

class BackupRepository {
  private prisma: PrismaClient;

  async backupDatabase() {
    const connectionDetails = process.env.DATABASE_URL.match(
      /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/
    );
    const [user, password, host, port, dbName] = connectionDetails.slice(1);

    process.env.PGPASSWORD = password;

    fs.mkdirSync(path.join(__dirname, "..", "backups"), { recursive: true });

    const backupCommand = `"${
      env.PG_PATH
    }pg_dump" -U ${user} -h ${host} -p ${port} -d ${dbName} -F c -f ${path.join(
      __dirname,
      "..",
      "backups",
      "backup.sql"
    )}`;

    return new Promise<fs.ReadStream>((resolve, reject) => {
      exec(backupCommand, (error, stdout, stderr) => {
        if (error) {
          logger.error(`Erro ao fazer backup: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          logger.error(`Erro ao fazer backup: ${stderr}`);
          reject(new Error(stderr));
          return;
        }
        logger.warn("Backup concluído com sucesso.");
        resolve(
          fs.createReadStream(
            path.join(__dirname, "..", "backups", "backup.sql")
          )
        );
      });
    }).finally(() => {
      process.env.PGPASSWORD = "";
    });
  }

  async importBackup(backupFilePath: string) {
    const connectionDetails = process.env.DATABASE_URL.match(
      /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/
    );
    const [user, password, host, port, dbName] = connectionDetails.slice(1);

    process.env.PGPASSWORD = password;

    const importCommand = `"${env.PG_PATH}pg_restore" -U ${user} -h ${host} -p ${port} -d ${dbName} -c -1 ${backupFilePath}`;

    return new Promise<void>((resolve, reject) => {
      exec(importCommand, (error, stdout, stderr) => {
        if (error) {
          logger.error(`Erro ao importar o backup: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          logger.error(`Erro ao importar o backup: ${stderr}`);
          reject(new Error(stderr));
          return;
        }
        logger.warn("Backup importado com sucesso.");
        resolve();
      });
    }).finally(() => {
      process.env.PGPASSWORD = "";
    });
  }
}

export default BackupRepository;

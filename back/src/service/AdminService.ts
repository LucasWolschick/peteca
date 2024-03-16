import * as fs from "fs";
import * as readline from "readline";

export class AdminService {
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
      console.log(log, date);

      if (from <= date && date <= to && levels[log.level] >= levels[level]) {
        logs.push(log);

        if (logs.length >= limit) {
          break;
        }
      }
    }

    return logs;
  }
}
const { exec } = require('child_process');
require('dotenv').config({ path: '../.env' });

class BackupRepository {
    async backupDatabase() {
        const dbName = process.env.DBNAME;
        const user = process.env.USER;
        const password = process.env.PASSWORD;
        const host = process.env.HOST;
        const port = process.env.PORT || '5432';

        process.env.PGPASSWORD = password;

        const backupCommand = `pg_dump -U ${user} -h ${host} -p ${port} -d ${dbName} -f backup.sql`;

        return new Promise<void>((resolve, reject) => {
            exec(backupCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erro ao fazer backup: ${error.message}`);
                    reject(error);
                    return;
                }
                if (stderr) {
                    console.error(`Erro ao fazer backup: ${stderr}`);
                    reject(new Error(stderr));
                    return;
                }
                console.log('Backup concluído com sucesso.');
                resolve();
            });
        }).finally(() => {
            process.env.PGPASSWORD = '';
        });
    }

    async importBackup(backupFilePath: string) {
        const dbName = process.env.DBNAME;
        const user = process.env.USER;
        const password = process.env.PASSWORD;
        const host = process.env.HOST;
        const port = process.env.PORT || '5432';

        process.env.PGPASSWORD = password;

        const importCommand = `psql -U ${user} -h ${host} -p ${port} -d ${dbName} -f ${backupFilePath}`;

        return new Promise<void>((resolve, reject) => {
            exec(importCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erro ao importar o backup: ${error.message}`);
                    reject(error);
                    return;
                }
                if (stderr) {
                    console.error(`Erro ao importar o backup: ${stderr}`);
                    reject(new Error(stderr));
                    return;
                }
                console.log('Backup importado com sucesso.');
                resolve();
            });
        }).finally(() => {
            process.env.PGPASSWORD = '';
        });
    }
}

export default BackupRepository;
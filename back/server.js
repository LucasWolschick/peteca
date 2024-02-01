const express = require('express');
const {Sequelize} = require('sequelize');
const configdb = require('../database/configdb');
const { sequelize } = require('../database/models/user');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

async function connectToPostgres(){
    const sequelize = new Sequelize(configdb);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
      }

      return sequelize;
}
 
const postgresClient = connectToPostgres();
console.log(postgresClient);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const UserDB = async () => {
    const User = await require("../database/models/user");
    const Permissions = await require("../database/models/permissions");
    User.belongsToMany(Permissions, {through: 'UserPermissions', timestamps:false});
    Permissions.belongsToMany(User, {through: 'UserPermissions', timestamps:false});
    sequelize.sync({alter: true});
    return User;
};

const User = UserDB();
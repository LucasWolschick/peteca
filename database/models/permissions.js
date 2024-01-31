const {Sequelize, DataTypes, Model} = require('sequelize');
const configdb = require('../configdb')
const sequelize = new Sequelize(configdb);

class Permissions extends Model {}
Permissions.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {sequelize,
    modelName: 'Permissions',
    timestamps: false,
    freezeTableName: true}
    );
Permissions.sync({alter: true});

module.exports = Permissions;

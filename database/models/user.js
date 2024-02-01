const {Sequelize, DataTypes, Model} = require('sequelize');
const configdb = require('../configdb')
const sequelize = new Sequelize(configdb);

class User extends Model {}
User.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ra_matricula:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email_verificado:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    admin:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    data_nascimento:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    imagem: {
        //Nao existe PATH em sequelize
        type: DataTypes.STRING,
        allowNull: true
    }
}, {sequelize,
    modelName: 'User',
    timestamps: false,
    freezeTableName: true}
);

module.exports = User;
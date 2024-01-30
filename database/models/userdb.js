const configdb = {
    database: 'nome do database',
    username: 'nome do usuario',
    password: 'senha',
    host: '127.0.0.1',
    dialect: 'postgres'
}
 
const {Sequelize, DataTypes, Model} = require('sequelize');
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
        allowNull: true
    },
    permissoes:{
        //Ver se vai manter em modo array
        type: DataTypes.ARRAY(DataTypes.STRING(100)),
        allowNull: true
    },
    imagem: {
        //Nao existe PATH em sequelize
        type: DataTypes.STRING,
        allowNull: true
    }
}, {sequelize,
    modelName: 'User',
    freezeTableName: true}
);
User.sync({alter: true});

module.exports = User;
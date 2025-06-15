const Sequelize = require('sequelize');
const UserModel = require('./modules/User');
const TasksModel = require('./modules/Task');
require('dotenv').config();

const sequelize = new Sequelize(
     process.env.DB_NAME,
     process.env.DB_USER,
     process.env.DB_PASSWORD,
     {
         dialect: 'mariadb',
         host: process.env.DB_HOST,
         port: process.env.DB_PORT,
         dialectOptions: { decimalNumbers: true },
         logging: false,
     }
);

const Op = Sequelize.Op;
const Users = UserModel(sequelize, Sequelize);
const Tasks = TasksModel(sequelize, Sequelize);

const Models = { Users, Tasks, Op };

const connection = {};
module.exports = async () => {
    if (connection.isConnected) {
        console.log('=> Using existing connection.');
        return Models;
    }
    await sequelize.sync();
    await sequelize.authenticate();
    connection.isConnected = true;
    console.log('=> Created a new connection.');
    return Models;
};

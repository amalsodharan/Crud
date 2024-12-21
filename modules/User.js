module.exports = (sequelize, Sequelize) => {
     return sequelize.define('User', {
          id: {
               type: Sequelize.UUID,
               defaultValue: Sequelize.UUIDV4,
               primaryKey: true
          },
          role: {
               type: Sequelize.STRING,
               allowNull: false,
               validate: {
                    isIn: [['admin', 'user']],
               },
          },   
          name: {
               type: Sequelize.STRING,
               allowNull: false,
          },
          email: {
               type: Sequelize.STRING,
               allowNull: false,
               unique: true,
          }
     });
};


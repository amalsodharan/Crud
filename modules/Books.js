module.exports = (sequelize, Sequelize) => {
     return sequelize.define('Books', {
          id: {
               type: Sequelize.UUID,
               defaultValue: Sequelize.UUIDV4,
               primaryKey: true
          },
          book_name: {
               type: Sequelize.STRING,
               allowNull: false,
          },
          price: {
               type: Sequelize.FLOAT,
               allowNull: false,
          },
          stock: {
               type: Sequelize.INTEGER,
               allowNull: false,
          },
     });
};

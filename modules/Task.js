module.exports = (sequelize, Sequelize) => {
     return sequelize.define('Task', {
          task_id: {
               type: Sequelize.UUID,
               defaultValue: Sequelize.UUIDV4,
               primaryKey: true
          },
          user_id: {
               type: Sequelize.UUID,
               allowNull: false,
               references: {
                    model: 'Users',
                    key: 'id'
               }
          },
          task_name: {
               type: Sequelize.STRING,
               allowNull: false,
          },
          time_required: {
               type: Sequelize.INTEGER,
               allowNull: false,
          },
          status: {
               type: Sequelize.BOOLEAN,
               allowNull: false,
          },
          is_deleted: {
               type: Sequelize.BOOLEAN,
               allowNull: false,
          },
     });
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
    userId: DataTypes.STRING,
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {});
  Goal.associate = function(models) {
    Goal.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'goals'
    });
  };
  return Goal;
};

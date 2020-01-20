'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Goal);
  };
  return User;
};

module.exports = function(sequelize, DataTypes) {

  var InterestsUsers = sequelize.define('interestsusers', {
    userId: DataTypes.INTEGER,
    interestId: DataTypes.INTEGER
  });

  return InterestsUsers;
};

module.exports = function(sequelize, DataTypes) {

  var Interest = sequelize.define('Interest', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Interest.belongsToMany(models.User, {
          through: 'users_interests'
        });
      }
    }
  });

  return Interest;
};

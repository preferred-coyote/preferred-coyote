var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || "development";
var config    = require('../config/environment');

if (env === 'development') {
  var sequelize = new Sequelize('conversely-dev', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });
} else if (env === 'production') {
  var sequelize = new Sequelize(config.db.base, config.db.user, config.db.pass, config.db.options);
}

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

/* associations */
// db.User.belongsToMany(db.Interest, {
//   through: db.InterestsUsers
// });
// db.Interest.belongsToMany(db.User, {
//   through: db.InterestsUsers
// });

/* sync */
sequelize.sync({
  force: true
}).then(function() {
  console.log('sync');
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

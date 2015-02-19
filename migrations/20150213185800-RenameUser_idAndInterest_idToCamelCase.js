"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.renameColumn('users_interests', 'user_id', 'userId');
    migration.renameColumn('users_interests', 'interest_id', 'interestId');
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.renameColumn('users_interests', 'userId', 'user_id');
    migration.renameColumn('users_interests', 'interestId', 'interest_id');
    done();
  }
};

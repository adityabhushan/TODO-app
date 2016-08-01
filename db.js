var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/tasks.sqlite'
});

var db = {};

db.tasks = sequelize.import(__dirname +'/models/tasks.js');

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
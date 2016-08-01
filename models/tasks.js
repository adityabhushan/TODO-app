module.exports = function(sequelize, DataTypes) {
// create table menu(name varchar(), description varchar(), quantity INT()..)
    return sequelize.define('tasks', {

        name: {
            type: DataTypes.STRING,
            allowNUll: false,

        },
        byDate: {
            type: DataTypes.STRING,
            allowNUll: false,

        },
        owner: {
            type: DataTypes.INTEGER,
            allowNUll: false,

        },
        status: {
            type: DataTypes.STRING,
            allowNUll: false,

        }
    });
};
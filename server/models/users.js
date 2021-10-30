const { Sequelize } = require("sequelize");

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    creditBalance: {
        type: Sequelize.INTEGER,
        defaultValue: 5
    }
});

module.exports = User;
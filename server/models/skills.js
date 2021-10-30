const { Sequelize } = require("sequelize");

const Skill = sequelize.define('skill', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    teacherId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    availability: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    duration: {
        type: Sequelize.INTEGER,
        defaultValue: 60
    },
    overallRating: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    numberOfRatings: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});
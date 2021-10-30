const { Sequelize } = require("sequelize");

const Class = sequelize.define('class', {
    skillId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Skill,
            key: 'id'
        }
    },
    confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    time: {
        type: Sequelize.DATE
    },
    learnerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    attended: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

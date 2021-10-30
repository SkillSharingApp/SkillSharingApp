const { Sequelize } = require("sequelize");

const Message = sequelize.define('message', {
    senderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    recipientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        } 
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});
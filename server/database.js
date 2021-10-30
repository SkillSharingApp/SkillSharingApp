const { Sequelize } = require("sequelize");

let db = {};

const sequelize = new Sequelize(
    'db-name',
    'db-user',
    'db-password',
    {
        host: 'db-host',
        port: 'db-port',
        dialect: 'mariadb',
        define: {
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        operatorsAliases: false
    }
);

let models = [
    //require('./models/users.js'),
    sequelize.define('user', {
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
    })//,
    // require('./models/skills.js'),
    // require('./models/classes.js'),
    // require('./models/messages.js'),
    // require('./models/sessions.js')
]

models.forEach(model => {
    const seqModel = new model(sequelize, Sequelize);
    db[seqModel.name] = seqModel;
});

Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
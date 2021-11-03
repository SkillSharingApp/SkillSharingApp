const { Sequelize } = require("sequelize");
const _ = require('lodash')
const Faker = require('faker');
const Op = Sequelize.Op;

const sequelize = new Sequelize(
    'skillSharingAppDB',
    'Eevee',
    'ptri3Eevee',
    {
        host: 'skillsharedb.cetgdw4b9o0k.us-west-1.rds.amazonaws.com',
        port: '3306',
        dialect: 'mariadb',
       
    }
);

const User = sequelize.define('User', {
    id: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail:true
        },
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

const Classes = sequelize.define('Classes',{
    id: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey: true
    },
    skillId:{   
        type: Sequelize.UUID,
        allowNull: false
    },
    confirmed:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false,
    },
    time:{
        type: Sequelize.TIME,
        allowNull: false
    },
    learnerId:{
        type: Sequelize.UUID,
        allowNull: false
    },
    attended:{
        type: Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull: false
    },
});
const Sessions = sequelize.define('Sessions',{

    token:{
        type: Sequelize.STRING,
        allowNull: false
    },
    userID:{
        type: Sequelize.UUID,
        references: {
            model: User,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },

});
const Messages = sequelize.define('Messages',{
    id: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey: true
    },
    senderId:{
        type: Sequelize.UUID,
        references: {
            model: User,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    recipentId:{
        type: Sequelize.UUID,
        allowNull: false
    },
    content:{
        type: Sequelize.STRING
    },
    timestamp:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW

    },
});
const SkillsOffered = sequelize.define('SkillsOffered',{
    id: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey: true
    },
    skillName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    skillDescription:{
        type: Sequelize.STRING
    },
    duration:{
        type: Sequelize.TIME,
        allowNull: false
    },
    teacherId:{
        type: Sequelize.UUID,
        references: {
            model: User,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
          },

    },
    availability:{
        type: Sequelize.STRING
    },
    overallRating:{
        type: Sequelize.DECIMAL,
        allowNull: false
    }, 
    numberOfRatings:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

});
// realtionship
User.hasMany(Messages);
Messages.belongsTo(User);

User.hasMany(SkillsOffered);
SkillsOffered.belongsTo(User);


//creates 4 people
    // sequelize.sync({force:true}).then(()=>{
    //     _.times(10,()=>{
    //         return User.create({
    //             firstName:Faker.name.firstName(),
    // lastName:Faker.name.lastName(),       
    //             username:Faker.internet.userName(),
    //             email:Faker.internet.email(),
    //             password:Faker.internet.password(),

    //         });
    //     });
    //     }).catch(function(e) {
    //         console.log(`server/db,js line 176 ${e}`); 
    // })


module.exports = sequelize

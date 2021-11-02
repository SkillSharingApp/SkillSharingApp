const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLID,
} = require('graphql');
const db = require('./db');
//add db.models
//stephanie

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a sigle user',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        creditBalance: { type: GraphQLNonNull(GraphQLInt) },
        skills: {
            type: new GraphQLList(SkillType),
            resolve: (user) => {
                return db.models.SkillsOffered.findAll({ where: { TeacherId: user.id }});
        }
    },
        messages: {
            type: new GraphQLList(MessageType),
            resolve: (user) => {
                return db.models.Messages.findAll({where: {senderId:user.Id}});
            }
        },
        conversationWith: {
            type: new GraphQLList(MessageType),
            args: { partnerId: { type: GraphQLInt } },
            resolve: (user) => {
                return db.models.Messages.findAll({where :{
                    senderId:user.id,
                    recipentId: user.recipentId 
                } });
            }
        },
        classes: {
            type: new GraphQLList(ClassType),
            resolve: (user) => {
                 let skill = db.models.SkillsOffered.findAll({
                where: {teacherId:user.id }});
                return skill.forEach(el=>{
                    return db.models.Classes.findAll({where:{skillId:skill.teacherId}})
                })
                
            }
        }
    }),
});

const SkillType = new GraphQLObjectType({
    name: 'Skill',
    description: 'This represents a single skill of a single user',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        teacherId: { type: GraphQLNonNull(GraphQLID) },
        skillName: { type: GraphQLNonNull(GraphQLString) },
        skillDescription: { type: GraphQLString },
        availability: { type: GraphQLString },
        duration: { type: GraphQLInt },
        overallRating: { type: GraphQLFloat },
        numberOfRatings: { type: GraphQLNonNull(GraphQLInt) },
        teacher: {
            type: UserType,
            resolve: (skill) => {
                return db.models.User.findAll({ where: { id: skill.teacherId } });
            }
        }
    })
});

const ClassType = new GraphQLObjectType({
    name: 'Class',
    description: 'This represents a single class session that is requested, scheduled, or attended',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        skillId: { type: GraphQLNonNull(GraphQLID) },
        confirmed: { type: GraphQLNonNull(GraphQLBoolean) },
        learnerId: { type: GraphQLNonNull(GraphQLID) },
        attended: { type: GraphQLNonNull(GraphQLBoolean) },
        learner: {
            type: UserType,
            resolve: (item) => {
                return 
                users.find(user => user.id === item.learnerId);
                db.models.User.findAll
            }
        },
        skill: { 
            type: SkillType,
            resolve: (classItem) => {
                return skills.find(skill => skill.id === classItem.skillId);
            }
        }
    })
});

const MessageType = new GraphQLObjectType({
    name: 'Message',
    description: 'This represents a single message between two users',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        senderId: { type: GraphQLNonNull(GraphQLID) },
        recipientId: { type: GraphQLNonNull(GraphQLID) },
        content: { type: GraphQLString },
        timestamp: { type: GraphQLString },
        sender: {
            type: UserType,
            resolve: (message) => {
                return users.find(user => user.id === message.senderId);
            }
        },
        recipient: {
            type: UserType,
            resolve: (message) => {
                return users.find(user => user.id === message.recipientId);
            }
        }
    })
});

const SessionType = new GraphQLObjectType({
    name: 'Session',
    description: 'This represents a single session of a single user',
    fields: () => ({
        token: { type: GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLNonNull(GraphQLID) },
        user: { 
            type: UserType,
            resolve: (session) => {
                return users.find(user => user.id === session.userId);
            }
        }
    })
})



//queries
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: 'A list of all users',
            args:{
                //args can only be a id with the graphqlint or email/string
                id :{
                    type:GraphQLID
                },
                email:{
                    type:GraphQLString
                }
            },
            resolve: (root, args) => db.models.User.findAll({where:args})
        },
        skills: {
            type: new GraphQLList(SkillType),
            description: 'A list of all skills of all users',
            args:{ 
                id :{
                    type:GraphQLID
                },
                teacherId:{
                    type:GraphQLID
                },
                skillName:{
                    type:GraphQLString
                }

            },
            resolve: (root ,args) => db.models.SkillsOffered.findAll({where:args})
        },
        classes: {
            type: new GraphQLList(ClassType),
            description: 'A list of all class sessions',
            args:{ 
                id :{
                    type:GraphQLID
                },
                skillId:{
                    type:GraphQLID
                },
                learnerId:{
                    type:GraphQLID
                }

            },
            resolve: (root, args) => db.models.Classes.findAll({where:args})
        },  
        messages: {
            type: new GraphQLList(MessageType),
            description: 'A list of all messages between users',
            args:{ 
                id :{
                    type:GraphQLID
                },
                senderId:{
                    type:GraphQLID
                },
                recipentId:{
                    type:GraphQLID
                },timestamp:{
                    type:GraphQLString
                }

            },
            resolve: (root, args) => db.models.Messages.findAll({where:args})
        },
        sessions: {
            type: new GraphQLList(SessionType),
            description: 'A list of all active user sessions',
            args:{
                token:{ 
                    type:GraphQLString
                },
                userId :{
                    type:GraphQLID
                }
            },
            resolve: (root, args) => db.models.Sessions.findAll({where:args})
        },
        // singleSkill: {
        //     type: SkillType,
        //     description: 'A single skill',
        //     args: {
        //         id: { type: GraphQLNonNull(GraphQLInt) }
        //     },
        //     resolve: (parent, args) => { 
        //         return db.models.SkillsOffered.find({where:args});
        //     }
        //}


    })
});

//

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addUser: {
            type: UserType,
            description: 'Add a user',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                username: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const user = { 
                    name: args.name,
                    username: args.username,
                    email: args.email,
                    password: args.password,
                    creditBalance: 5
                };
                users.push(user);
                return user;
            }
        },
        addSkill: {
            type: SkillType,
            description: 'Add a skill offered by a user',
            args: {
                teacherId: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                availability: { type: GraphQLString },
                duration: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                const skill = {  
                    teacherId: args.teacherId, 
                    name: args.name,
                    description: args.description ? args.description : '',
                    availability: args.availability ? args.availability : '',
                    duration: args.duration ? args.duration : 0,
                    overallRating: 0,
                    numberOfRatings: 0
                };
                skills.push(skill);
                return skill;
            }
        },
        updateSkill: {
            type: SkillType,
            description: 'Update a skill, excepting ratings fields',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                availability: { type: GraphQLString },
                duration: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                const skill = skills.find(skill => skill.id === args.id);
                if (args.name) skill.name = args.name;
                if (args.description) skill.description = args.description;
                if (args.availability) skill.availability = args.availability;
                if (args.duration) skill.duration = args.duration;
                return skill;
            }
        },
        deleteSkill: {
            type: SkillType,
            description: 'Delete a skill',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                return skills.splice(args.id - 1, 1)[0]; 
            }
        },
        addClass: {
            type: ClassType,
            description: 'Add a class session',
            args: {
                skillId: { type: GraphQLNonNull(GraphQLID) },
                learnerId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                const classItem = {
                    id: classes.length + 1,
                    skillId: args.skillId,
                    confirmed: false,
                    learnerId: args.learnerId,
                    attended: false
                };
                classes.push(classItem);
                return classItem;
            }
        },
        updateClass: {
            type: ClassType,
            description: 'Update a class session',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                confirmed: { type: GraphQLBoolean },
                attended: { type: GraphQLBoolean }
            },
            resolve: (parent, args) => {
                const classItem = classes.find(classItem => classItem.id === args.id);
                // if the confirmed status is updated from false to true - one credit should be deducted
                // from the learner's creditBalance?
                if (args.confirmed) classItem.confirmed = args.confirmed; 
                if (args.attended) classItem.attended = args.attended;
                return classItem;
            }
        },
        deleteClass: {
            type: ClassType,
            description: 'Delete a class session',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                return classes.splice(args.id - 1, 1)[0];
            }
        },
        addMessage: {
            type: MessageType,
            description: 'Add a single message',
            args: {
                senderId: { type: GraphQLNonNull(GraphQLID) },
                recipientId: { type: GraphQLNonNull(GraphQLID) },
                content: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const message = {
                    id: messages.length + 1,
                    senderId: args.senderId,
                    recipientId: args.recipientId,
                    content: args.content,
                    timestamp: 'now'
                };
                messages.push(message);
                return message;
            }
        },
        addSession: {
            type: SessionType,
            description: 'Add a single active user session',
            args: {
                token: { type: GraphQLNonNull(GraphQLString) },
                userId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                const session = {
                    token: args.token,
                    userId: args.userId
                };
                sessions.push(session);
                return session;
            }
        },
        deleteSession: {
            type: SessionType,
            description: 'Delete a single active user session to end the session',
            args: {
                token: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                return sessions.splice(sessions.indexOf(sessions.find(session => session.token === args.token)), 1)[0];
            }
        }
    })
});

module.exports = { RootQueryType, RootMutationType };
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean
} = require('graphql');


const { users, skills, classes, messages } = require('./fakeData');

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a sigle user',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        creditBalance: { type: GraphQLNonNull(GraphQLInt) },
        skills: {
            type: new GraphQLList(SkillType),
            resolve: (user) => {
                return skills.filter(skill => skill.teacherId === user.id);
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            resolve: (user) => {
                return messages.filter(message => message.senderId === user.id || message.recipientId === user.id);
            }
        },
        conversationWith: { //needs fixin'
            type: new GraphQLList(MessageType),
            args: { partnerId: { type: GraphQLInt } },
            resolve: (user) => {
                return messages.filter(message => {
                    return (message.senderId === args.partnerId 
                            && message.recipientId === user.id) 
                        || (message.senderId === user.id 
                             && message.recipientId === args.partnerId);
                });
            }
        },
        classes: {
            type: new GraphQLList(ClassType),
            resolve: (user) => {
                return classes.filter(item => item.learner === user.id);
            }
        }
    })
});

const SkillType = new GraphQLObjectType({
    name: 'Skill',
    description: 'This represents a single skill of a single user',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        teacherId: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        availability: { type: GraphQLString },
        duration: { type: GraphQLInt },
        overallRating: { type: GraphQLFloat },
        numberOfRatings: { type: GraphQLNonNull(GraphQLInt) },
        teacher: {
            type: UserType,
            resolve: (skill) => {
                return users.find(user => user.id === skill.teacherId);
            }
        }
    })
});

const ClassType = new GraphQLObjectType({
    name: 'Class',
    description: 'This represents a single class session that is requested, scheduled, or attended',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        skillId: { type: GraphQLNonNull(GraphQLInt) },
        confirmed: { type: GraphQLNonNull(GraphQLBoolean) },
        learnerId: { type: GraphQLNonNull(GraphQLInt) },
        attended: { type: GraphQLNonNull(GraphQLBoolean) },
        learner: {
            type: UserType,
            resolve: (item) => {
                return users.find(user => user.id === item.learnerId);
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
        id: { type: GraphQLNonNull(GraphQLInt) },
        senderId: { type: GraphQLNonNull(GraphQLInt) },
        recipientId: { type: GraphQLNonNull(GraphQLInt) },
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

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: 'A list of all users',
            resolve: () => users
        },
        skills: {
            type: new GraphQLList(SkillType),
            description: 'A list of all skills of all users',
            resolve: () => skills
        },
        classes: {
            type: new GraphQLList(ClassType),
            description: 'A list of all class sessions',
            resolve: () => classes
        },
        messages: {
            type: new GraphQLList(MessageType),
            description: 'A list of all messages between users',
            resolve: () => messages
        }
    })
});

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
                    id: users.length + 1, 
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
                teacherId: { type: GraphQLNonNull(GraphQLInt) },
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                availability: { type: GraphQLString },
                duration: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                const skill = { 
                    id: skills.length + 1, 
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
                id: { type: GraphQLNonNull(GraphQLInt) },
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
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                return skills.splice(args.id - 1, 1)[0]; 
            }
        }
    })
});

module.exports = { RootQueryType, RootMutationType };
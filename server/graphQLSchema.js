const { date } = require('faker');
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
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const db = require('./db');

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a sigle user',
    fields: () =>{
        return {
        id: {  type: GraphQLNonNull(GraphQLID)        },
        firstName: { type: GraphQLNonNull(GraphQLString),
            resolve: (user)=>{return user.firstName} 
        },
        lastName: { type: GraphQLNonNull(GraphQLString),
            resolve: (user)=>{return user.lastName} 
        },
        username: { type: GraphQLNonNull(GraphQLString), 
            resolve: (user)=>{return user.username}
        },
        email: { type: GraphQLNonNull(GraphQLString),
            resolve: (user)=>{return user.email}
        },
        password: { type: GraphQLNonNull(GraphQLString),
            resolve: (user)=>{return user.password}
        },
        creditBalance: { type: GraphQLNonNull(GraphQLInt) },
        skills: {
            type: new GraphQLList(SkillType),
            resolve: async (user) => {
                return await db.models.SkillsOffered.findAll({ where: { TeacherId: user.id }});
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            resolve: async (user) => {
                return await db.models.Messages.findAll({where: {[Op.or]: [{senderId:user.Id}, {recipientId: user.id}]}});
            }
        },
        conversationWith: {
            type: new GraphQLList(MessageType),
            args: { partnerId: { type: GraphQLInt } },
            resolve: async (user) => {
                return await db.models.Messages.findAll({where:
                    {[Op.or]: [{senderId: user.id, recipentId: args.partnerId },
                               {senderId: args.partnerId, recipientId: user.id }]}});
            }
        },
        conversationsList: {
            type: new GraphQLList(UserType),
            args: { userId: { type: GraphQLID } },
            resolve: (user, args) => {
                const list = [];
                list.concat(db.models.Messages.findAll({ where: {senderId: user.Id } }).map(message => {
                   return db.models.User.findAll({ where: { id: message.recipientId }})
                }));
                list.concat(db.models.Messages.findAll({ where: { recipientId: user.Id }}).map(message => {
                    return db.models.User.findAll({ where: { id: message.senderId }})
                }));
                const set = new Set(list);
                const list2 = [];
                set.forEach((value) => {
                    list2.push(value);
                });
                return list2;
            }
        },
        mostRecentMessageInConversationWith: {
            type: MessageType,
            args: { partnerId: { type: GraphQLID } },
            resolve: async (user, args) => {
                const messageArray = await db.models.Messages.findAll({ where: {[Op.or]: [{recipentId: user.id}, {recipentId: args.partnerId }], [Op.or]: [{senderId: user.id}, {senderId: args.partnerId}]},
                                                                        order: Sequelize.literal('max(timestamp) DESC')});
                return messageArray[0];
            }
        },
        scheduledClasses: {
            type: new GraphQLList(ClassType),
            resolve: async (user) => {
                const skillsTeaching = await db.models.Skills.findAll({where: {TeacherId: user.id}});
                const classesArray = await db.models.Classes.findAll({where: {learnerId: user.id}});
                skillsTeaching.forEach(async (skill) => {
                    const classesTeachingArray = await db.models.Classes.findAll({where: {skillId: skill.id}});
                    classesArray.concat(classesTeachingArray);
                });
                return classesArray;
            }
        }
      }
    },
});

const SkillType = new GraphQLObjectType({
    name: 'Skill',
    description: 'This represents a single skill of a single user',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        teacherId: { type: GraphQLNonNull(GraphQLID)},
        skillName: { type: GraphQLNonNull(GraphQLString) },
        skillDescription: { type: GraphQLString },
        availability: { type: GraphQLString },
        duration: { type: GraphQLInt },
        overallRating: { type: GraphQLFloat },
        numberOfRatings: { type: GraphQLInt },
        teacher: {
            type: UserType,
            resolve: async (skill) => {
                const teach = await db.models.User.findAll({ where: { id: skill.teacherId } });
                return teach[0];
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
        time: { type: GraphQLString },
        learnerId: { type: GraphQLNonNull(GraphQLID) },
        time: { type: GraphQLNonNull(GraphQLString) },
        attended: { type: GraphQLNonNull(GraphQLBoolean) },
        learner: {
            type: UserType,
            resolve: async (item) => {
                const student = await db.models.User.findAll({where:{id: item.learnerId}});
                return student[0];
            }
        },
        skill: { 
            type: SkillType,
            resolve: async (classItem) => {
                const skillArray = await db.models.SkillsOffered.findAll({where: {id: classItem.skillId }});
                console.log(skillArray[0]);
                return skillArray[0];
            }
        },
    }),
});

const MessageType = new GraphQLObjectType({
    name: 'Message',
    description: 'This represents a single message between two users',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        senderId: { type: GraphQLNonNull(GraphQLID) },
        recipientId: { type: GraphQLNonNull(GraphQLID), resolve: (message) => message.recipentId },
        content: { type: GraphQLString },
        timestamp: { type: GraphQLString },
        sender: {
            type: UserType,
            resolve: async (message) => {
                const senderArray = await db.models.User.findAll({where :{id: message.senderId}})
                return senderArray[0];
            }
        },
        recipient: {
            type: UserType,
            resolve: async (message) => {
                const recipientArray = await db.models.User.findAll({where :{id: message.recipientId}})
                return recipientArray[0];
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
            resolve: async (session) => {
                const userArray = await db.models.User.findAll({where :{id: session.userId}});
                return userArray[0];
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
            resolve: (root, args) => db.models.User.findAll()
        },
        skills: {
            type: new GraphQLList(SkillType),
            description: 'A list of all skills of all users',
            resolve: () => db.models.SkillsOffered.findAll()
        },
        classes: {
            type: new GraphQLList(ClassType),
            description: 'A list of all class sessions',
            resolve: () => db.models.Classes.findAll()
        },  
        messages: {
            type: new GraphQLList(MessageType),
            description: 'A list of all messages between users',
            resolve: () => db.models.Messages.findAll()
        },
        sessions: {
            type: new GraphQLList(SessionType),
            description: 'A list of all active user sessions',
            resolve: () => db.models.Sessions.findAll()
        },
        singleSkill: {
            type: SkillType,
            description: 'A single skill',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: async (skill, args) => { 
                const skillArray = await db.models.SkillsOffered.findAll({where:{ id: args.id}});
                return skillArray[0];
            }
        },
        singleUser: {
            type: UserType,
            description: 'A single skill',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: async (parent, args) => {
                const userArray = await db.models.User.findAll({where: args});
                return userArray[0];
            }
        },
        singleClass: {
            type: ClassType,
            description: 'A single class',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: async (parent, args) => {
                const classArray = await db.models.Classes.findAll({where: args});
                return classArray[0];
            } 
        },
        singleMessage: {
            type: MessageType,
            description: 'A single message',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: async (parent, args) => {
                const messageArray = await db.models.Messages.findAll({where: args});
                return messageArray[0];
            } 
        }
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
            resolve: async (parent, args) => {
                console.log(args)
             
                let user = await db.models.User.create( { 
                    frstName: args.firstName,
                    username: args.username,
                    email: args.email.toLowerCase(),
                    password: args.password,
                    creditBalance: 5
                })

                return user;
                
            }
        },
        updateUser: {
            type: UserType,
            description: 'Update a user info ',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                username:{type: GraphQLString},
                email:{type: GraphQLString},
                oldPassword:{type: GraphQLString},
                password:{type: GraphQLString},
                creditBalance:{type: GraphQLInt},
            },
            resolve: async(parent, args) => {
                const updatedInfo ={}
        
                    if (args.password){
                        let currentPass = await db.models.User.findAll({where:{id:args.id}})
                        if (args.oldpassword === currentPass.password ||args.oldpassword === currentPass[0].password){
                            updatedInfo.password =args.password
                        }else {
                            throw new Error("Passwords Do not match!")
                        }
                    }
                    for (const [key,value] of Object.entries(args)){
                        if (key !=="id" && key !== "password" && key !== "oldpassword"){
                            updatedInfo[key]= value
                        }
                    }

                let newUser = await db.models.User.update(updatedInfo, { where: { id: args.id}})
                const updatedUser = await db.models.User.findAll({where:{id: args.id}})
                return updatedUser;
               
            }
        },
        addSkill: {
            type: SkillType,
            description: 'Add a skill offered by a user',
            args: {
                teacherId: { type: GraphQLNonNull(GraphQLID) },
                skillName: { type: GraphQLNonNull(GraphQLString) },
                skillDescription: { type: GraphQLNonNull( GraphQLString) },
                availability: { type: GraphQLNonNull( GraphQLString) },
                duration: { type: GraphQLInt }
            },
            resolve: async (parent, args) => {
                const skill = {  
                    teacherId: args.teacherId, 
                    skillName: args.skillName,
                    skillDescription: args.skillDescription ? args.skillDescription : '',
                    availability: args.availability ? args.availability : '',
                    duration: args.duration ? args.duration : 0,
                    overallRating: 0,
                    numberOfRatings: 0
                };
                return await db.models.SkillsOffered.create(
                    skill
                )
            }
        },
        updateSkill: {
            type: SkillType,
            description: 'Update a skill, excepting ratings fields',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                skillName: { type: GraphQLString },
                skillDescription: { type: GraphQLString },
                availability: { type: GraphQLString },
                duration: { type: GraphQLInt }
            },
            resolve: async(parent, args) => {
            const updatedInfo ={}
                for (const [key,value] of Object.entries(args)){
                    if (key !=="id"){
                        updatedInfo[key]= value
                    }
                }

                const updatedskill= await db.models.SkillsOffered.update(updatedInfo,{where:{ id: args.id}})
            }
        },
        deleteSkill: {
            type: SkillType,
            description: 'Delete a skill',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: async(parent, args) => {
                console.log(args)
                //const findSkill =db.models.SkillsOffered
                let skill = await db.models.SkillsOffered.destroy({where: {id: args.id}}) 
                return skill
               
            }
        },
        addClass: {
            type: ClassType,
            description: 'Add a class session',
            args: {
                skillId: { type: GraphQLNonNull(GraphQLID) },
                learnerId: { type: GraphQLNonNull(GraphQLID) },
                time: { type: GraphQLString } ,
              
            },
            resolve: async(parent, args) => {
                const classItem = {
                    skillId: args.skillId,
                    confirmed: false,
                    learnerId: args.learnerId,
                    attended: false,
                    time: args.time

                };
                return db.models.Classes.create(classItem);
            }
        },
        updateClass: {
            type: ClassType,
            description: 'Update a class session',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                confirmed: { type: GraphQLBoolean },
                attended: { type: GraphQLBoolean },
                time:{type:GraphQLString},
            },
            resolve: async(parent, args) => {
                console.log(args)
                const updatedInfo ={}
                for (const [key,value] of Object.entries(args)){
                    if (key !== 'id'){
                        updatedInfo[key] =value
                    }
                }
               const updatedClass = await db.models.Classes.update(updatedInfo,{where:{ id: args.id}})
               return db.models.Classes.findAll({ where :{ id: args.id}})

               //stephanie works but returns error 
            }
        },
        deleteClass: {
            type: ClassType,
            description: 'Delete a class session',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: async(parent, args) => {
                let deletedClass = await db.models.Classes.destroy({where: {id: args.id}}) 
                return deleteClass
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
            resolve: async(parent, args) => {
                console.log(args)
                let newMessage = await db.models.Messages.create({
                    senderId: args.senderId,
                    recipientId: args.recipientId,
                    content: args.content,
                    timestamp: new Date().toString()})
                return newMessage
            }
            //works
        },
        addSession: {
            type: SessionType,
            description: 'Add a single active user session',
            args: {
                token: { type: GraphQLNonNull(GraphQLString) },
                userId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: async(parent, args) => {
                const session = {
                    token: args.token,
                    userId: args.userId
                };
               let newSessh= await db.models.Sessions.create(session)
               return newSessh
            }
        },
        deleteSession: {
            type: SessionType,
            description: 'Delete a single active user session to end the session',
            args: {
                token: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async(parent, args) => {
                let deletedSessh = await db.models.Sessions.destroy({where:{id: args.id}}) 
                return sessh.destroy;
            
                //sessions.splice(sessions.indexOf(sessions.find(session => session.token === args.token)), 1)[0];
            }
        }
    })
});

module.exports = { RootQueryType, RootMutationType };
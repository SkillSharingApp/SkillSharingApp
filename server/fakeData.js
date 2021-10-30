const users = [
    { id: 1, name: 'Fred', username: 'freddyBoi', email: 'freshfred@email.com', password: '123', creditBalance: 8 },
    { id: 2, name: 'Jeorge', username: 'gorgieporgie', email: 'jeorgez@email.com', password: '123', creditBalance: 5 },
    { id: 3, name: 'Alistair', username: 'A Stairz', email: 'ascend@email.com', password: '123', creditBalance: 5 },
    { id: 4, name: 'Bernard', username: 'bernie34', email: 'bb34@email.com', password: '123', creditBalance: 0 }
];

const skills = [
    { id: 1, teacherId: 1, name: 'Hot Air Ballooning', description: 'a skillful skill', availability: 'Mondays', duration: 60, overallRating: 5, numberOfRatings: 1 },
    { id: 2, teacherId: 1, name: 'Woodworking', description: 'a skillful skill', availability: 'Mondays', duration: 60, overallRating: 3, numberOfRatings: 4 },
    { id: 3, teacherId: 2, name: 'Pestering Sam', description: 'a skillful skill', availability: 'All the times', duration: 90, overallRating: 5, numberOfRatings: 12 }
]

const classes = [
    { id: 1, skillId: 2, confirmed: false, learnerId: 3, attended: false },
    { id: 2, skillId: 3, confirmed: true, learnerId: 1, attended: false }
]

const messages = [
    { id: 1, senderId: 2, recipientId: 4, content: 'Pestering Sam is a great skill to have!', timestamp: '' },
    { id: 2, senderId: 4, recipientId: 2, content: 'I agree.', timestamp: '' },

]

const sessions = [
    { token: 'fhaweuog', userId: 1 },
    { token: 'hiegwaohg', userId: 3 },
    { token: 'jhvioawi', userId: 1 }
]


module.exports = { users, skills, classes, messages, sessions }
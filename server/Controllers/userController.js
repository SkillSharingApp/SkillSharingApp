const db = require('../Model/dbModel');
const bcrypt = require('bcrypt');
const salt_rounds = 10;

const userController ={};
//create a user
userController.createUser = (req, res, next) => {
    if (req.body.email && req.body.password) {
      try{
        bcrypt.hash(req.body.password, salt_rounds, (error, hash) => {
        
        if (error) console.log(`bycrpt: ${error}`)
        else {
          const SqlQuery = `INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)`;
  
          db.query(SqlQuery, [req.body.name, req.body.email, hash],'userController.createUser')
            .then(result => {
               console.log(result)
            })
            .catch(e => {
              console.log('CreateUser Error: ', e);
            });
  
        }
      });

      }catch (error) {
        next({
        log: error,
        status: 400,
        message: { error:  `userController.createUser ${error}`  },
    })
      
    }
  };
}

//login a user


//verify user 


//updateCredit balance
module.exports = userController
const db = require('../Model/dbModel');
const bcrypt = require('bcrypt');

const userController ={};
//create a user
userController.createUser = (req, res, next) => {
    if (req.body.email && req.body.password) {
      try{
        bcrypt.hash(req.body.password, salt_rounds, (error, hash) => {
        //error check
        if (error) console.log('bcrypt error');
        //create user w encrypted pw
        else {
          const queryString = `INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)`;
  
          db.query(queryString, [req.body.name, req.body.email, hash])
            .then(result => {
                
              if (result) return next();
            })
            .catch(e => {
              console.log('CreateUser Error: ', e);
            });
  
        }
      });

      }catch (error) {
        next({
          log: 'createUserController.createUser', error,
        });
      
    }
  };
}

//login a user


//verify user 


//updateCredit balance
module.exports = userController
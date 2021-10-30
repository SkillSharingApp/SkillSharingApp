const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const sessionController =require('../Controllers/sessionController')
//



router.post('/createUser',[userController.createUser],(req, res) => {
    return res.status(209).send();
    
  });
/*
router.get('/',[],(req, res) => {
    return res.status(209).send();
    
  });
//signup
 
//signin
  router.post('/',[],(req, res) => {
    return res.status(209).send();
    
  });
//googleAuth
  router.post('/',[],(req, res) => {
    return res.status(209).send();
    
  });
//get userinfo?
  router.get('/',[],(req, res) => {
    return res.status(209).send();
    
  })

  */
  module.exports = router;
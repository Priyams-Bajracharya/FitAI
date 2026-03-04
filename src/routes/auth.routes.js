const express= require('express')
const router = express.Router()//creates a mini express router that handles a group of related routes 
const {register , login} = require('../controller/auth.controller')

router.post('/register',register)
router.post('/login',login)

module.exports =router
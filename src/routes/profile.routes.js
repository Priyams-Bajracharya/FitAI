const express = require('express')
const router = express.Router()

const {getProfile , createProfile , updateProfile , deleteProfile} =require('../controller/profile.controller')

const authMiddleware =require('../middleware/auth.middleware')

router.get('/',authMiddleware,getProfile)
router.post('/',authMiddleware,createProfile)
router.patch('/',authMiddleware,updateProfile)
router.delete('/',authMiddleware,deleteProfile)

module.exports = router
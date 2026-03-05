const express =require('express')
const router = express.Router()

const authMiddleware =require('../middleware/auth.middleware')

const {getWorkoutPlans,getWorkoutPlanById,createWorkoutPlan} = require('../controller/workout.controller')

router.get('/',authMiddleware,getWorkoutPlans)
router.get('/:id',authMiddleware,getWorkoutPlanById)
router.post('/',authMiddleware,createWorkoutPlan)

module.exports =router
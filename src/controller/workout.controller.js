const pool = require('../db')
const { generateWorkoutPlan } = require('../services/openai.service')
const { saveWorkoutPlan } = require('../services/workout.service')

const createWorkoutPlan = async (req, res) => {
  const user_id = req.user.userId
  try {
    const result = await pool.query(
      'SELECT * FROM profiles where user_id=$1 ', [user_id])
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Profile not found"
      })
    }

    const profile = result.rows[0]
    const planData = await generateWorkoutPlan(profile)
    const savedWorkoutPlan = await saveWorkoutPlan(user_id, planData)
    return res.status(200).json({
      message: "Successfully created the workout plan",
      savedWorkoutPlan
    })

  } catch (err) {
    res.status(500).json({
      error: 'server error'
    })
  }
}

const getWorkoutPlans = async (req, res) => {
  const userId = req.user.userId
  try {
    const result = await pool.query(
      'SELECT * FROM workout_plans where user_id = $1', [userId]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'no workout plan found'
      })
    }
    return res.status(200).json({
      message: 'Workout plans retrieved successfully',
      workout_plans: result.rows
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      error: 'Server error'
    })
  }
}

const getWorkoutPlanById = async (req, res) => {
  const userId = req.user.userId
  const planId = req.params.id
  try {
    const result = await pool.query(
      'SELECT * FROM workout_plans WHERE user_id=$1 AND id=$2', [userId, planId]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "No workout plan found for the id"
      })
    }
    return res.status(200).json({
      message: "Workout plan retrieved successfully",
      workout_plan: result.rows[0]
    })
  }
  catch (error) {
    console.error(error.message)
    return res.status(500).json({
      error: "Server error"
    })
  }
}

module.exports = { createWorkoutPlan, getWorkoutPlans, getWorkoutPlanById }
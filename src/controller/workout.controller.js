const pool = require('../db')

const createWorkoutPlan =async(req,res) =>{
  const userId =req.user.userId
  res.status(200).json({message:'Create workout plan hit'})
}

const getWorkoutPlans = async (req,res)=>{
  const userId = req.user.userId
  try{
  const result = await pool.query(
    'SELECT * FROM workout_plans where user_id = $1',[userId]
  )
  if(result.rows.length === 0){
    return res.status(400).json({
      error:'no workout plan found'
    })
  }
  return res.status(200).json({
    message:'Workout plans retrieved successfully',
    workout_plans : result.rows
  })
}catch(error){
  console.error(error.message)
  return res.status(500).json({
    error:'Server error'
  })
}
}

const getWorkoutPlanById =async(req,res)=>{
  const userId = req.user.userId
  const planId = req.params.id
  try{
    const result = await pool.query(
      'SELECT * FROM workout_plans WHERE user_id=$1 AND id=$2',[userId,planId]
    )
    if(result.rows.length === 0){
      return res.status(400).json({
        error:"No workout plan found for the id"
      })
    }
    return res.status(200).json({
      message:"Workout plan retrieved successfully",
      workout_plan: result.rows[0]
    })
  }
  catch(error){
    console.error(error.message)
    return res.status(500).json({
      error:"Server error"
    })
  }
}

module.exports = {createWorkoutPlan,getWorkoutPlans,getWorkoutPlanById}
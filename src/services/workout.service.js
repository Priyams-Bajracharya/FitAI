const pool =require('../db')

const saveWorkoutPlan= async (userId,planData) =>{
  const result = await pool.query(
    'INSERT INTO workout_plans(user_id,goal) VALUES($1,$2) RETURNING *',[userId,planData.goal]
  )
  for (const day of planData.days){
    const dayResult = await pool.query('INSERT INTO plan_days(plan_id,day_number, day_name,focus,notes) VALUES($1,$2,$3,$4,$5) returning *',[result.rows[0].id,day.day_number,day.day_name,day.focus,day.notes || null])
    const savedDay =dayResult.rows[0]

    for (const exercise of day.exercises){
      const exerciseResult =await pool.query(
        'INSERT INTO plan_exercises(plan_day_id,exercise_name,sets,reps,duration_minutes,rest_seconds,notes,order_index) VALUES($1,$2,$3,$4,$5,$6,$7,$8) returning *',
        [savedDay.id,exercise.exercise_name,exercise.sets || null ,exercise.reps || null, exercise.duration_minutes || null,exercise.rest_seconds,exercise.notes || null,exercise.order_index]
      )
      const savedExercise =exerciseResult.rows[0]
    }
  }
  return result.rows[0]
}

module.exports= {saveWorkoutPlan}
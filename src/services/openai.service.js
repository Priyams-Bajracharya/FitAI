const generateWorkoutPlan = async (profile) =>{
  return{
    goal:profile.goal,
    days:[
      {
        day_number:1,
        day_name:"Monday",
        focus:"Upper Body",
        exercises: [
          {exercise_name: "Push-ups",
            sets:3,
            reps:12,
            rest_seconds:60,
            order_index:1
          }
        ]
      }
    ]
  }
}

module.exports = {generateWorkoutPlan}
const pool = require('../db')

const getProfile = async (req, res) => {
  const user_id = req.user.userId
  try {
    const result = await pool.query(
      'SELECT * FROM profiles where user_id=$1 ', [user_id])
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Profile not found"
      })
    }

    return res.status(200).json({
      message: 'profile retrieved successfully',
      profile: result.rows[0]

    })

  } catch (err) {
    res.status(500).json({
      error: 'server error'
    })
  }

}

const createProfile = async (req, res) => {
  const user_id = req.user.userId
  const { age, weight, height, goal, fitness_level, equipment } = req.body

  try {
    const result = await pool.query(
      'INSERT INTO profiles (user_id , age , weight , height , goal , fitness_level ,equipment) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *', [ user_id, age, weight, height, goal, fitness_level, equipment]
    )
    return res.status(200).json({
      message: "Profile created successfully",
      profile: result.rows[0]
    })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      error: "Failed to create new profile"
    })
  }
}

const updateProfile = async (req, res) => {
  const user_id =req.user.userId
  const { age, weight, height, goal, fitness_level, equipment } = req.body
  try {
    const result = await pool.query(
      'UPDATE profiles SET age=$1, weight=$2, height=$3, goal=$4, fitness_level=$5, equipment=$6, updated_at=NOW() WHERE user_id=$7 RETURNING *', [ age, weight, height, goal, fitness_level, equipment,user_id]
    )
    return res.status(200).json({
      message: 'Profile updated successfully',
      profile: result.rows[0]
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to update profile'
    })
  }
}

const deleteProfile = async (req, res) => {
  const user_id =req.user.userId
  try {
    const result = await pool.query(
      'DELETE FROM profiles WHERE user_id=$1', [user_id]
    )
    return res.status(200).json({
      message: 'Profile deleted successfully',
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to delete profile'
    })
  }

}

module.exports = {getProfile,createProfile,updateProfile,deleteProfile}
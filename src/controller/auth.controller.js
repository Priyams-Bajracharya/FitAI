const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const pool = require('../db')

const register = async(req,res)=>{
  const {username, email , password} =req.body

  //validate user inputs
  if(!username || !email || !password){
    return res.status(400).json({
      error:'All fields are required'
    })
  }

  if(password.length < 6){
    return res.status(400).json({
      error:'Password must be atleast 6 charecters'
    })
  }

  try{
    //check if email already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',[email]
    )

    if(existingUser.rows.length > 0){
      return res.status(400).json({
        error:'Email already in use'
      })
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(password,salt)

    //save user to database
    const result = await pool.query(
      'INSERT INTO users (username,email,password_hash) VALUES ($1,$2,$3) RETURNING id, username , email , created_at',[username , email , password_hash]
    )

    const newUser = result.rows[0]

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    })
  } catch (err){
    console.error(err.message)
    res.status(500).json({
      error:'Server error'
    })
  }
}


const login = async (req,res)=>{
  const {email, password} =req.body

  //validate inputs
  if(!email||!password){
    return res.status(400).json({
      error:"All fields are required"
    })
  }

  try{
    //find user by this email
    const result = await pool.query(
      'SELECT * FROM users where email = $1',[email]
    )

    if(result.rows.length === 0){
      return res.status(400).json({
        error:"Invalid credentials"
      })
    }

    const user = result.rows[0]

    //compare password with hash
    const isMatch = await bcrypt.compare(password , user.password_hash)
    if(!isMatch){
      return res.status(400).json({
        error:"Invalid credentials"
      })
    }

    //generate jwt token

    const token = jwt.sign(
      {userId:user.id},
      process.env.JWT_SECRET,
      {expiresIn: '7d'}
    )

    res.status(200).json({
      message:'Login successful',
      token
    })
  }
  catch(err){
    console.error(err.message)
    res.status(500).json({error:'Server error'})
  }
}

module.exports={register,login}
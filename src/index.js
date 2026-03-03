const express = require('express')
const dotenv = require('dotenv')

dotenv.config()//loads .env file variables into process.env

const pool= require('./db')
const authRoutes = require('./routes/auth.routes')
const app = express()

app.use(express.json())//tells express to automatically parse incoming json to use req.body

app.use('/auth',authRoutes)

app.get('/health', (req,res)=>{
  res.status(200).json({ message: "FitAI server is running"})
})

const PORT = process.env.PORT || 3000

app.listen(PORT , ()=>{
  console.log(`Server is running on port ${PORT}`)
})
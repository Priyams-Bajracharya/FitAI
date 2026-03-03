
const {Pool} =require('pg')
//destructuring , we take the pool property from the obj pg , 

//a pool is like having multiple waiters ready to server , so a pool helps to handle multiple requests simultaneously , in real app multiple users might hit the  api at the same time , a single connection would make them queue one by one , a pool handles them concurrently 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})


//.then and .catch are promises in js , pool.connect takes time and js doesnt wait , it moves on and comes back when the jobs done , a promise represents "I'll give the results later", .then runs when operation succeeded , .catch runs when the operation failed 
pool.connect()
.then(()=>{
  console.log('Connected to PostgreSQL')
})
.catch((err)=>{
  console.error('Database connection error:',err.message)
})

module.exports =pool
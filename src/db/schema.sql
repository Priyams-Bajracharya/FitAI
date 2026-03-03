CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE profiles(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL UNIQUE REFERENCES users(id) on delete cascade,
  age INT,
  weight DECIMAl(5,2),
  height DECIMAl(5,2),
  goal VARCHAR(50) NOT NULL,
  equipment TEXT[],
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE workout_plans(
  id SERIAL PRIMARY KEY,
  user_id int NOT NULL REFERENCES users(id) on delete cascade,
  goal VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT'active',
  generated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP 
);

CREATE TABLE plan_days(
  id SERIAL PRIMARY KEY,
  plan_id INT NOT NULL REFERENCES workout_plans(id) ON DELETE CASCADE,
  day_number INT NOT NULL,
  day_name VARCHAR(20) NOT NULL, 
  focus VARCHAR(50),
  notes TEXT
);

CREATE TABLE plan_exercises(
  id SERIAL PRIMARY KEY,
  plan_day_id INT NOT NULL REFERENCES plan_days(id) ON DELETE CASCADE,
  exercise_name VARCHAR(100) NOT NULL,
  sets INT,
  reps INT,
  duration_minutes INT,
  rest_seconds INT,
  notes TEXT,
  order_index INT
);


CREATE TABLE workout_logs (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_day_id INT NOT NULL REFERENCES plan_days(id),
  duration_minutes INT,
  calories_burnt INT,
  notes TEXT,
  logged_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE workout_log_items (
  id SERIAL PRIMARY KEY,
  workout_log_id INT NOT NULL REFERENCES workout_logs(id) ON DELETE CASCADE,
  plan_exercise_id INT REFERENCES plan_exercises(id),
  exercise_name VARCHAR(100) NOT NULL,
  sets_completed INT,
  reps_completed INT,
  duration_minutes INT,
  weight_used DECIMAL(5,2),
  notes TEXT
);
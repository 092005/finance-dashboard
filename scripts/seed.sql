-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  balance DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create budgets table
CREATE TABLE IF NOT EXISTS budgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  budget_limit DECIMAL(10,2) NOT NULL,
  spent DECIMAL(10,2) DEFAULT 0,
  period VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample user (password is 'password123' hashed with bcrypt)
INSERT INTO users (id, name, email, password) VALUES 
('410544b2-4001-4271-9855-fec4b6a6442a', 'Demo User', 'demo@example.com', '$2b$10$K2nKZQmKZQmKZQmKZQmKZeK2nKZQmKZQmKZQmKZQmKZQmKZQmKZQm')
ON CONFLICT (email) DO NOTHING;
const postgres = require('postgres');
const bcrypt = require('bcrypt');

async function createUser() {
  const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });
  
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const result = await sql`
      INSERT INTO users (name, email, password)
      VALUES ('Test User', 'test@example.com', ${hashedPassword})
      ON CONFLICT (email) DO UPDATE SET password = ${hashedPassword}
      RETURNING id, name, email
    `;
    
    console.log('User created/updated:', result[0]);
    console.log('Login with: test@example.com / password123');
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await sql.end();
  }
}

createUser();
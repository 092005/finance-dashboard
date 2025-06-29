const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

async function main() {
  const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });
  
  try {
    const seedSQL = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    await sql.unsafe(seedSQL);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sql.end();
  }
}

main();
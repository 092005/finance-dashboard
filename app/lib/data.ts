import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Accounts
export async function getAccounts(userId: string) {
  try {
    const accounts = await sql`SELECT * FROM accounts WHERE user_id = ${userId}`;
    return accounts;
  } catch (error) {
    console.error('Failed to fetch accounts:', error);
    return [];
  }
}

export async function createAccount(userId: string, name: string, type: string, balance: number) {
  try {
    const result = await sql`
      INSERT INTO accounts (user_id, name, type, balance)
      VALUES (${userId}, ${name}, ${type}, ${balance})
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('Failed to create account:', error);
    throw error;
  }
}

// Transactions
export async function getTransactions(userId: string) {
  try {
    const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY date DESC`;
    return transactions;
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return [];
  }
}

export async function createTransaction(userId: string, description: string, category: string, amount: number, type: string) {
  try {
    const result = await sql`
      INSERT INTO transactions (user_id, description, category, amount, type, date)
      VALUES (${userId}, ${description}, ${category}, ${amount}, ${type}, ${new Date().toISOString().split('T')[0]})
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('Failed to create transaction:', error);
    throw error;
  }
}

// Budgets
export async function getBudgets(userId: string) {
  try {
    const budgets = await sql`SELECT * FROM budgets WHERE user_id = ${userId}`;
    return budgets;
  } catch (error) {
    console.error('Failed to fetch budgets:', error);
    return [];
  }
}

export async function createBudget(userId: string, category: string, limit: number, period: string) {
  try {
    const result = await sql`
      INSERT INTO budgets (user_id, category, budget_limit, spent, period)
      VALUES (${userId}, ${category}, ${limit}, 0, ${period})
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('Failed to create budget:', error);
    throw error;
  }
}
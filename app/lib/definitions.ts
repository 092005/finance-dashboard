export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Account = {
  id: string;
  user_id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  created_at: string;
};

export type Transaction = {
  id: string;
  account_id: string;
  category_id: string;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  date: string;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
};

export type Budget = {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  period: 'monthly' | 'yearly';
  created_at: string;
};

export type AccountsTable = {
  id: string;
  name: string;
  type: string;
  balance: number;
  total_transactions: number;
};

export type TransactionsTable = {
  id: string;
  account_name: string;
  category_name: string;
  amount: number;
  description: string;
  type: string;
  date: string;
};

export type LatestTransaction = {
  id: string;
  account_name: string;
  category_name: string;
  amount: number;
  type: string;
};
'use server';

import { createAccount, createTransaction, createBudget } from './data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth.config';
import { revalidatePath } from 'next/cache';

export async function addAccount(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const type = formData.get('type') as string;
  const balance = parseFloat(formData.get('balance') as string);

  await createAccount(session.user.id, name, type, balance);
  revalidatePath('/dashboard/accounts');
}

export async function addTransaction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const amount = parseFloat(formData.get('amount') as string);
  const type = formData.get('type') as string;

  const finalAmount = type === 'Expense' ? -Math.abs(amount) : Math.abs(amount);
  
  await createTransaction(session.user.id, description, category, finalAmount, type);
  revalidatePath('/dashboard/transactions');
}

export async function addBudget(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  const category = formData.get('category') as string;
  const limit = parseFloat(formData.get('limit') as string);
  const period = formData.get('period') as string;

  await createBudget(session.user.id, category, limit, period);
  revalidatePath('/dashboard/budgets');
}
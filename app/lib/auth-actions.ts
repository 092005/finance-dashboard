'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('next-auth.session-token');
  cookieStore.delete('__Secure-next-auth.session-token');
  redirect('/');
}
import NextAuth from 'next-auth';
import { authOptions } from './auth.config';

const { auth, signIn, signOut } = NextAuth(authOptions);

export { auth, signIn, signOut };
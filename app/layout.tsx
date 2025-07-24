import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Providers } from './providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FinanceTracker - Smart Personal Finance Management Dashboard',
  description: 'Take control of your finances with FinanceTracker. Track expenses, manage budgets, monitor accounts, and gain insights into your financial health with our intuitive dashboard.',
  keywords: 'finance, budget, expense tracker, personal finance, money management, financial dashboard',
  authors: [{ name: 'FinanceTracker' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#dc2626" />
        <link rel="canonical" href="https://finance-dashboard-gules.vercel.app" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
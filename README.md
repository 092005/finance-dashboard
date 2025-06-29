# Finance Dashboard

A modern finance management dashboard built with Next.js 15, featuring:

## Features

- **Account Management**: Track multiple bank accounts, credit cards, and investment accounts
- **Transaction Tracking**: Record and categorize income and expenses
- **Budget Planning**: Set and monitor monthly/yearly budgets
- **Financial Overview**: Dashboard with key financial metrics
- **Secure Authentication**: NextAuth.js integration
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with direct SQL queries
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **TypeScript**: Full type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure your database and auth settings in `.env`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses the following main tables:
- `users` - User authentication
- `accounts` - Bank accounts and financial accounts
- `transactions` - Financial transactions
- `categories` - Transaction categories
- `budgets` - Budget planning

## Deployment

Deploy easily on Vercel with environment variables configured.

## License

MIT
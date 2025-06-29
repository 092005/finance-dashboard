import FinanceLogo from '@/app/ui/finance-logo';
import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-700">
          <div className="text-center mb-8">
            <div className="mb-6">
              <FinanceLogo />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Continue your financial journey</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
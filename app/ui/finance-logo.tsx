import { lusitana } from '@/app/ui/fonts';
import { BanknotesIcon } from '@heroicons/react/24/outline';

export default function FinanceLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BanknotesIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[24px]">FinanceTracker</p>
    </div>
  );
}
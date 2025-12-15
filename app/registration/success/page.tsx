import Link from 'next/link';

export default function RegistrationSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-indigo-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full backdrop-blur-xl bg-white/5 border border-emerald-400/40 rounded-3xl shadow-[(52,211,153,0.6)] px-6 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-3 text-emerald-200">
          Request submitted
        </h1>
        <p className="text-sm text-gray-200 mb-4">
          Your registration and payment receipt have been sent to the workshop
          admin. Your request is now{' '}
          <span className="font-semibold">under review</span>.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          You will receive an email once your payment is confirmed.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-white/90 text-black text-sm font-medium hover:bg-white transition"
        >
          Back to main menu
        </Link>
      </div>
    </main>
  );
}

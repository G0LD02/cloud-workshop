import Link from 'next/link';

export default function RegistrationSuccessPage() {
  return (
    <main className="min-h-screen bg-[var(--primary-dark)] text-[var(--text-light)] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#11263b] border border-[var(--primary-blue)] rounded-3xl shadow-xl px-6 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-3 text-[var(--accent-blue)]">
          Registration Submitted
        </h1>

        <p className="text-sm text-gray-300 mb-4">
          Your payment receipt has been received. Your request is now{' '}
          <span className="font-semibold">under review</span>.
        </p>

        <p className="text-xs text-gray-400 mb-6">
          You will receive an email after confirmation.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-2 rounded-full
          bg-[var(--primary-blue)] hover:bg-[var(--accent-blue)]
          text-light text-sm font-medium transition"
        >
          Back to main menu
        </Link>
      </div>
    </main>
  );
}

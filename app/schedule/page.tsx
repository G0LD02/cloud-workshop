import Link from 'next/link';

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-[var(--primary-dark)] text-[var(--text-light)] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center text-[var(--light-bg)] mb-3">
          Workshop Schedule
        </h1>

        <p className="text-sm md:text-base text-[var(--light-bg)]/80 text-center max-w-xl mx-auto mb-12">
          A simple two–day learning journey designed to give you both
          foundational cloud security knowledge and real hands-on experience.
        </p>

        {/* DAY 1 */}
        <section
          className="bg-[var(--primary-dark)]/60 border border-[var(--primary-blue)]/40 
          rounded-2xl p-6 shadow-xl mb-10"
        >
          <h2 className="text-2xl font-semibold text-[var(--light-bg)]">
            Day 1 — Friday, 30 January
          </h2>
          <p className="text-[var(--accent-blue)] text-sm mb-4">
            10:00 AM – 12:00 PM
          </p>

          <ul className="space-y-2 text-sm text-[var(--light-bg)]/80 leading-relaxed">
            <li>• Introduction to cloud security fundamentals</li>
            <li>• Overview of cloud computing concepts</li>
            <li>• Basic cloud architecture</li>
            <li>• Core cloud security principles</li>
          </ul>
        </section>

        {/* DAY 2 */}
        <section
          className="bg-[var(--primary-dark)]/60 border border-[var(--primary-blue)]/40 
          rounded-2xl p-6 shadow-xl mb-10"
        >
          <h2 className="text-2xl font-semibold text-[var(--light-bg)]">
            Day 2 — Friday, 13 February
          </h2>
          <p className="text-[var(--accent-blue)] text-sm mb-4">
            4:30 PM – 8:00 PM
          </p>

          <ul className="space-y-2 text-sm text-[var(--light-bg)]/80 leading-relaxed">
            <li>• Guided hands-on activities</li>
            <li>• AWS security practices & applied exercises</li>
            <li>• Final challenge assessment</li>
            <li>• Closing session, awards & certificate distribution</li>
          </ul>
        </section>

        {/* BACK BUTTON */}
        <div className="text-center mt-14">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2 rounded-full
              bg-[var(--primary-blue)] text-white font-medium text-sm
              hover:bg-[var(--accent-blue)] transition shadow-md"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

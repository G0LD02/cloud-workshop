import Image from 'next/image';
import Link from 'next/link';

export default function SpeakersPage() {
  return (
    <main className="min-h-screen bg-[var(--primary-dark)] text-[var(--text-light)] px-4 py-16">
      <div className="max-w-5xl mx-auto text-center">
        {/* PAGE TITLE */}
        <h1 className="text-4xl font-bold mb-3 text-[var(--light-bg)]">
          Meet the Speakers
        </h1>

        {/* INTRO PARAGRAPH */}
        <p className="text-sm md:text-base text-[var(--light-bg)]/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          This workshop is guided by experienced academic professionals from
          APU’s School of Technology and School of Computing. Each speaker
          brings deep expertise in cloud technologies, cybersecurity, and
          real-world IT practices — ensuring participants gain practical
          insights, structured guidance, and foundational skills in Cloud
          Security.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* SPEAKER 1 */}
          <div
            className="group bg-[var(--primary-dark)]/80 border border-[var(--primary-blue)]/40 
            shadow-xl rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[var(--accent-blue)]"
          >
            <div
              className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden 
              border-4 border-[var(--primary-blue)]/60 shadow-md"
            >
              <Image
                src="/speakers/hassan.png"
                alt="Dr Hassan"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-lg font-semibold text-[var(--light-bg)]">
              Dr. Hassan Jamil Syed
            </h3>
            <p className="text-sm text-[var(--light-bg)]/70 mt-1">
              CNT Cluster, School of Technology
            </p>

            <p className="mt-3 text-xs text-[var(--light-bg)]/60 leading-relaxed">
              Specializes in cloud systems, cybersecurity education, and guiding
              students through hands-on technical workshops.
            </p>
          </div>

          {/* SPEAKER 2 */}
          <div
            className="group bg-[var(--primary-dark)]/80 border border-[var(--primary-blue)]/40 
            shadow-xl rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[var(--accent-blue)]"
          >
            <div
              className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden 
              border-4 border-[var(--primary-blue)]/60 shadow-md"
            >
              <Image
                src="/speakers/yoges.png"
                alt="Yogeswaran"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-lg font-semibold text-[var(--light-bg)]">
              Mr. Yogeswaran A/L Nathan
            </h3>
            <p className="text-sm text-[var(--light-bg)]/70 mt-1">
              CNT Cluster, School of Technology
            </p>

            <p className="mt-3 text-xs text-[var(--light-bg)]/60 leading-relaxed">
              Experienced in networking technologies, security fundamentals, and
              practical cloud infrastructure deployment.
            </p>
          </div>

          {/* SPEAKER 3 */}
          <div
            className="group bg-[var(--primary-dark)]/80 border border-[var(--primary-blue)]/40 
            shadow-xl rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[var(--accent-blue)]"
          >
            <div
              className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden 
              border-4 border-[var(--primary-blue)]/60 shadow-md"
            >
              <Image
                src="/speakers/amad.png"
                alt="Amad"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-lg font-semibold text-[var(--light-bg)]">
              Mr. Amad Arshad
            </h3>
            <p className="text-sm text-[var(--light-bg)]/70 mt-1">
              School of Computing, Creative Interactive Technology
            </p>

            <p className="mt-3 text-xs text-[var(--light-bg)]/60 leading-relaxed">
              Skilled in computing systems and practical IT training, helping
              participants understand real operational challenges.
            </p>
          </div>
        </div>

        {/* BACK BUTTON */}
        <div className="mt-14">
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

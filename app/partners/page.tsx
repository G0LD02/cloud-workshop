import Image from 'next/image';
import Link from 'next/link';

export default function PartnersSection() {
  return (
    <section className="mt-24 mb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* TITLE */}
        <h2 className="text-3xl font-semibold mb-4 text-[var(--light-bg)]">
          Partners & Sponsors
        </h2>

        <p className="text-sm text-[var(--light-bg)]/70 max-w-xl mx-auto mb-14">
          This workshop is proudly supported by our academic, community, and
          student technology partners.
        </p>

        {/* TRIANGLE LAYOUT */}
        <div className="flex flex-col items-center justify-center gap-16">
          {/* APU TOP */}
          <div className="flex flex-col items-center">
            <div
              className="
                relative w-40 h-40 rounded-full border-4 border-[var(--primary-blue)]/60 
                bg-[var(--primary-dark)]/60 shadow-[0_0_25px_rgba(28,78,128,0.45)]
                overflow-hidden transition-all duration-300
                hover:scale-105 hover:shadow-[0_0_45px_rgba(28,78,128,0.7)]
              "
            >
              <Image
                src="/partners/apu_v2.png"
                alt="APU"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-[var(--light-bg)]">
              Asia Pacific University (APU)
            </p>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex items-center justify-center gap-20">
            {/* YSC */}
            <div className="flex flex-col items-center">
              <div
                className="
                  relative w-36 h-36 rounded-full border-4 border-[var(--primary-blue)]/60 
                  bg-[var(--primary-dark)]/60 shadow-[0_0_25px_rgba(28,78,128,0.45)]
                  overflow-hidden transition-all duration-300
                  hover:scale-105 hover:shadow-[0_0_45px_rgba(28,78,128,0.7)]
                "
              >
                <Image
                  src="/partners/ysc_v2.png"
                  alt="YSC"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-sm text-[var(--light-bg)]">
                YSC Community
              </p>
            </div>

            {/* AWS */}
            <div className="flex flex-col items-center">
              <div
                className="
                  relative w-36 h-36 rounded-full border-4 border-[var(--primary-blue)]/60 
                  bg-[var(--primary-dark)]/60 shadow-[0_0_25px_rgba(28,78,128,0.45)]
                  overflow-hidden transition-all duration-300
                  hover:scale-105 hover:shadow-[0_0_45px_rgba(28,78,128,0.7)]
                "
              >
                <Image
                  src="/partners/aws_club_v2.png"
                  alt="AWS Club"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-sm text-[var(--light-bg)]">
                AWS Club APU
              </p>
            </div>
          </div>
        </div>

        {/* BACK BUTTON */}
        <div className="text-center mt-16">
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
    </section>
  );
}

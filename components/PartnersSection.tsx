import Image from 'next/image';

export default function PartnersSection() {
  return (
    <section className="mt-24 mb-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* TITLE */}
        <h2 className="text-3xl font-semibold mb-4 text-[var(--light-bg)]">
          Partners & Sponsors
        </h2>

        <p className="text-sm text-[var(--light-bg)]/70 max-w-xl mx-auto mb-10">
          This workshop is proudly organized with the support of our academic
          and student community partners at APU.
        </p>

        {/* LOGO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 items-center justify-center">
          {/* APU */}
          <div className="flex items-center justify-center">
            <Image
              src="/partners/apu.png"
              alt="APU"
              width={140}
              height={80}
              className="opacity-70 hover:opacity-100 transition"
            />
          </div>

          {/* YSC */}
          <div className="flex items-center justify-center">
            <Image
              src="/partners/ysc_v2.png"
              alt="YSC"
              width={120}
              height={80}
              className="opacity-70 hover:opacity-100 transition"
            />
          </div>

          {/* AWS Club */}
          <div className="flex items-center justify-center">
            <Image
              src="/partners/awsclub.png"
              alt="AWS Club"
              width={140}
              height={80}
              className="opacity-70 hover:opacity-100 transition"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

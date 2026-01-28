'use client';

import Link from 'next/link';
import LightRays from '@/components/LightRays';

export default function ClosedPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f1c2e] via-[#1c4e80] to-[#0f1c2e] text-white">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-64 w-64 rounded-full bg-[#1c4e80]/25 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-72 w-72 rounded-full bg-[#2d6aa6]/25 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/3 h-56 w-56 rounded-full bg-[#0f1c2e]/25 blur-3xl" />
      </div>

      {/* Soft light overlays */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-soft-light bg-[radial-gradient(circle_at_top,rgba(28,78,128,0.32),transparent_65%),radial-gradient(circle_at_bottom,rgba(15,28,46,0.32),transparent_65%)]" />

      {/* Subtle tech grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Optional: LightRays effect (matching hero) */}
      <div className="absolute inset-0 opacity-50">
        <LightRays
          raysOrigin="top-center"
          raysColor="#1c4e80"
          raysSpeed={0.3}
          lightSpread={0.4}
          rayLength={0.7}
          followMouse={false}
          mouseInfluence={0.03}
          noiseAmount={0.01}
          distortion={0.01}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-20">
        <div className="w-full max-w-xl bg-[#0b1727]/70 border border-[#1c4e80]/40 rounded-3xl shadow-[0_18px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl p-10 relative">
          {/* Inner subtle border */}
          <div className="pointer-events-none absolute inset-[6px] rounded-[22px] border border-white/5" />

          <div className="relative z-10 text-center space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">
              🎉 Workshop Goal Achieved!
            </h1>

            <p className="text-zinc-300 text-[15px] leading-relaxed">
              We have successfully reached our full participant capacity for
              this workshop.
              <br />
              <br />
              Registrations are now closed — but this is only the beginning.
              <br />
              <span className="text-[#2d6aa6] font-medium">
                Follow us to stay updated on future sessions & workshops.
              </span>
            </p>

            <div className="pt-4 flex items-center justify-center gap-4">
              <Link
                href="https://www.instagram.com/apu.ysc?igsh=dXkwdmtraDN3M2I2"
                target="_blank"
                className="
      inline-flex items-center justify-center 
      gap-2 rounded-full
      bg-gradient-to-r from-[#8f1287] to-[#2d6aa6]
      hover:from-[#2d6aa6] hover:to-[#1c4e80]
      text-sm font-semibold px-7 py-2.5 tracking-wide
      shadow-md shadow-[#1c4e80]/40
      transition-all duration-200
      hover:-translate-y-0.5 hover:shadow-[#2d6aa6]/50
    "
              >
                Follow Us for Updates
              </Link>

              <Link
                href="https://discord.gg/DCxMqUZHja"
                target="_blank"
                className="
      inline-flex items-center justify-center 
      gap-2 rounded-full
      bg-gradient-to-r from-[#1c4e80] to-[#2d6aa6]
      hover:from-[#2d6aa6] hover:to-[#1c4e80]
      text-sm font-semibold px-7 py-2.5 tracking-wide
      shadow-md shadow-[#1c4e80]/40
      transition-all duration-200
      hover:-translate-y-0.5 hover:shadow-[#2d6aa6]/50
    "
              >
                Join Our Discord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

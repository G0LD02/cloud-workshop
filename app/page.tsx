import type { ReactNode } from 'react';
import Link from 'next/link';
import LightRays from '@/components/LightRays';
import {
  CheckCircle,
  Video,
  Globe,
  Rocket,
  MessageCircle,
  MessagesSquare,
  Instagram,
} from 'lucide-react';

/* ---------- Bento Grid Types & Component ---------- */

type BentoItem = {
  title: string;
  description: string;
  icon: ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
};

interface BentoGridProps {
  items: BentoItem[];
}

// بديل بسيط لـ cn
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            'group relative p-5 rounded-2xl overflow-hidden transition-all duration-200',
            // dark navy / blue theme instead of near-black + purple
            'border border-[#0f1c2e]/70 bg-[#0f1c2e]/90',
            'hover:-translate-y-1 hover:border-[#1c4e80]/70 hover:shadow-[0_18px_40px_rgba(0,0,0,0.7)]',
            item.colSpan === 2 ? 'md:col-span-2' : 'col-span-1',
            item.hasPersistentHover &&
              'shadow-[0_3px_15px_rgba(0,0,0,0.4)] border-[#2d6aa6]/60',
          )}
        >
          {/* خلفية خفيفة تظهر مع الهوفر */}
          <div
            className={cn(
              'absolute inset-0',
              'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)]',
              'bg-[length:6px_6px] opacity-0 group-hover:opacity-100',
              'transition-opacity duration-300',
            )}
          />

          <div className="relative flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#0b1727]">
                {item.icon}
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-md bg-[#0b1727] text-zinc-100">
                {item.status || 'Included'}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-zinc-100 text-[15px] leading-tight">
                {item.title}
                {item.meta && (
                  <span className="ml-2 text-xs text-zinc-300 font-normal">
                    {item.meta}
                  </span>
                )}
              </h3>
              <p className="text-sm text-zinc-200">{item.description}</p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md bg-[#0b1727]/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.cta || ''}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- بيانات الكروت لقسم What you will get ---------- */
/* Content aligned with the proposal: AWS Academy, final challenge, certificates, etc. */

const workshopFeatures: BentoItem[] = [
  {
    title: 'AWS Academy Learning',
    meta: '10-day period',
    description:
      'Complete six selected AWS Academy modules to build core cloud and security understanding.',
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    status: 'Required',
    tags: ['AWS Academy', 'Learning'],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: 'Realistic Cloud Security Scenario',
    meta: 'Final challenge',
    description:
      'Work in teams to analyze and secure a simulated cloud environment in the competition session.',
    icon: <Rocket className="w-5 h-5 text-[#1c4e80]" />,
    tags: ['Challenge', 'Teamwork'],
  },
  {
    title: 'Certificate of Participation',
    meta: 'Workshop completion',
    description:
      'Receive a certificate upon successful completion of the workshop and core activities.',
    icon: <Globe className="w-5 h-5 text-[#2d6aa6]" />,
    tags: ['Certificate'],
  },
  {
    title: 'Guidance from APU Lecturers',
    meta: 'Expert support',
    description:
      'Sessions delivered and guided by APU lecturers with experience in cloud computing and security.',
    icon: <Video className="w-5 h-5 text-indigo-300" />,
    tags: ['Lecturers', 'Support'],
  },
  {
    title: 'Official Discord Coordination',
    meta: 'Before & after',
    description:
      'Join the dedicated Discord server for announcements, resources, team coordination, and Q&A.',
    icon: <MessageCircle className="w-5 h-5 text-sky-300" />,
    status: 'Included',
    tags: ['Discord', 'Community', 'Resources'],
  },
];

/* ---------- الصفحة الرئيسية ---------- */

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f1c2e] via-[#1c4e80] to-[#0f1c2e] text-white">
      {/* خلفية احترافية لكن ناعمة جداً */}
      <div className="pointer-events-none absolute inset-0">
        {/* دوائر توهج خفيفة في الزوايا – الآن بألوان أزرق من الباليت الجديدة */}
        <div className="absolute -top-40 -left-40 h-64 w-64 rounded-full bg-[#1c4e80]/22 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-72 w-72 rounded-full bg-[#2d6aa6]/22 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/3 h-56 w-56 rounded-full bg-[#0f1c2e]/22 blur-3xl" />
      </div>

      {/* طبقة إضاءة ناعمة من الأعلى والأسفل – تدرجات أزرق/كحلي */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-soft-light bg-[radial-gradient(circle_at_top,rgba(28,78,128,0.32),transparent_65%),radial-gradient(circle_at_bottom,rgba(15,28,46,0.32),transparent_65%)]" />

      {/* شبكة خفيفة جداً تعطي إحساس Tech بدون إزعاج */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Header – نحتفظ بالـ layout لكن نغيّر التسمية والهوية لتطابق الورشة */}
      <header className="fixed top-0 inset-x-0 z-30 border-b border-[#0f1c2e]/80 bg-[#0f1c2e]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          {/* الشعار */}
          <Link href="#hero" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Cloud Security Fundamentals Workshop"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-semibold tracking-wide">
              Cloud Security Workshop
            </span>
          </Link>

          <nav className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-zinc-200">
            <a href="#hero" className="relative group">
              <span className="transition-colors group-hover:text-white">
                Home
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1c4e80] transition-all group-hover:w-full" />
            </a>
            <a href="#features" className="relative group">
              <span className="transition-colors group-hover:text-white">
                What you get
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1c4e80] transition-all group-hover:w-full" />
            </a>
            <Link href="/speakers" className="relative group">
              <span className="transition-colors group-hover:text-white">
                Speakers
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1c4e80] transition-all group-hover:w-full" />
            </Link>
            <Link href="/partners" className="relative group">
              <span className="transition-colors group-hover:text-white">
                Partners
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1c4e80] transition-all group-hover:w-full" />
            </Link>

            <a href="#cta" className="relative group">
              <span className="transition-colors group-hover:text-white">
                Join us
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1c4e80] transition-all group-hover:w-full" />
            </a>

            <Link
              href="/registration"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#1c4e80] hover:bg-[#2d6aa6] text-xs md:text-sm font-semibold px-4 md:px-5 py-1.5 md:py-2 tracking-wide transition-transform duration-150 hover:-translate-y-0.5"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      <div className="pt-16 relative z-10">
        {/* Hero */}
        <section
          id="hero"
          className="relative min-h-[calc(100vh-4rem)] overflow-hidden"
        >
          {/* Light rays – بنفس التأثير لكن بلون أزرق */}
          <div className="absolute inset-0 opacity-65">
            <LightRays
              raysOrigin="top-center"
              raysColor="#1c4e80"
              raysSpeed={0.4}
              lightSpread={0.5}
              rayLength={0.8}
              followMouse={false}
              mouseInfluence={0.03}
              noiseAmount={0.008}
              distortion={0.008}
            />
          </div>

          {/* تغميق داخلي عشان النص واضح */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/15" />

          {/* Hero content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              {/* اسم الورشة كـ tagline صغير */}
              <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-zinc-300">
                Cloud Security Fundamentals Workshop
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                Build your foundation in cloud security,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1c4e80] via-[#2d6aa6] to-[#e9eff4]">
                  with guided AWS practical sessions.
                </span>
              </h1>

              <p className="text-sm md:text-base text-zinc-200 max-w-xl mx-auto lg:mx-0">
                A 2-day workshop at Asia Pacific University (APU) introducing
                cloud computing concepts, cloud security fundamentals, AWS
                Academy learning, and a final team-based challenge.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start pt-2">
                <Link
                  href="/registration"
                  className="inline-flex items-center justify-center gap-2 rounded-full
               bg-gradient-to-r from-[#1c4e80] to-[#2d6aa6]
               hover:from-[#2d6aa6] hover:to-[#1c4e80]
               text-sm font-semibold px-7 py-2.5 tracking-wide
               shadow-md shadow-[#1c4e80]/40
               transition-all duration-200
               hover:-translate-y-0.5 hover:shadow-[#2d6aa6]/50"
                >
                  Register for the Workshop
                  <span className="text-[10px] font-medium bg-white/15 px-2 py-0.5 rounded-full">
                    RM15
                  </span>
                </Link>

                <a
                  href="#features"
                  className="text-xs sm:text-sm text-zinc-200 hover:text-white
               underline underline-offset-4
               decoration-zinc-500 hover:decoration-[#1c4e80]
               transition-colors"
                >
                  See what you will get
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[11px] md:text-xs text-zinc-300 pt-4 justify-center lg:justify-start">
                <span>• Day 1: Cloud &amp; Security Fundamentals</span>
                <span>• AWS Academy 10-day learning period</span>
                <span>• Day 2: Final challenge &amp; awards</span>
              </div>

              <div className="pt-2 text-[11px] md:text-xs text-zinc-300">
                <p>
                  Dates: 30th January &amp; 13th February 2026 • Venue: APU
                  Campus, S-8-2
                </p>
              </div>
            </div>

            {/* What you'll build – نفس التصميم لكن بمحتوى يتماشى مع المقترح */}
            <div className="flex-1 max-w-md w-full">
              <div className="group relative overflow-hidden rounded-3xl border border-[#0f1c2e]/80 bg-[#050712] px-6 py-6 md:px-7 md:py-7 shadow-[0_18px_40px_rgba(0,0,0,0.9)]">
                {/* توهج خفيف من اليسار فوق */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_55%)]" />
                {/* إطار داخلي */}
                <div className="pointer-events-none absolute inset-[6px] rounded-[22px] border border-white/5" />

                <div className="relative z-10 space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      What you&apos;ll experience
                    </h3>
                    <p className="mt-2 text-sm md:text-[15px] text-zinc-200 leading-relaxed">
                      By the end of the workshop, you&apos;ll understand core
                      cloud security concepts and how they apply in AWS-based
                      environments.
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-zinc-200">
                    <div className="rounded-2xl bg-[#0b1727]/90 border border-[#0f1c2e] px-4 py-3 flex flex-col justify-center transition-all duration-200 group-hover:border-[#1c4e80]">
                      <p className="font-semibold">Cloud Fundamentals</p>
                      <p className="mt-1 text-zinc-400 text-[11px] md:text-xs">
                        Core concepts &amp; architecture
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#0b1727]/90 border border-[#0f1c2e] px-4 py-3 flex flex-col justify-center transition-all duration-200 group-hover:border-[#1c4e80]">
                      <p className="font-semibold">Security Principles</p>
                      <p className="mt-1 text-zinc-400 text-[11px] md:text-xs">
                        Shared responsibility &amp; access
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#0b1727]/90 border border-[#0f1c2e] px-4 py-3 flex flex-col justify-center transition-all duration-200 group-hover:border-[#1c4e80]">
                      <p className="font-semibold">AWS Academy</p>
                      <p className="mt-1 text-zinc-400 text-[11px] md:text-xs">
                        Structured modules &amp; labs
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#0b1727]/90 border border-[#0f1c2e] px-4 py-3 flex flex-col justify-center transition-all duration-200 group-hover:border-[#1c4e80]">
                      <p className="font-semibold">Final Challenge</p>
                      <p className="mt-1 text-zinc-400 text-[11px] md:text-xs">
                        Team-based scenario &amp; awards
                      </p>
                    </div>
                  </div>

                  <p className="pt-1 text-[11px] md:text-xs text-zinc-400">
                    No prior cloud experience is required. The workshop is
                    designed for students starting their journey in cloud and
                    security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features – الآن تستخدم BentoGrid بمحتوى يتماشى مع الورشة */}
        <section
          id="features"
          className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center">
              What you will get
            </h2>
            <p className="text-sm md:text-base text-zinc-200 text-center mb-10 max-w-2xl mx-auto">
              Fewer slides, more structured learning and practical cloud
              security exercises — aligned with AWS Academy and guided by APU
              lecturers.
            </p>

            <BentoGrid items={workshopFeatures} />
          </div>
        </section>

        {/* CTA */}
        <section
          id="cta"
          className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center"
        >
          <div className="max-w-2xl w-full">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Build real cloud security foundations in 2 workshop days.
            </h2>

            <p className="mt-2 max-w-xl mx-auto text-zinc-200 text-sm md:text-base">
              Join the Cloud Security Fundamentals Workshop at APU, complete the
              AWS Academy modules, and take part in a practical final challenge
              with certificates and team-based awards.
            </p>

            <Link
              href="/registration"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full
             bg-gradient-to-r from-[#1c4e80] to-[#2d6aa6]
             hover:from-[#2d6aa6] hover:to-[#1c4e80]
             text-sm font-semibold px-9 py-3 tracking-wide
             shadow-lg shadow-[#1c4e80]/40
             transition-all duration-200
             hover:-translate-y-0.5 hover:shadow-[#2d6aa6]/50"
            >
              Register for the Workshop
              <span className="text-xs font-medium bg-white/15 px-2 py-0.5 rounded-full">
                RM15
              </span>
            </Link>
          </div>
        </section>

        {/* Footer – نحتفظ بالهيكل لكن نضبط النص للورشة الرسمية */}

        <footer className="border-t border-[#0f1c2e]/80 bg-[#0f1c2e]/95">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-3 items-center justify-between text-[11px] md:text-xs text-zinc-200">
            <p>
              © {new Date().getFullYear()} Cloud Security Fundamentals Workshop
              – Asia Pacific University (APU). Organized by YSC-APU.
            </p>

            <p className="text-xs opacity-80 mt-1 tracking-wide">
              Site built by <span className="font-semibold">@GOLD</span>
            </p>

            <div className="flex items-center gap-4">
              <div className="flex gap-4">
                <a
                  href="https://discord.gg/PwUFGcXksP"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Workshop Discord"
                  className="hover:text-white transition-colors"
                >
                  <MessagesSquare className="w-4 h-4" />
                </a>

                <a
                  href="https://www.instagram.com/apu.ysc?igsh=dXkwdmtraDN3M2I2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Workshop Instagram"
                  className="hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>

              <div className="flex gap-4">
                <a href="#hero" className="hover:text-white">
                  Back to top
                </a>
                <Link href="" className="hover:text-white">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

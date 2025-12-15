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
            'border border-zinc-800/80 bg-[#050816]/90',
            'hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-[0_18px_40px_rgba(0,0,0,0.7)]',
            item.colSpan === 2 ? 'md:col-span-2' : 'col-span-1',
            item.hasPersistentHover &&
              'shadow-[0_3px_15px_rgba(0,0,0,0.4)] border-purple-500/40'
          )}
        >
          {/* خلفية خفيفة تظهر مع الهوفر */}
          <div
            className={cn(
              'absolute inset-0',
              'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)]',
              'bg-[length:6px_6px] opacity-0 group-hover:opacity-100',
              'transition-opacity duration-300'
            )}
          />

          <div className="relative flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-900">
                {item.icon}
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-900 text-zinc-200">
                {item.status || 'Active'}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-gray-100 text-[15px] leading-tight">
                {item.title}
                {item.meta && (
                  <span className="ml-2 text-xs text-gray-400 font-normal">
                    {item.meta}
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-300">{item.description}</p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                {item.tags?.map((tag, i) => (
                  <span key={i} className="px-2 py-1 rounded-md bg-zinc-900/80">
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
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

const workshopFeatures: BentoItem[] = [
  {
    title: 'Hands-on Cloud Labs',
    meta: 'Live practice',
    description: 'Deploy real services, connect networking, and debug issues.',
    icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    status: 'Included',
    tags: ['Labs', 'Deployments'],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: 'Real Project for your CV',
    meta: 'Portfolio-ready',
    description: 'Build a small production-style cloud project you can show.',
    icon: <Rocket className="w-5 h-5 text-purple-500" />,
    tags: ['Portfolio', 'Experience'],
  },
  {
    title: 'Certificate of Completion',
    meta: 'Digital',
    description:
      'Get a certificate that proves you built and deployed real workloads.',
    icon: <Globe className="w-5 h-5 text-sky-500" />,
    tags: ['Certification'],
  },
  {
    title: 'Mentor Support',
    meta: 'During workshop',
    description:
      'Ask about cloud careers, best practices, and how to avoid breaking prod.',
    icon: <Video className="w-5 h-5 text-indigo-400" />,
    tags: ['Mentor', 'Guidance'],
  },
  {
    title: 'Private Discord Group',
    meta: 'Before workshop',
    description:
      'You’ll be added to a focused Discord server where we share resources, answer questions, and help you get ready.',
    icon: <MessageCircle className="w-5 h-5 text-sky-400" />,
    status: 'Included',
    tags: ['Community', 'Discord', 'Resources'],
  },
];

/* ---------- الصفحة الرئيسية ---------- */

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050816] via-slate-900 to-[#020617] text-white">
      {/* خلفية احترافية لكن ناعمة جداً */}
      <div className="pointer-events-none absolute inset-0">
        {/* دوائر توهج خفيفة في الزوايا */}
        <div className="absolute -top-40 -left-40 h-64 w-64 rounded-full bg-purple-700/18 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-72 w-72 rounded-full bg-indigo-500/18 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/3 h-56 w-56 rounded-full bg-fuchsia-500/14 blur-3xl" />
      </div>

      {/* طبقة إضاءة ناعمة من الأعلى والأسفل – خففناها شوي */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.28),_transparent_65%),radial-gradient(circle_at_bottom,_rgba(147,51,234,0.22),_transparent_65%)]" />

      {/* شبكة خفيفة جداً تعطي إحساس Tech بدون إزعاج */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-30 border-b border-zinc-800/70 bg-black/85 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          {/* الشعار */}
          <Link href="#hero" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="CloudCraft"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-semibold tracking-wide">
              CloudCraft
            </span>
          </Link>

          <nav className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-zinc-300">
            <a href="#hero" className="relative group">
              <span className="transition-colors group-hover:text-white">
                Home
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-purple-500 transition-all group-hover:w-full" />
            </a>
            <a href="#features" className="relative group">
              <span className="transition-colors group-hover:text-white">
                What you get
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-purple-500 transition-all group-hover:w-full" />
            </a>
            <a href="#cta" className="relative group">
              <span className="transition-colors group-hover:text-white">
                Join us
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-purple-500 transition-all group-hover:w-full" />
            </a>

            <Link
              href="/registration"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-500 text-xs md:text-sm font-semibold px-4 md:px-5 py-1.5 md:py-2 tracking-wide transition-transform duration-150 hover:-translate-y-0.5"
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
          {/* Light rays */}
          <div className="absolute inset-0 opacity-65">
            <LightRays
              raysOrigin="top-center"
              raysColor="#a855f7"
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/10" />

          {/* Hero content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              {/* اسم الورشة كـ tagline صغير */}
              <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-zinc-400">
                CloudCraft Workshop
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                Build real cloud skills,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-300">
                  not just theory.
                </span>
              </h1>

              <p className="text-sm md:text-base text-zinc-300 max-w-xl mx-auto lg:mx-0">
                A weekend workshop where you ship a real cloud project, get
                guidance from mentors, and walk away with something you can
                actually put on your CV.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start pt-2">
                <Link
                  href="/registration"
                  className="inline-flex items-center justify-center gap-2 rounded-full
               bg-gradient-to-r from-purple-600 to-indigo-600
               hover:from-purple-500 hover:to-indigo-500
               text-sm font-semibold px-7 py-2.5 tracking-wide
               shadow-md shadow-purple-600/30
               transition-all duration-200
               hover:-translate-y-0.5 hover:shadow-purple-500/40"
                >
                  Register for the Workshop
                  <span className="text-[10px] font-medium bg-white/15 px-2 py-0.5 rounded-full">
                    RM15
                  </span>
                </Link>

                <a
                  href="#features"
                  className="text-xs sm:text-sm text-zinc-300 hover:text-white
               underline underline-offset-4
               decoration-zinc-600 hover:decoration-purple-400
               transition-colors"
                >
                  See what you will get
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[11px] md:text-xs text-zinc-400 pt-4 justify-center lg:justify-start">
                <span>• 3 days live</span>
                <span>• Beginner friendly</span>
                <span>• Small group</span>
              </div>
            </div>

            {/* What you'll build – تصميم مطوّر */}
            <div className="flex-1 max-w-md w-full">
              <div className="group relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#050712] px-6 py-6 md:px-7 md:py-7 shadow-[0_18px_40px_rgba(0,0,0,0.9)]">
                {/* توهج خفيف من اليسار فوق */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_55%)]" />
                {/* إطار داخلي */}
                <div className="pointer-events-none absolute inset-[6px] rounded-[22px] border border-white/5" />

                <div className="relative z-10 space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      What you&apos;ll build
                    </h3>
                    <p className="mt-2 text-sm md:text-[15px] text-zinc-200 leading-relaxed">
                      By the end of the workshop you&apos;ll have a small
                      production-style cloud setup.
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-zinc-200">
                    <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 px-4 py-3 flex flex-col justify-center transition-all duration-200 group-hover:border-zinc-700">
                      <p className="font-semibold">Deployments</p>
                      <p className="mt-1 text-zinc-400 text-[11px] md:text-xs">
                        From local to cloud
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 px-4 py-3 flex flex-col justify-center transition-all duration-200 group-hover:border-zinc-700">
                      <p className="font-semibold">Monitoring</p>
                      <p className="mt-1 text-zinc-400 text-[11px] md:text-xs">
                        Health &amp; logs
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 px-4 py-3 flex flex-col justify-center transition-all duration-200 group-hover:border-zinc-700">
                      <p className="font-semibold">Security</p>
                      <p className="mt-1 text-zinc-400 text-[11px] md:text-xs">
                        Secrets &amp; access
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 px-4 py-3 flex flex-col justify-center transition-all duration-200 group-hover:border-zinc-700">
                      <p className="font-semibold">CI/CD</p>
                      <p className="mt-1 text-zinc-400 text-[11px] md:text-xs">
                        Ship safely
                      </p>
                    </div>
                  </div>

                  <p className="pt-1 text-[11px] md:text-xs text-zinc-500">
                    No prior cloud experience required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features – الآن تستخدم BentoGrid */}
        <section
          id="features"
          className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center">
              What you will get
            </h2>
            <p className="text-sm md:text-base text-zinc-300 text-center mb-10 max-w-2xl mx-auto">
              Fewer slides, more real-world cloud practice.
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
              Level up your cloud skills in a week.
            </h2>

            <p className="mt-2 max-w-xl mx-auto text-gray-200 text-sm md:text-base">
              Ready to deploy something real to the cloud? Start here.
            </p>

            <Link
              href="/registration"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full
             bg-gradient-to-r from-purple-600 to-indigo-600
             hover:from-purple-500 hover:to-indigo-500
             text-sm font-semibold px-9 py-3 tracking-wide
             shadow-lg shadow-purple-600/30
             transition-all duration-200
             hover:-translate-y-0.5 hover:shadow-purple-500/40"
            >
              Register for the Workshop
              <span className="text-xs font-medium bg-white/15 px-2 py-0.5 rounded-full">
                RM15
              </span>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800/80 bg-black/90">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-3 items-center justify-between text-[11px] md:text-xs text-zinc-400">
            <p>
              © {new Date().getFullYear()} CloudCraft Workshop. All rights
              reserved.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex gap-4">
                <a
                  href="https://discord.gg/YYCyE8ZA"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="CloudCraft Discord"
                  className="hover:text-white transition-colors"
                >
                  <MessagesSquare className="w-4 h-4" />
                </a>

                <a
                  href="https://instagram.com/YOUR_USERNAME"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="CloudCraft Instagram"
                  className="hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>

              <div className="flex gap-4">
                <a href="#hero" className="hover:text-white">
                  Back to top
                </a>
                <Link href="/registration" className="hover:text-white">
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

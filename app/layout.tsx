import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cloud Security Fundamentals Workshop',
  description:
    'Official event website for the 2-Day Cloud Security Fundamentals Workshop at APU',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          bg-[var(--background)] 
          text-[var(--foreground)]
        `}
      >
        {/* MAIN CONTENT */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

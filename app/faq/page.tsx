'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    q: 'Do I need any cloud experience?',
    a: 'No. The workshop is beginner-friendly and designed for students with little or no cloud background. You will learn the fundamentals step by step.',
  },
  {
    q: 'Who can join the workshop?',
    a: 'Any APU student from any school or discipline is welcome. The content is suitable for beginners and intermediate learners.',
  },
  {
    q: 'What do I need to bring?',
    a: 'Just your laptop and charger. All workshop materials will be provided to you digitally.',
  },
  {
    q: 'How do I register and pay?',
    a: 'Register through the website’s registration page and upload your payment receipt (RM15) after scanning the QR code.',
  },
  {
    q: 'Is the RM15 fee refundable?',
    a: 'No. The fee covers event logistics and materials and is non-refundable once you register.',
  },
  {
    q: 'Will I get a certificate?',
    a: 'Yes. You will receive an official certificate of participation after completing both days of the workshop.',
  },
  {
    q: 'Do I need to attend both days?',
    a: 'Yes. To fully benefit from the workshop and receive your certificate, attending both sessions is required.',
  },
  {
    q: 'Will there be hands-on labs?',
    a: 'Yes. The workshop includes guided hands-on cloud security labs, exercises, and a final mini challenge.',
  },
  {
    q: 'Will there be slides or notes provided?',
    a: 'Yes. All essential slides, notes, and reference materials will be provided to participants.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[var(--primary-dark)] text-[var(--text-light)] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-[var(--light-bg)] mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-sm md:text-base text-[var(--light-bg)]/80 text-center mb-12 max-w-xl mx-auto">
          Here are the most common questions students ask about the Cloud
          Security Fundamentals Workshop.
        </p>

        {/* FAQ ACCORDION */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[var(--primary-blue)]/40 rounded-xl bg-[var(--primary-dark)]/60 shadow-lg"
            >
              <button
                className="w-full flex justify-between items-center px-5 py-4 text-left text-sm md:text-base font-medium text-[var(--light-bg)] hover:bg-[var(--primary-dark)]/40 transition"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.q}</span>

                {/* Arrow */}
                <span
                  className={`transform transition-transform ${
                    openIndex === index ? 'rotate-90' : ''
                  }`}
                >
                  ▶
                </span>
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-5 pb-4 text-[var(--light-bg)]/70 text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back Button */}
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

'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { UploadCloud } from 'lucide-react';

type RegistrationFormValues = {
  fullName: string;
  tpNumber: string;
  sex: 'male' | 'female';
  age: number;
  email: string;
  phone: string;
  nationality: string;
  receipt: FileList;
};

export default function RegistrationPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegistrationFormValues>();

  const watchedReceipt = watch('receipt');

  const onSubmit = async (data: RegistrationFormValues) => {
    setServerError(null);

    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('tpNumber', data.tpNumber);
    formData.append('sex', data.sex);
    formData.append('age', String(data.age));
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('nationality', data.nationality);

    const fileList = data.receipt;
    if (fileList && fileList.length > 0) {
      formData.append('receipt', fileList[0]);
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json.error || 'Registration failed. Try again.');
        return;
      }

      reset();
      router.push('/registration/success');
    } catch (err) {
      console.error('Register error:', err);
      setServerError('Something went wrong. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#020617] via-slate-950 to-[#020617] flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full">
        {/* الكرت الرئيسي مع إفيكت CardSpotlight */}
        <CardSpotlight className="shadow-[0_18px_40px_rgba(0,0,0,0.85)] border border-zinc-800/80 bg-black/85 px-6 py-8 md:px-10 md:py-10">
          {/* إطار داخلي بسيط فوق الإفيكت */}
          <div className="pointer-events-none absolute inset-4 rounded-2xl border border-white/5 opacity-70" />

          <div className="relative z-20">
            <h1 className="text-3xl font-semibold mb-2">
              Cloud Workshop Registration
            </h1>
            <p className="text-sm text-gray-300 mb-8">
              Fill in your details, pay by scanning the QR code, then upload
              your payment receipt.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* PERSONAL INFO */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1">
                      Full Name (in English)
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500/60"
                      {...register('fullName', {
                        required: 'Full name is required',
                        minLength: { value: 2, message: 'Name is too short' },
                      })}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* TP Number */}
                  <div>
                    <label className="block text-sm mb-1">TP Number</label>
                    <input
                      type="text"
                      className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500/60"
                      {...register('tpNumber', {
                        required: 'TP Number is required',
                        minLength: {
                          value: 5,
                          message: 'TP Number looks too short',
                        },
                      })}
                    />
                    {errors.tpNumber && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.tpNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Sex */}
                  <div>
                    <label className="block text-sm mb-1">Sex</label>
                    <select
                      className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500/60"
                      {...register('sex', {
                        required: 'Please select sex',
                      })}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.sex && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.sex.message}
                      </p>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm mb-1">Age</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      step={1}
                      className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500/60 no-spinner"
                      {...register('age', {
                        valueAsNumber: true,
                        required: 'Age is required',
                        min: { value: 13, message: 'Minimum age is 13' },
                        max: { value: 100, message: 'Age seems too high' },
                      })}
                    />
                    {errors.age && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.age.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500/60"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Enter a valid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500/60"
                      {...register('phone', {
                        required: 'Phone number is required',
                        minLength: {
                          value: 7,
                          message: 'Phone number looks too short',
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Nationality */}
                  <div>
                    <label className="block text-sm mb-1">Nationality</label>
                    <input
                      type="text"
                      className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500/60"
                      {...register('nationality', {
                        required: 'Nationality is required',
                      })}
                    />
                    {errors.nationality && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.nationality.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* PAYMENT SECTION */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold">Payment</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Left: single QR */}
                  <div className="flex flex-col items-center md:items-start">
                    <div className="bg-white rounded-2xl p-4 shadow-md border border-zinc-200 w-fit">
                      <img
                        src="Yazzen-Qr.png"
                        alt="Payment QR"
                        className="w-44 h-44 object-contain"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      Scan to pay (Primary method)
                    </p>
                  </div>

                  {/* Right: instructions */}
                  <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-5">
                    <h3 className="text-sm font-semibold mb-2">How to pay</h3>
                    <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-300">
                      <li>Open your banking / e-wallet app.</li>
                      <li>Scan the QR code.</li>
                      <li>Enter the amount (15RM).</li>
                      <li>Complete payment and take a screenshot/receipt.</li>
                      <li>Upload the receipt below and submit.</li>
                    </ol>
                    <p className="mt-3 text-xs text-gray-400">
                      Tip: Make sure your receipt clearly shows date/time and
                      reference number.
                    </p>
                  </div>
                </div>
              </section>

              {/* RECEIPT UPLOAD */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold">
                  Upload Payment Receipt
                </h2>
                <p className="text-sm text-gray-300">
                  Accepted formats: JPG, PNG, PDF. Maximum size ~5MB.
                </p>

                <input
                  id="receipt"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  {...register('receipt', {
                    required: 'Please upload your payment receipt',
                  })}
                />

                <label
                  htmlFor="receipt"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-sm font-medium cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload receipt</span>
                </label>

                <div className="mt-1 text-xs text-gray-300">
                  {watchedReceipt && watchedReceipt.length > 0
                    ? `Selected: ${watchedReceipt[0].name}`
                    : 'No file selected yet'}
                </div>

                {errors.receipt && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.receipt.message as string}
                  </p>
                )}
              </section>

              {/* SERVER ERROR */}
              {serverError && (
                <p className="text-sm text-red-400">{serverError}</p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-3 w-full inline-flex items-center justify-center gap-2
             rounded-full
             bg-gradient-to-r from-purple-600 to-indigo-600
             hover:from-purple-500 hover:to-indigo-500
             text-sm font-semibold py-3 tracking-wide
             shadow-md shadow-purple-600/30
             transition-all duration-200
             hover:-translate-y-0.5 hover:shadow-purple-500/40
             disabled:opacity-60 disabled:cursor-not-allowed
             focus-visible:outline-none
             focus-visible:ring-2 focus-visible:ring-purple-400
             focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        fill="currentColor"
                      />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>Submit Registration</>
                )}
              </button>
            </form>
          </div>
        </CardSpotlight>
      </div>
    </main>
  );
}

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
      setServerError('Something went wrong. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[var(--primary-dark)] text-[var(--text-light)] flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full">
        {/* The Form Card */}
        <CardSpotlight
          className="
            shadow-lg 
            border border-[var(--primary-blue)] 
            bg-[#11263b] 
            px-6 py-8 md:px-10 md:py-10 
            rounded-2xl 
            text-[var(--text-light)]
          "
        >
          <div className="pointer-events-none absolute inset-4 rounded-2xl border border-[var(--primary-blue)]/40 opacity-50" />

          <div className="relative z-20">
            <h1 className="text-3xl font-semibold mb-2 text-[var(--accent-blue)]">
              Cloud Security Workshop Registration
            </h1>

            <p className="text-sm mb-8 text-gray-300">
              Fill in your details and upload your receipt to complete your
              registration.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* PERSONAL INFO */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--primary-blue)]">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1">Full Name</label>
                    <input
                      type="text"
                      className="w-full rounded-md bg-[#0f1c2e] border border-[var(--primary-blue)] px-3 py-2 text-sm text-light focus:outline-none focus:border-[var(--accent-blue)]"
                      {...register('fullName', {
                        required: 'Full name is required',
                      })}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-400">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* TP Number */}
                  <div>
                    <label className="block text-sm mb-1">TP Number</label>
                    <input
                      type="text"
                      className="w-full rounded-md bg-[#0f1c2e] border border-[var(--primary-blue)] px-3 py-2 text-sm text-light focus:border-[var(--accent-blue)]"
                      {...register('tpNumber', {
                        required: 'TP Number is required',
                      })}
                    />
                    {errors.tpNumber && (
                      <p className="text-xs text-red-400">
                        {errors.tpNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Sex */}
                  <div>
                    <label className="block text-sm mb-1">Sex</label>
                    <select
                      className="w-full rounded-md bg-[#0f1c2e] border border-[var(--primary-blue)] px-3 py-2 text-sm text-light focus:border-[var(--accent-blue)]"
                      {...register('sex', { required: 'Please select sex' })}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.sex && (
                      <p className="text-xs text-red-400">
                        {errors.sex.message}
                      </p>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm mb-1">Age</label>
                    <input
                      type="number"
                      className="w-full rounded-md bg-[#0f1c2e] border border-[var(--primary-blue)] px-3 py-2 text-sm text-light no-spinner focus:border-[var(--accent-blue)]"
                      {...register('age', { required: 'Age is required' })}
                    />
                    {errors.age && (
                      <p className="text-xs text-red-400">
                        {errors.age.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full rounded-md bg-[#0f1c2e] border border-[var(--primary-blue)] px-3 py-2 text-sm text-light focus:border-[var(--accent-blue)]"
                      {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full rounded-md bg-[#0f1c2e] border border-[var(--primary-blue)] px-3 py-2 text-sm text-light focus:border-[var(--accent-blue)]"
                      {...register('phone', {
                        required: 'Phone number is required',
                      })}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Nationality */}
                  <div>
                    <label className="block text-sm mb-1">Nationality</label>
                    <input
                      type="text"
                      className="w-full rounded-md bg-[#0f1c2e] border border-[var(--primary-blue)] px-3 py-2 text-sm text-light focus:border-[var(--accent-blue)]"
                      {...register('nationality', {
                        required: 'Nationality is required',
                      })}
                    />
                    {errors.nationality && (
                      <p className="text-xs text-red-400">
                        {errors.nationality.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* PAYMENT */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--primary-blue)]">
                  Payment
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* QR */}
                  <div className="flex flex-col items-center md:items-start">
                    <div className="bg-white p-4 rounded-2xl border border-[var(--primary-blue)] shadow-sm">
                      <img
                        src="/Yazzen-Qr.png"
                        className="w-44 h-44 object-contain"
                      />
                    </div>
                    <p className="text-sm text-gray-300 mt-2">
                      Scan to pay RM15
                    </p>
                  </div>

                  {/* Instructions */}
                  <div className="rounded-2xl border border-[var(--primary-blue)] bg-[#102030] p-5">
                    <h3 className="text-sm font-semibold text-light mb-2">
                      How to pay
                    </h3>

                    <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-300">
                      <li>Open any banking app</li>
                      <li>Scan the QR code</li>
                      <li>Enter RM15</li>
                      <li>Take a screenshot of the receipt</li>
                      <li>Upload it below</li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* RECEIPT */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-[var(--primary-blue)]">
                  Upload Payment Receipt
                </h2>

                <input
                  id="receipt"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  {...register('receipt', {
                    required: 'Please upload your receipt',
                  })}
                />

                <label
                  htmlFor="receipt"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                  bg-[var(--primary-blue)] hover:bg-[var(--accent-blue)]
                  text-light text-sm font-medium cursor-pointer
                  transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <UploadCloud className="w-4 h-4" />
                  Upload receipt
                </label>

                <p className="text-xs text-gray-300">
                  {watchedReceipt?.length
                    ? `Selected: ${watchedReceipt[0].name}`
                    : 'No file selected'}
                </p>

                {errors.receipt && (
                  <p className="text-xs text-red-400">
                    {errors.receipt.message}
                  </p>
                )}
              </section>

              {/* ERROR */}
              {serverError && (
                <p className="text-sm text-red-400">{serverError}</p>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full py-3 rounded-full font-semibold 
                  bg-[var(--primary-blue)] hover:bg-[var(--accent-blue)]
                  text-light shadow-lg shadow-[var(--primary-blue)]/40
                  transition-all duration-200 hover:-translate-y-0.5
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {isSubmitting ? 'Submitting…' : 'Submit Registration'}
              </button>
            </form>
          </div>
        </CardSpotlight>
      </div>
    </main>
  );
}

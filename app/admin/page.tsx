import { supabaseAdmin } from '@/lib/supabaseServer';
import AdminTable from './AdminTable';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const { data, error } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading registrations:', error);
  }

  const registrations = (data ?? []) as any[];

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-2">Admin – Registrations</h1>
        <p className="text-sm text-gray-300 mb-6">
          Approve or reject workshop registrations. Approval emails contain a
          unique QR code. Rejection emails include a support phone number.
        </p>

        <AdminTable registrations={registrations} />
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';

type Registration = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  nationality: string;
  sex: string;
  age: number;
  status: string;
  created_at: string;
  receipt_path: string;
};

interface Props {
  registrations: Registration[];
}

export default function AdminTable({ registrations }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setMessage(null);
    setLoadingId(id + action);

    try {
      const res = await fetch(`/api/admin/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setMessage(
          (json.errors && json.errors.join(' ')) ||
            'Action failed. Check console.'
        );
      } else {
        // refresh the page to show new status
        window.location.reload();
      }
    } catch (err) {
      console.error('Admin action error:', err);
      setMessage('Network or server error.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      {message && <p className="mb-3 text-sm text-red-400">{message}</p>}

      <div className="overflow-x-auto border border-zinc-800 rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-900">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Created</th>
              <th className="px-3 py-2 text-left">Receipt</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => {
              const disabled = loadingId?.startsWith(r.id);
              return (
                <tr
                  key={r.id}
                  className="border-t border-zinc-800 hover:bg-zinc-900/60"
                >
                  <td className="px-3 py-2">{r.full_name}</td>
                  <td className="px-3 py-2">{r.email}</td>
                  <td className="px-3 py-2 capitalize">{r.status}</td>
                  <td className="px-3 py-2 text-xs text-gray-400">
                    {r.created_at
                      ? String(r.created_at).replace('T', ' ').slice(0, 16)
                      : '-'}
                  </td>

                  <td className="px-3 py-2 text-xs text-gray-400">
                    {r.receipt_path}
                  </td>
                  <td className="px-3 py-2 space-x-2">
                    <button
                      className="px-3 py-1 rounded-md border border-emerald-500 text-xs hover:bg-emerald-500 hover:text-black disabled:opacity-40"
                      disabled={disabled || r.status === 'approved'}
                      onClick={() => handleAction(r.id, 'approve')}
                    >
                      {disabled && loadingId === r.id + 'approve'
                        ? 'Approving...'
                        : 'Approve'}
                    </button>
                    <button
                      className="px-3 py-1 rounded-md border border-red-500 text-xs hover:bg-red-500 hover:text-black disabled:opacity-40"
                      disabled={disabled || r.status === 'rejected'}
                      onClick={() => handleAction(r.id, 'reject')}
                    >
                      {disabled && loadingId === r.id + 'reject'
                        ? 'Rejecting...'
                        : 'Reject'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

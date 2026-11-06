import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { useOutletContext } from 'react-router-dom';
import {
  Receipt,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  RotateCcw,
  Zap,
  CreditCard,
  Download
} from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const { payments } = useDemoStore();
  const { onOpenSimulator } = useOutletContext<{ onOpenSimulator: () => void }>();
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.memberName.toLowerCase().includes(search.toLowerCase()) ||
      p.memberEmail.toLowerCase().includes(search.toLowerCase()) ||
      p.stripePaymentIntentId.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const totalSucceeded = payments
    .filter((p) => p.status === 'succeeded')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalRefunded = payments
    .filter((p) => p.status === 'refunded')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 text-xs text-[#202923]">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#747E76] uppercase tracking-wider">
            Total Succeeded Volume
          </span>
          <div className="text-2xl font-extrabold text-[#17392F] font-tabular">
            A${totalSucceeded.toLocaleString()} AUD
          </div>
          <p className="text-[11px] text-[#4B805D] flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> All processed via Stripe checkout
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#747E76] uppercase tracking-wider">
            Total Refunded Volume
          </span>
          <div className="text-2xl font-extrabold text-[#B75F58] font-tabular">
            A${totalRefunded.toLocaleString()} AUD
          </div>
          <p className="text-[11px] text-[#747E76]">Automatic immediate role revocation applied</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#17392F] text-white shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-white">Interactive Payment Simulator</h4>
            <p className="text-[11px] text-[#A1B5A3]">
              Simulate instant refunds, renewals, or disputes on live accounts.
            </p>
          </div>
          <button
            onClick={onOpenSimulator}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#285B49] hover:bg-[#34755e] text-white transition-colors shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-300" />
            Simulate
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-[#A1B5A3] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by customer, email or Payment Intent ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E3E8E1] bg-[#F5F6F2] focus:bg-white focus:outline-none focus:border-[#285B49]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#E3E8E1] bg-white font-medium text-[#202923] focus:outline-none"
            >
              <option value="all">All Payments ({payments.length})</option>
              <option value="succeeded">Succeeded Only</option>
              <option value="failed">Failed Only</option>
              <option value="refunded">Refunded Only</option>
              <option value="disputed">Disputed / Chargebacks</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-2xl bg-white border border-[#E3E8E1] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F6F2] text-[#747E76] uppercase text-[10px] tracking-wider border-b border-[#E3E8E1]">
              <tr>
                <th className="py-3 px-4">Payment ID & Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Plan Item</th>
                <th className="py-3 px-4">Amount (AUD)</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E1]">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-[#F5F6F2] transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-mono font-bold text-[#17392F]">{p.stripePaymentIntentId}</p>
                    <p className="text-[10px] text-[#747E76]">{p.createdAt}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#202923]">{p.memberName}</p>
                    <p className="text-[11px] text-[#747E76] font-mono">{p.memberEmail}</p>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-[#17392F]">{p.planName}</td>

                  <td className="py-3.5 px-4 font-bold font-tabular text-[#202923]">
                    A${p.amount}.00 AUD
                  </td>

                  <td className="py-3.5 px-4 text-[#747E76]">{p.paymentMethod}</td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status === 'succeeded'
                        ? 'bg-[#E0E9E0] text-[#285B49]'
                        : p.status === 'refunded'
                        ? 'bg-[#F9ECEB] text-[#B75F58]'
                        : p.status === 'disputed'
                        ? 'bg-[#F9ECEB] text-[#B75F58]'
                        : 'bg-[#FDF3E3] text-[#B68B4D]'
                    }`}>
                      {p.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Simulated receipt view for ${p.stripePaymentIntentId}`)}
                      className="text-[#285B49] hover:underline font-semibold text-[11px] inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


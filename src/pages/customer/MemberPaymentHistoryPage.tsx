import React from 'react';
import { useDemoStore } from '../../store/demoStore';
import { ArrowLeft, Receipt, Download, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MemberPaymentHistoryPage: React.FC = () => {
  const { payments, activeMemberId, members } = useDemoStore();
  const currentMember = members.find((m) => m.id === activeMemberId) || members[0];
  const memberPayments = payments.filter((p) => p.memberId === currentMember.id || p.memberEmail === currentMember.email);

  return (
    <div className="min-h-screen bg-[#F5F6F2] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E1]">
          <Link
            to="/member/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17392F] hover:text-[#285B49]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <span className="text-xs text-[#747E76]">Billing Ledger • AUD</span>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#17392F]">Payment History</h2>
              <p className="text-xs text-[#747E76] mt-1">
                Receipts for {currentMember.name} ({currentMember.email})
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#EBEFE9] text-[#17392F]">
              All amounts in AUD
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E3E8E1] text-[#747E76] uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Plan Description</th>
                  <th className="py-3 px-3">Payment Method</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E8E1]">
                {memberPayments.length > 0 ? (
                  memberPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F5F6F2] transition-colors">
                      <td className="py-3.5 px-3 font-mono text-[11px] text-[#202923]">{p.createdAt}</td>
                      <td className="py-3.5 px-3 font-semibold text-[#17392F]">{p.planName}</td>
                      <td className="py-3.5 px-3 text-[#747E76]">{p.paymentMethod}</td>
                      <td className="py-3.5 px-3 font-bold font-tabular text-[#202923]">
                        A${p.amount}.00 AUD
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4B805D]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Succeeded
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => alert(`Simulated receipt download for payment ${p.id}`)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#285B49] hover:underline"
                        >
                          <Download className="w-3 h-3" /> PDF
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-[#747E76]">
                      No previous invoice records found for this account.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


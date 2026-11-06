import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { MemberDrawer } from '../../components/admin/MemberDrawer';
import { Member } from '../../types';
import {
  CreditCard,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const AdminSubscriptionsPage: React.FC = () => {
  const { members, scheduleCancellation } = useDemoStore();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const activeCount = members.filter((m) => m.membershipStatus === 'active').length;
  const scheduledCount = members.filter((m) => m.membershipStatus === 'cancellation_scheduled').length;
  const pastDueCount = members.filter((m) => m.membershipStatus === 'past_due').length;
  const expiredCount = members.filter((m) => m.membershipStatus === 'expired').length;

  return (
    <div className="space-y-6 text-xs text-[#202923]">
      {/* Top Subscription Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#747E76]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Recurring</span>
            <CheckCircle2 className="w-4 h-4 text-[#4B805D]" />
          </div>
          <div className="text-2xl font-bold text-[#17392F] font-tabular">{activeCount}</div>
          <p className="text-[10px] text-[#747E76]">Renewing automatically</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#B68B4D]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Cancellation Scheduled</span>
            <Clock className="w-4 h-4 text-[#B68B4D]" />
          </div>
          <div className="text-2xl font-bold text-[#B68B4D] font-tabular">{scheduledCount}</div>
          <p className="text-[10px] text-[#747E76]">Access active until period end</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#B68B4D]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Past Due (Grace)</span>
            <AlertCircle className="w-4 h-4 text-[#B68B4D]" />
          </div>
          <div className="text-2xl font-bold text-[#202923] font-tabular">{pastDueCount}</div>
          <p className="text-[10px] text-[#747E76]">3-day retry grace period</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#747E76]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Expired / Revoked</span>
            <XCircle className="w-4 h-4 text-[#B75F58]" />
          </div>
          <div className="text-2xl font-bold text-[#B75F58] font-tabular">{expiredCount}</div>
          <p className="text-[10px] text-[#747E76]">Role revoked from Discord</p>
        </div>
      </div>

      {/* Subscription Table */}
      <div className="rounded-2xl bg-white border border-[#E3E8E1] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E3E8E1] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#17392F]">Subscription Lifecycle Management</h3>
            <p className="text-xs text-[#747E76]">
              Stripe subscription IDs mapped to active Discord role states.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F6F2] text-[#747E76] uppercase text-[10px] tracking-wider border-b border-[#E3E8E1]">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Plan & Cycle</th>
                <th className="py-3 px-4">Amount (AUD)</th>
                <th className="py-3 px-4">Next Renewal / Expiry</th>
                <th className="py-3 px-4">Subscription Status</th>
                <th className="py-3 px-4">Discord Access</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E1]">
              {members.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="hover:bg-[#F5F6F2] transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#17392F]">{m.name}</p>
                    <p className="text-[11px] text-[#747E76] font-mono">{m.stripeCustomerId}</p>
                  </td>

                  <td className="py-3.5 px-4 capitalize">
                    <span className="font-semibold text-[#202923]">{m.membershipType}</span>
                    <p className="text-[11px] text-[#747E76]">{m.billingInterval}</p>
                  </td>

                  <td className="py-3.5 px-4 font-bold font-tabular text-[#17392F]">
                    A${m.amount}.00 AUD
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#747E76]">
                    {m.currentPeriodEnd.substring(0, 10)}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      m.membershipStatus === 'active'
                        ? 'bg-[#E0E9E0] text-[#285B49]'
                        : m.membershipStatus === 'cancellation_scheduled'
                        ? 'bg-[#FDF3E3] text-[#B68B4D]'
                        : m.membershipStatus === 'past_due'
                        ? 'bg-[#FDF3E3] text-[#B68B4D]'
                        : 'bg-[#F9ECEB] text-[#B75F58]'
                    }`}>
                      {m.membershipStatus === 'cancellation_scheduled'
                        ? 'Cancels At Period End'
                        : m.membershipStatus.toUpperCase().replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      m.roleStatus === 'active' ? 'bg-[#E0E9E0] text-[#285B49]' : 'bg-[#F9ECEB] text-[#B75F58]'
                    }`}>
                      {m.roleStatus === 'active' ? 'Active @Premium' : 'Role Revoked'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {m.membershipStatus === 'active' && !m.lifetime ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scheduleCancellation(m.id);
                        }}
                        className="py-1 px-2.5 rounded text-[11px] font-semibold text-[#B75F58] hover:bg-[#F9ECEB] transition-colors border border-[#B75F58]/30"
                      >
                        Cancel at Period End
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#747E76]">Inspected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MemberDrawer
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
};


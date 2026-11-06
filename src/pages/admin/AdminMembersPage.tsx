import React, { useState, useMemo } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { MemberDrawer } from '../../components/admin/MemberDrawer';
import { Member } from '../../types';
import {
  Search,
  Filter,
  ArrowUpDown,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  UserPlus,
  Eye,
  RefreshCw,
  Zap
} from 'lucide-react';

export const AdminMembersPage: React.FC = () => {
  const { members } = useDemoStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'alpha'>('newest');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Filter logic including the critical "Paid Without Role" & "Role Without Payment" filters from PRD!
  const filteredMembers = useMemo(() => {
    return members
      .filter((m) => {
        const matchesSearch =
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.discordUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.discordId.includes(searchQuery) ||
          m.stripeCustomerId.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        switch (filterType) {
          case 'active':
            return m.membershipStatus === 'active';
          case 'cancellation_scheduled':
            return m.membershipStatus === 'cancellation_scheduled';
          case 'lifetime':
            return m.lifetime;
          case 'past_due':
            return m.membershipStatus === 'past_due';
          case 'refunded':
            return m.membershipStatus === 'refunded';
          case 'chargeback':
            return m.membershipStatus === 'chargeback';
          case 'unlinked':
            return !m.linked || m.membershipStatus === 'unlinked';
          case 'paid_without_role':
            return (m.membershipStatus === 'active' || m.membershipStatus === 'cancellation_scheduled') && m.roleStatus !== 'active';
          case 'role_without_payment':
            return (m.membershipStatus === 'expired' || m.membershipStatus === 'refunded') && m.roleStatus === 'active';
          default:
            return true;
        }
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
        if (sortBy === 'oldest') return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
        if (sortBy === 'highest') return b.amount - a.amount;
        if (sortBy === 'alpha') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [members, searchQuery, filterType, sortBy]);

  const activeCount = members.filter((m) => m.membershipStatus === 'active').length;
  const unlinkedCount = members.filter((m) => !m.linked).length;
  const discrepancyCount = members.filter(
    (m) =>
      ((m.membershipStatus === 'active' || m.membershipStatus === 'cancellation_scheduled') && m.roleStatus !== 'active') ||
      ((m.membershipStatus === 'expired' || m.membershipStatus === 'refunded') && m.roleStatus === 'active')
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#17392F]">Members Directory ({members.length})</h2>
            <p className="text-xs text-[#747E76] mt-0.5">
              Live mapping between Stripe customer subscriptions and Discord @Premium roles.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#E0E9E0] text-[#285B49]">
              {activeCount} Active
            </span>
            {discrepancyCount > 0 && (
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#FDF3E3] text-[#B68B4D] border border-[#B68B4D]/30">
                {discrepancyCount} Role Discrepancies
              </span>
            )}
          </div>
        </div>

        {/* Search, Filter Pills & Sort Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#A1B5A3] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, email, Discord username, user ID or Stripe customer ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E3E8E1] bg-[#F5F6F2] focus:bg-white focus:outline-none focus:border-[#285B49] text-[#202923]"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="md:col-span-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E3E8E1] bg-white font-medium text-[#202923] focus:outline-none focus:border-[#285B49]"
            >
              <option value="all">Filter: All Members ({members.length})</option>
              <option value="active">Active Members</option>
              <option value="cancellation_scheduled">Cancellation Scheduled (Grace Period)</option>
              <option value="lifetime">Lifetime VIP (Protected)</option>
              <option value="past_due">Past Due (Grace Period)</option>
              <option value="refunded">Refunded (Revoked)</option>
              <option value="chargeback">Chargeback / Disputed</option>
              <option value="unlinked">Unlinked Accounts ({unlinkedCount})</option>
              <option value="paid_without_role">⚠️ Paid Without Role (Audit Flag)</option>
              <option value="role_without_payment">⚠️ Role Without Payment (Audit Flag)</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E3E8E1] bg-white font-medium text-[#202923] focus:outline-none focus:border-[#285B49]"
            >
              <option value="newest">Sort: Newest Joined</option>
              <option value="oldest">Sort: Oldest Joined</option>
              <option value="highest">Sort: Highest Payment (A$)</option>
              <option value="alpha">Sort: Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="rounded-2xl bg-white border border-[#E3E8E1] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F6F2] text-[#747E76] uppercase text-[10px] tracking-wider border-b border-[#E3E8E1]">
              <tr>
                <th className="py-3 px-4">Member Name & Email</th>
                <th className="py-3 px-4">Discord Identity</th>
                <th className="py-3 px-4">Plan & Amount</th>
                <th className="py-3 px-4">Stripe Status</th>
                <th className="py-3 px-4">Discord Role</th>
                <th className="py-3 px-4">Paid-Through</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E1]">
              {filteredMembers.map((m) => {
                const isPaidWithoutRole =
                  (m.membershipStatus === 'active' || m.membershipStatus === 'cancellation_scheduled') &&
                  m.roleStatus !== 'active';
                const isRoleWithoutPayment =
                  (m.membershipStatus === 'expired' || m.membershipStatus === 'refunded') &&
                  m.roleStatus === 'active';

                return (
                  <tr
                    key={m.id}
                    onClick={() => setSelectedMember(m)}
                    className="hover:bg-[#F5F6F2] transition-colors cursor-pointer group"
                  >
                    {/* Member */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#17392F] text-white font-bold flex items-center justify-center text-[10px]">
                          {m.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-[#17392F] flex items-center gap-1.5">
                            {m.name}
                            {m.lifetime && (
                              <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-[#EAE2D6] text-[#785929]">
                                LIFETIME
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#747E76] font-mono">{m.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Discord */}
                    <td className="py-3 px-4">
                      {m.linked ? (
                        <div className="space-y-0.5">
                          <p className="font-mono font-medium text-[#202923]">
                            {m.discordUsername}
                          </p>
                          <p className="text-[10px] text-[#747E76] font-mono">
                            ID: {m.discordId.substring(0, 10)}...
                          </p>
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#F9ECEB] text-[#B75F58]">
                          Unlinked OAuth
                        </span>
                      )}
                    </td>

                    {/* Plan */}
                    <td className="py-3 px-4 font-tabular">
                      <span className="font-bold text-[#17392F] capitalize">
                        {m.membershipType}
                      </span>
                      <p className="text-[11px] text-[#747E76]">A${m.amount}.00 AUD</p>
                    </td>

                    {/* Stripe Status */}
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.membershipStatus === 'active'
                          ? 'bg-[#E0E9E0] text-[#285B49]'
                          : m.membershipStatus === 'cancellation_scheduled'
                          ? 'bg-[#FDF3E3] text-[#B68B4D]'
                          : m.membershipStatus === 'past_due'
                          ? 'bg-[#FDF3E3] text-[#B68B4D]'
                          : 'bg-[#F9ECEB] text-[#B75F58]'
                      }`}>
                        {m.membershipStatus.toUpperCase().replace('_', ' ')}
                      </span>
                    </td>

                    {/* Discord Role & Discrepancy Flag */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          m.roleStatus === 'active'
                            ? 'bg-[#E0E9E0] text-[#285B49]'
                            : 'bg-[#F9ECEB] text-[#B75F58]'
                        }`}>
                          {m.roleStatus === 'active' ? '@Premium' : 'None'}
                        </span>

                        {isPaidWithoutRole && (
                          <span title="Paid without role! Rate limit or webhook dropped." className="text-[#B68B4D]">
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {isRoleWithoutPayment && (
                          <span title="Role still active after expiration/refund!" className="text-[#B75F58]">
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Paid-through */}
                    <td className="py-3 px-4 font-mono text-[11px] text-[#747E76]">
                      {m.currentPeriodEnd.substring(0, 10)}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMember(m);
                        }}
                        className="py-1 px-2.5 rounded-lg border border-[#E3E8E1] bg-white group-hover:bg-[#17392F] group-hover:text-white transition-all text-[11px] font-semibold text-[#202923]"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Details Drawer */}
      <MemberDrawer
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
};


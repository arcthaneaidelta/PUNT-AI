import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import {
  History,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Clock,
  ShieldCheck,
  User,
  Zap
} from 'lucide-react';

export const AdminActivityPage: React.FC = () => {
  const { activities } = useDemoStore();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.title.toLowerCase().includes(search.toLowerCase()) ||
      act.description.toLowerCase().includes(search.toLowerCase()) ||
      (act.memberName && act.memberName.toLowerCase().includes(search.toLowerCase())) ||
      act.referenceId.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (categoryFilter === 'all') return true;
    return act.category === categoryFilter;
  });

  return (
    <div className="space-y-6 text-xs text-[#202923]">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#285B49] bg-[#E0E9E0] px-2.5 py-0.5 rounded-full">
              AUDIT TRAIL
            </span>
            <span className="text-xs text-[#747E76]">• Immutable System Log</span>
          </div>
          <h2 className="text-xl font-bold text-[#17392F] mt-1">Activity & Event Logs</h2>
          <p className="text-xs text-[#747E76] mt-0.5">
            Chronological audit feed of incoming Stripe webhooks, Discord bot operations, and admin overrides.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] text-xs font-semibold text-[#17392F]">
          {activities.length} Recorded Events
        </span>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-[#A1B5A3] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search activity logs by member, event or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E3E8E1] bg-[#F5F6F2] focus:bg-white focus:outline-none focus:border-[#285B49]"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-[#F5F6F2] p-1 rounded-xl border border-[#E3E8E1] text-xs overflow-x-auto w-full sm:w-auto">
            {['all', 'payment', 'membership', 'discord', 'reconciliation', 'migration', 'admin'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg font-semibold capitalize whitespace-nowrap transition-all ${
                  categoryFilter === cat ? 'bg-[#17392F] text-white shadow-xs' : 'text-[#747E76] hover:text-[#202923]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="rounded-2xl bg-white border border-[#E3E8E1] shadow-xs overflow-hidden">
        <div className="divide-y divide-[#E3E8E1]">
          {filteredActivities.map((act) => (
            <div key={act.id} className="p-4 sm:p-5 hover:bg-[#F5F6F2] transition-colors flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  act.result === 'success'
                    ? 'bg-[#E0E9E0] text-[#285B49]'
                    : act.result === 'warning'
                    ? 'bg-[#FDF3E3] text-[#B68B4D]'
                    : 'bg-[#F9ECEB] text-[#B75F58]'
                }`}>
                  {act.result === 'success' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : act.result === 'warning' ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-[#202923]">{act.title}</h4>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#EBEFE9] text-[#17392F] uppercase">
                      {act.category}
                    </span>
                    {act.memberName && (
                      <span className="text-[11px] font-semibold text-[#17392F]">
                        • {act.memberName}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#747E76] leading-relaxed max-w-2xl">
                    {act.description}
                  </p>
                  {act.adminUser && (
                    <span className="inline-block text-[10px] text-[#285B49] font-medium bg-[#E0E9E0] px-1.5 py-0.2 rounded">
                      Authorized by: {act.adminUser}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0 font-mono text-[10px] text-[#747E76] space-y-1">
                <p>{act.timestamp}</p>
                <p className="text-[9px] text-[#A1B5A3] truncate max-w-[120px]">{act.referenceId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


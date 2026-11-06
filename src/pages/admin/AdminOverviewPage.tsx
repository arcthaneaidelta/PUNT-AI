import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import { MemberDrawer } from '../../components/admin/MemberDrawer';
import { Member } from '../../types';
import {
  Users,
  CreditCard,
  TrendingUp,
  UserPlus,
  Clock,
  Shield,
  Zap,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const AdminOverviewPage: React.FC = () => {
  const { members, payments, activities, reconciliationIssues, lastReconciledAt } = useDemoStore();
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '12M'>('30D');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Derive dynamic metrics from shared store
  const activePremiumCount = members.filter(
    (m) => (m.membershipStatus === 'active' || m.membershipStatus === 'cancellation_scheduled') && m.roleStatus === 'active'
  ).length;

  const weeklySubscribers = members.filter((m) => m.membershipType === 'weekly' && m.membershipStatus === 'active').length;
  const monthlySubscribers = members.filter((m) => m.membershipType === 'monthly' && m.membershipStatus === 'active').length;
  const lifetimeMembers = members.filter((m) => m.lifetime).length;
  const pendingCancellations = members.filter((m) => m.membershipStatus === 'cancellation_scheduled').length;

  // Monthly Recurring Revenue in AUD (Weekly * 4.33 + Monthly, lifetime excluded from MRR as per PRD)
  // Baseline illustrative: 486 active members = ~A$14,580 AUD
  const mrrAmount = weeklySubscribers * 37 * 4.33 + monthlySubscribers * 99;
  const formattedMRR = `A$${Math.round(mrrAmount || 14580).toLocaleString()} AUD`;

  // Total Lifetime Revenue
  const lifetimeRevenue = lifetimeMembers * 1499;

  // Chart datasets adjusted for selected time filter
  const revenueChartData = {
    '7D': [
      { date: 'Mon', recurring: 1980, lifetime: 0 },
      { date: 'Tue', recurring: 2150, lifetime: 0 },
      { date: 'Wed', recurring: 2400, lifetime: 1499 },
      { date: 'Thu', recurring: 2300, lifetime: 0 },
      { date: 'Fri', recurring: 2850, lifetime: 0 },
      { date: 'Sat', recurring: 3100, lifetime: 1499 },
      { date: 'Sun', recurring: 2600, lifetime: 0 }
    ],
    '30D': [
      { date: 'Week 1', recurring: 9800, lifetime: 1499 },
      { date: 'Week 2', recurring: 11200, lifetime: 2998 },
      { date: 'Week 3', recurring: 13400, lifetime: 1499 },
      { date: 'Week 4', recurring: 14580, lifetime: 4497 }
    ],
    '90D': [
      { date: 'Month 1', recurring: 8900, lifetime: 4497 },
      { date: 'Month 2', recurring: 11800, lifetime: 7495 },
      { date: 'Month 3', recurring: 14580, lifetime: 10493 }
    ],
    '12M': [
      { date: 'Q1', recurring: 6500, lifetime: 8994 },
      { date: 'Q2', recurring: 9200, lifetime: 14990 },
      { date: 'Q3', recurring: 12100, lifetime: 22485 },
      { date: 'Q4', recurring: 14580, lifetime: 35976 }
    ]
  }[timeRange];

  const growthData = [
    { name: 'Mon', signups: 8, cancellations: 1 },
    { name: 'Tue', signups: 12, cancellations: 2 },
    { name: 'Wed', signups: 15, cancellations: 1 },
    { name: 'Thu', signups: 9, cancellations: 0 },
    { name: 'Fri', signups: 19, cancellations: 3 },
    { name: 'Sat', signups: 24, cancellations: 2 },
    { name: 'Sun', signups: 14, cancellations: 2 }
  ];

  const planDistribution = [
    { name: 'Monthly (A$99)', value: monthlySubscribers || 18, color: '#17392F' },
    { name: 'Weekly (A$37)', value: weeklySubscribers || 11, color: '#285B49' },
    { name: 'Lifetime (A$1,499)', value: lifetimeMembers || 3, color: '#A1B5A3' }
  ];

  const pendingReconciliationCount = reconciliationIssues.filter((i) => !i.resolved).length;

  return (
    <div className="space-y-8">
      {/* Top Banner Alert if Reconciliation Issues Exist */}
      {pendingReconciliationCount > 0 && (
        <div className="p-4 rounded-2xl bg-[#FDF3E3] border border-[#B68B4D]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B68B4D] animate-ping" />
            <p className="text-[#202923]">
              <strong>Reconciliation Alert:</strong> {pendingReconciliationCount} Stripe-Discord discrepancies detected in daily audit.
            </p>
          </div>
          <Link
            to="/admin/reconciliation"
            className="px-3 py-1.5 rounded-lg bg-[#B68B4D] text-white font-semibold hover:bg-[#9e753f] transition-colors whitespace-nowrap"
          >
            Run & Resolve Mismatches →
          </Link>
        </div>
      )}

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Discord */}
        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#747E76] text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider">Discord Total</span>
            <Users className="w-4 h-4 text-[#5865F2]" />
          </div>
          <div className="text-2xl font-extrabold text-[#17392F] font-tabular">
            2,000
          </div>
          <p className="text-[10px] text-[#747E76]">Existing server size</p>
        </div>

        {/* Active Premium */}
        <div className="p-4.5 rounded-2xl bg-[#17392F] text-white shadow-md space-y-2">
          <div className="flex items-center justify-between text-emerald-300 text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider">Active Premium</span>
            <Shield className="w-4 h-4 text-emerald-300" />
          </div>
          <div className="text-2xl font-extrabold text-white font-tabular">
            {activePremiumCount || 486}
          </div>
          <p className="text-[10px] text-[#A1B5A3]">Paying role holders</p>
        </div>

        {/* Monthly Recurring Revenue */}
        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#747E76] text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider">MRR (AUD)</span>
            <CreditCard className="w-4 h-4 text-[#285B49]" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#17392F] font-tabular truncate">
            {formattedMRR}
          </div>
          <p className="text-[10px] text-[#4B805D] font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +14.2% this month
          </p>
        </div>

        {/* Weekly Subscribers */}
        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#747E76] text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider">Weekly (A$37)</span>
            <span className="font-mono text-[10px] font-bold text-[#285B49]">7D</span>
          </div>
          <div className="text-2xl font-extrabold text-[#17392F] font-tabular">
            {weeklySubscribers || 142}
          </div>
          <p className="text-[10px] text-[#747E76]">Flexible subscribers</p>
        </div>

        {/* Monthly Subscribers */}
        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#747E76] text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider">Monthly (A$99)</span>
            <span className="font-mono text-[10px] font-bold text-[#17392F]">30D</span>
          </div>
          <div className="text-2xl font-extrabold text-[#17392F] font-tabular">
            {monthlySubscribers || 320}
          </div>
          <p className="text-[10px] text-[#747E76]">Core recurring base</p>
        </div>

        {/* Lifetime Members */}
        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#785929] text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider">Lifetime (A$1.4k)</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#EAE2D6] text-[#785929]">
              VIP
            </span>
          </div>
          <div className="text-2xl font-extrabold text-[#17392F] font-tabular">
            {lifetimeMembers || 24}
          </div>
          <p className="text-[10px] text-[#785929]">Protected permanent</p>
        </div>
      </div>

      {/* Time Range Selector & Analytics Charts Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#17392F]">Financial & Growth Performance</h3>
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E3E8E1] text-xs">
            {(['7D', '30D', '90D', '12M'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  timeRange === range
                    ? 'bg-[#17392F] text-white shadow-xs'
                    : 'text-[#747E76] hover:text-[#202923]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Revenue Chart (AUD) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#747E76] tracking-wider">
                  Revenue Breakdown (AUD)
                </span>
                <h4 className="text-lg font-bold text-[#17392F]">Recurring MRR vs Lifetime Sales</h4>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-[#202923]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#17392F]" />
                  Recurring Subscriptions
                </span>
                <span className="flex items-center gap-1.5 text-[#747E76]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#91A995]" />
                  Lifetime Sales
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient id="colorRecurring" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#17392F" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#17392F" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorLifetime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#91A995" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#91A995" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F2EE" vertical={false} />
                  <XAxis dataKey="date" stroke="#A1B5A3" fontSize={11} tickLine={false} />
                  <YAxis stroke="#A1B5A3" fontSize={11} tickLine={false} tickFormatter={(val) => `A$${val}`} />
                  <Tooltip
                    formatter={(val) => [`A$${Number(val).toLocaleString()} AUD`, '']}
                    contentStyle={{ backgroundColor: '#17392F', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="recurring" stroke="#17392F" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRecurring)" name="Recurring Subscriptions" />
                  <Area type="monotone" dataKey="lifetime" stroke="#91A995" strokeWidth={2} fillOpacity={1} fill="url(#colorLifetime)" name="Lifetime Purchases" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Plan Distribution Donut Chart */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#747E76] tracking-wider">
                Distribution
              </span>
              <h4 className="text-lg font-bold text-[#17392F]">Subscribers by Plan</h4>
            </div>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planDistribution}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val, name) => [`${val} Members`, name]}
                    contentStyle={{ backgroundColor: '#17392F', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#E3E8E1] text-xs">
              {planDistribution.map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#747E76]">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.name}
                  </span>
                  <span className="font-bold text-[#202923] font-tabular">{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Signups vs Cancellations & Recent Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Signups vs Cancellations Trend */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#747E76] tracking-wider">
                Weekly Velocity
              </span>
              <h4 className="text-base font-bold text-[#17392F]">New Signups vs Cancellations</h4>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#285B49] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#285B49]" /> Signups
              </span>
              <span className="flex items-center gap-1 text-[#B75F58] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#B75F58]" /> Churn
              </span>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F2EE" vertical={false} />
                <XAxis dataKey="name" stroke="#A1B5A3" fontSize={11} tickLine={false} />
                <YAxis stroke="#A1B5A3" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#17392F', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '11px' }}
                />
                <Bar dataKey="signups" fill="#285B49" radius={[4, 4, 0, 0]} name="New Paid Signups" />
                <Bar dataKey="cancellations" fill="#B75F58" radius={[4, 4, 0, 0]} name="Cancellations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Operational Activity Feed */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E1]">
              <h4 className="text-base font-bold text-[#17392F] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#285B49]" />
                Recent Webhook & Bot Operations
              </h4>
              <Link to="/admin/activity" className="text-xs font-semibold text-[#285B49] hover:underline">
                View All Logs →
              </Link>
            </div>

            <div className="divide-y divide-[#E3E8E1] overflow-y-auto max-h-72">
              {activities.slice(0, 6).map((act) => (
                <div
                  key={act.id}
                  onClick={() => {
                    const matched = members.find((m) => m.id === act.memberId);
                    if (matched) setSelectedMember(matched);
                  }}
                  className="py-3 flex items-start justify-between gap-3 hover:bg-[#F5F6F2] p-2 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#202923]">{act.title}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        act.result === 'success'
                          ? 'bg-[#E0E9E0] text-[#285B49]'
                          : act.result === 'warning'
                          ? 'bg-[#FDF3E3] text-[#B68B4D]'
                          : 'bg-[#F9ECEB] text-[#B75F58]'
                      }`}>
                        {act.category.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#747E76] line-clamp-1">{act.description}</p>
                  </div>
                  <span className="font-mono text-[10px] text-[#A1B5A3] shrink-0">
                    {act.timestamp.substring(11, 16)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-[11px] text-[#747E76] flex items-center justify-between border-t border-[#E3E8E1]">
            <span>Click any activity to inspect member details.</span>
            <span className="font-medium text-[#285B49]">Last audit: {lastReconciledAt}</span>
          </div>
        </div>
      </div>

      {/* Member Profile Drawer */}
      <MemberDrawer
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
};


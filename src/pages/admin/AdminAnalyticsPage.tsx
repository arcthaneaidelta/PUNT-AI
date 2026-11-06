import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import {
  Download,
  Calendar,
  CreditCard,
  TrendingUp,
  Percent,
  DollarSign,
  Users,
  ShieldCheck,
  FileText
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const AdminAnalyticsPage: React.FC = () => {
  const { members, payments } = useDemoStore();
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '12M'>('30D');

  const weeklyMembers = members.filter((m) => m.membershipType === 'weekly' && m.membershipStatus === 'active').length;
  const monthlyMembers = members.filter((m) => m.membershipType === 'monthly' && m.membershipStatus === 'active').length;
  const lifetimeMembers = members.filter((m) => m.lifetime).length;

  const weeklyRecurringMRR = Math.round(weeklyMembers * 37 * 4.33);
  const monthlyRecurringMRR = monthlyMembers * 99;
  const totalMRR = weeklyRecurringMRR + monthlyRecurringMRR;
  const lifetimeRevenue = lifetimeMembers * 1499;

  const totalRevenue = totalMRR + lifetimeRevenue;
  const arpu = Math.round(totalMRR / (weeklyMembers + monthlyMembers || 1));

  const chartData = [
    { period: 'Jan', weekly: 3200, monthly: 8900, lifetime: 2998 },
    { period: 'Feb', weekly: 3900, monthly: 9800, lifetime: 1499 },
    { period: 'Mar', weekly: 4400, monthly: 11200, lifetime: 4497 },
    { period: 'Apr', weekly: 4800, monthly: 12400, lifetime: 2998 },
    { period: 'May', weekly: 5200, monthly: 13900, lifetime: 5996 },
    { period: 'Jun', weekly: 5800, monthly: 14580, lifetime: 7495 }
  ];

  const handleDownloadCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Metric,Amount_AUD,Details\n' +
      `Monthly Recurring Revenue (MRR),A$${totalMRR}.00,Recurring subscriptions only\n` +
      `Weekly Subscribers MRR,A$${weeklyRecurringMRR}.00,A$37/wk x 4.33\n` +
      `Monthly Subscribers MRR,A$${monthlyRecurringMRR}.00,A$99/mo\n` +
      `Lifetime Purchases Volume,A$${lifetimeRevenue}.00,A$1499 one-time non-recurring\n` +
      `Average Revenue Per User (ARPU),A$${arpu}.00,Active subscribers\n` +
      'Payment Success Rate,98.4%,Stripe Smart Retries active\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `punt_ai_revenue_report_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-xs text-[#202923]">
      {/* Top Header & Export */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-[#17392F]">Financial Analytics & Auditing</h2>
          <p className="text-xs text-[#747E76] mt-0.5">
            Strict separation of Australian Dollar recurring subscription revenue from one-time lifetime sales.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#F5F6F2] p-1 rounded-xl border border-[#E3E8E1]">
            {(['7D', '30D', '90D', '12M'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  timeRange === r ? 'bg-[#17392F] text-white shadow-xs' : 'text-[#747E76]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={handleDownloadCSV}
            className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-[#285B49] text-white hover:bg-[#17392F] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Download CSV Report
          </button>
        </div>
      </div>

      {/* Financial KPIs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#17392F] text-white shadow-md space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            Total Monthly MRR
          </span>
          <div className="text-2xl font-extrabold text-white font-tabular">
            A${totalMRR.toLocaleString()} AUD
          </div>
          <p className="text-[10px] text-[#A1B5A3]">Excludes one-time lifetime sales</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#747E76]">
            Weekly MRR Contribution
          </span>
          <div className="text-2xl font-extrabold text-[#17392F] font-tabular">
            A${weeklyRecurringMRR.toLocaleString()} AUD
          </div>
          <p className="text-[10px] text-[#747E76]">{weeklyMembers} members @ A$37/wk</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#747E76]">
            Monthly MRR Contribution
          </span>
          <div className="text-2xl font-extrabold text-[#17392F] font-tabular">
            A${monthlyRecurringMRR.toLocaleString()} AUD
          </div>
          <p className="text-[10px] text-[#747E76]">{monthlyMembers} members @ A$99/mo</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#785929]">
            Lifetime Sales Volume
          </span>
          <div className="text-2xl font-extrabold text-[#785929] font-tabular">
            A${lifetimeRevenue.toLocaleString()} AUD
          </div>
          <p className="text-[10px] text-[#785929] font-medium">{lifetimeMembers} VIPs @ A$1,499</p>
        </div>
      </div>

      {/* Secondary Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#E3E8E1] space-y-1">
          <span className="text-[#747E76] text-[10px] uppercase font-bold">Average Revenue / Member</span>
          <p className="text-lg font-bold text-[#202923] font-tabular">A${arpu}.00 AUD</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E3E8E1] space-y-1">
          <span className="text-[#747E76] text-[10px] uppercase font-bold">Churn Rate (30D)</span>
          <p className="text-lg font-bold text-[#4B805D] font-tabular">2.4%</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E3E8E1] space-y-1">
          <span className="text-[#747E76] text-[10px] uppercase font-bold">Stripe Payment Success</span>
          <p className="text-lg font-bold text-[#4B805D] font-tabular">98.6%</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E3E8E1] space-y-1">
          <span className="text-[#747E76] text-[10px] uppercase font-bold">Whop / Middleman Fee Cut</span>
          <p className="text-lg font-bold text-[#285B49] font-tabular">$0.00 (0%)</p>
        </div>
      </div>

      {/* Revenue History Chart */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#17392F]">Historical AUD Invoicing by Plan</h3>
          <span className="text-[11px] text-[#747E76]">Weekly vs Monthly vs Lifetime</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2EE" vertical={false} />
              <XAxis dataKey="period" stroke="#A1B5A3" fontSize={11} tickLine={false} />
              <YAxis stroke="#A1B5A3" fontSize={11} tickLine={false} tickFormatter={(val) => `A$${val}`} />
              <Tooltip
                formatter={(val) => [`A$${Number(val).toLocaleString()} AUD`, '']}
                contentStyle={{ backgroundColor: '#17392F', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '11px' }}
              />
              <Bar dataKey="weekly" fill="#285B49" name="Weekly (A$37)" />
              <Bar dataKey="monthly" fill="#17392F" name="Monthly (A$99)" />
              <Bar dataKey="lifetime" fill="#A1B5A3" name="Lifetime (A$1,499)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { Users, ShieldCheck, CreditCard, MessageSquare, Award } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const stats = [
    { label: 'Existing Discord Server', value: '2,000+', icon: Users, desc: 'Active sports community members' },
    { label: 'Automated Premium Roles', value: '100%', icon: ShieldCheck, desc: 'Instant role assignment & revoking' },
    { label: 'Direct Stripe Payments', value: 'AUD', icon: CreditCard, desc: 'Weekly, Monthly & Lifetime plans' },
    { label: 'Custom Discord Bot', value: 'Dedicated', icon: MessageSquare, desc: 'No shared third-party bot outages' },
    { label: 'Platform Revenue Sharing', value: '$0 / 0%', icon: Award, desc: 'Whop excluded • 100% margin retained' },
  ];

  return (
    <div className="border-y border-[#E3E8E1] bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center sm:items-start text-center sm:text-left border-r last:border-r-0 border-[#E3E8E1] pr-4"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#747E76] mb-1">
                  <Icon className="w-4 h-4 text-[#285B49]" />
                  <span className="font-semibold">{s.label}</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#17392F] font-tabular tracking-tight">
                  {s.value}
                </div>
                <p className="text-[11px] text-[#A1B5A3] mt-0.5 leading-snug">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


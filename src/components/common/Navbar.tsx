import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface NavbarProps {
  onOpenSimulator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSimulator }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Platform', href: '/#platform' },
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Migration Claim', href: '/migration/claim' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#E3E8E1] shadow-xs'
          : 'bg-[#F5F6F2]/80 backdrop-blur-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#17392F] flex items-center justify-center text-white font-bold text-lg tracking-tight group-hover:bg-[#285B49] transition-colors shadow-xs">
            P
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-[#17392F]">
                PUNT<span className="text-[#4B805D]">·AI</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#E0E9E0] text-[#285B49] border border-[#A1B5A3]/40">
                AUD
              </span>
            </div>
            <p className="text-[11px] text-[#747E76] font-medium leading-none">
              Premium Discord Automation
            </p>
          </div>
        </Link>

        {/* Center Desktop Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#17392F] ${
                location.pathname === link.href
                  ? 'text-[#17392F] font-semibold'
                  : 'text-[#747E76]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenSimulator && (
            <button
              onClick={onOpenSimulator}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E0E9E0] text-[#285B49] hover:bg-[#d0dfd0] transition-colors border border-[#A1B5A3]/50"
            >
              <Zap className="w-3.5 h-3.5 text-[#285B49]" />
              Event Simulator
            </button>
          )}

          <Link
            to="/member/dashboard"
            className="px-3.5 py-2 text-xs font-medium text-[#202923] hover:text-[#17392F] hover:bg-white rounded-lg border border-transparent hover:border-[#E3E8E1] transition-all"
          >
            Member Login
          </Link>

          <Link
            to="/admin/overview"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#17392F] text-white hover:bg-[#285B49] transition-all shadow-xs"
          >
            Explore Admin Demo
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          {onOpenSimulator && (
            <button
              onClick={onOpenSimulator}
              className="p-1.5 rounded-lg bg-[#E0E9E0] text-[#285B49]"
              title="Simulator"
            >
              <Zap className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#202923] hover:bg-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E3E8E1] bg-white px-5 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#202923] hover:text-[#285B49] py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#E3E8E1] flex flex-col gap-2">
            <Link
              to="/member/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-medium text-[#202923] bg-[#F5F6F2] rounded-lg"
            >
              Customer Member Portal
            </Link>
            <Link
              to="/admin/overview"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold bg-[#17392F] text-white rounded-lg"
            >
              Open Admin Demo Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};


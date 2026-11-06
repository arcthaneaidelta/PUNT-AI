import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public pages
import { HomePage } from './pages/landing/HomePage';
import { PricingPage } from './pages/landing/PricingPage';
import { HowItWorksPage } from './pages/landing/HowItWorksPage';

// Customer pages
import { CheckoutSuccessPage } from './pages/customer/CheckoutSuccessPage';
import { ConnectDiscordPage } from './pages/customer/ConnectDiscordPage';
import { MemberDashboardPage } from './pages/customer/MemberDashboardPage';
import { MemberBillingPage } from './pages/customer/MemberBillingPage';
import { MemberPaymentHistoryPage } from './pages/customer/MemberPaymentHistoryPage';
import { MemberDiscordPage } from './pages/customer/MemberDiscordPage';
import { MemberSupportPage } from './pages/customer/MemberSupportPage';
import { MembershipManagePage } from './pages/customer/MembershipManagePage';
import { MigrationClaimPage } from './pages/customer/MigrationClaimPage';

// Admin layout & pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminMembersPage } from './pages/admin/AdminMembersPage';
import { AdminSubscriptionsPage } from './pages/admin/AdminSubscriptionsPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminPaymentLinksPage } from './pages/admin/AdminPaymentLinksPage';
import { AdminDiscordPage } from './pages/admin/AdminDiscordPage';
import { AdminReconciliationPage } from './pages/admin/AdminReconciliationPage';
import { AdminMigrationPage } from './pages/admin/AdminMigrationPage';
import { AdminAutomationsPage } from './pages/admin/AdminAutomationsPage';
import { AdminActivityPage } from './pages/admin/AdminActivityPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminEmailPage } from './pages/admin/AdminEmailPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />

        {/* Customer Membership Flows */}
        <Route path="/membership/success" element={<CheckoutSuccessPage />} />
        <Route path="/connect-discord" element={<ConnectDiscordPage />} />
        <Route path="/membership" element={<MemberDashboardPage />} />
        <Route path="/membership/manage" element={<MembershipManagePage />} />
        <Route path="/migration/claim" element={<MigrationClaimPage />} />
        <Route path="/migration/claim/:token" element={<MigrationClaimPage />} />

        {/* Customer Member Portal */}
        <Route path="/member/dashboard" element={<MemberDashboardPage />} />
        <Route path="/member/billing" element={<MemberBillingPage />} />
        <Route path="/member/payment-history" element={<MemberPaymentHistoryPage />} />
        <Route path="/member/discord" element={<MemberDiscordPage />} />
        <Route path="/member/support" element={<MemberSupportPage />} />

        {/* Admin Login & Workspace */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/demo" element={<Navigate to="/admin/overview" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/overview" replace />} />

        {/* Admin App with Sidebar & Header */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/overview" element={<AdminOverviewPage />} />
          <Route path="/admin/members" element={<AdminMembersPage />} />
          <Route path="/admin/subscriptions" element={<AdminSubscriptionsPage />} />
          <Route path="/admin/payments" element={<AdminPaymentsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/payment-links" element={<AdminPaymentLinksPage />} />
          <Route path="/admin/discord" element={<AdminDiscordPage />} />
          <Route path="/admin/reconciliation" element={<AdminReconciliationPage />} />
          <Route path="/admin/migration" element={<AdminMigrationPage />} />
          <Route path="/admin/automations" element={<AdminAutomationsPage />} />
          <Route path="/admin/activity" element={<AdminActivityPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/admin/settings/email" element={<AdminEmailPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

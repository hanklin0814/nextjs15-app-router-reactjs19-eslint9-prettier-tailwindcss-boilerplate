'use client';

import CommonLayout from '@/components/CommonLayout';
import Navigation from '@/components/Navigation';

export default function SettingsPage() {
  return (
    <div className="p-4">
      <Navigation />
      <CommonLayout />
      <h1 className="text-2xl font-bold">SettingsPage</h1>
      <p className="text-lg mb-4">
        Leverage nested routing to create hierarchical layouts. For example, a
        dashboard section might have its own layout separate from the main
        application layout.
      </p>
    </div>
  );
}

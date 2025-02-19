import { Metadata } from 'next';
import Link from 'next/link';
import { RiAlarmWarningFill } from 'react-icons/ri';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <div className="text-center">
      <div className="layout flex min-h-screen flex-col items-center justify-center text-center">
        <RiAlarmWarningFill
          size={60}
          className="drop-shadow-glow animate-flicker text-gray-500"
        />
        <h1 className="text-xl">404 Page Not Found</h1>
        <h5>change this in app/not-found.tsx</h5>
        <Link
          className="bg-blue-900 text-white rounded-md mt-4 px-3 py-2 text-sm font-medium"
          href="/"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

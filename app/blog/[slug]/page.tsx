'use client';
import { useParams } from 'next/navigation';

import CommonLayout from '@/components/CommonLayout';
import Navigation from '@/components/Navigation';

export default function BlogPost() {
  const { slug } = useParams();

  return (
    <div className="p-4">
      <Navigation />
      <CommonLayout />
      <h1 className="text-2xl font-bold mb-4">BlogPost Dynamic Routes</h1>
      <p className="text-lg mb-4">{`[slug]: ${slug}`}</p>
    </div>
  );
}

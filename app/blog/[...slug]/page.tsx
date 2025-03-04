'use client';
import { useParams } from 'next/navigation';

import Slider from '@/components/Slider';
import Navigation from '@/components/Navigation';

export default function BlogPost() {
  const { slug } = useParams();

  return (
    <div className="p-4">
      <Navigation />
      <Slider />
      <h1 className="text-2xl font-bold mb-4">BlogPost Dynamic Routes</h1>
      <p className="text-lg mb-4">{`[...slug]: ${slug}`}</p>
    </div>
  );
}

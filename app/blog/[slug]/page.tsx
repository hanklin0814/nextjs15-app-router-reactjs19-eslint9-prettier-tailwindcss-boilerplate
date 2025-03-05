'use client';
import { useParams } from 'next/navigation';

import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Slider from '@/components/Slider';

export default function BlogPost() {
  const { slug } = useParams();

  return (
    <div className="p-4">
      <Header />
      <Navigation />
      <Slider />
      <h1 className="text-2xl font-bold mb-4">BlogPost Dynamic Routes</h1>
      <p className="text-lg mb-4">{`[slug]: ${slug}`}</p>
    </div>
  );
}

'use client';
import dynamic from 'next/dynamic';
import { isDesktop } from 'react-device-detect';

export default function Home() {
  console.log({ isDesktop });

  const LayoutComponent = dynamic(
    () =>
      isDesktop
        ? import('@/components/desktop')
        : import('@/components/mobile'),
    { ssr: false }
  );

  return <LayoutComponent />;
}

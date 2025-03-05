'use client';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { isDesktop } from 'react-device-detect';

export default function Home() {
  const t = useTranslations();
  const DesktopComponent = dynamic(() => import('@/components/desktop'), {
    loading: () => <p>{t('global.loading')}</p>,
    ssr: false,
  });

  const MobileComponent = dynamic(() => import('@/components/mobile'), {
    loading: () => <p>{t('global.loading')}</p>,
    ssr: false,
  });

  return <>{isDesktop ? <DesktopComponent /> : <MobileComponent />}</>;
}

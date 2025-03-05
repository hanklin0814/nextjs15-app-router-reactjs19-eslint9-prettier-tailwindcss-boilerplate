'use client';
import { useTranslations } from 'next-intl';
import { GrAnnounce } from 'react-icons/gr';

export default function Announcement() {
  const t = useTranslations();
  return (
    <div id="announcement" className="flex border border-blue-500 p-3">
      <GrAnnounce size={20} className="drop-shadow-glow animate-flicker " />
      {t('section.announcement')}
    </div>
  );
}

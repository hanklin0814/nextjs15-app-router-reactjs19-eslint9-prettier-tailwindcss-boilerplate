'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const currentLocale = useLocale();

  const changeLanguage = (locale: string) => {
    // 設定 cookie，並設定 path=/ 以便全站生效
    document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    // 刷新頁面以載入新的翻譯
    router.refresh();
  };

  const getClassNames = (lang: string) =>
    clsx('border border-blue-500', {
      'bg-orange-500 text-black': currentLocale === lang,
    });

  return (
    <div className="absolute top-2 right-2 flex gap-3">
      <button
        className={getClassNames('en')}
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
      <button
        className={getClassNames('zh')}
        onClick={() => changeLanguage('zh')}
      >
        中文
      </button>
      <button
        className={getClassNames('th')}
        onClick={() => changeLanguage('th')}
      >
        ไทย
      </button>
      <button
        className={getClassNames('ko')}
        onClick={() => changeLanguage('ko')}
      >
        한국어
      </button>
    </div>
  );
}

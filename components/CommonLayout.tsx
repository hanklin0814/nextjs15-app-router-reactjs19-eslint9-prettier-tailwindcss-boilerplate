'use client';
import { LAYOUT } from '@/constants';
import { useWebsiteConfig } from '@/context/WebsiteContext';
import { classNames } from '@/utils/general';

export default function CommonLayout() {
  const { webConfig } = useWebsiteConfig();

  const getLayoutContent = () => {
    switch (webConfig.layoutType) {
      case LAYOUT.TYPE_A:
        return 'LAYOUT.TYPE_A';
      case LAYOUT.TYPE_B:
        return 'LAYOUT.TYPE_B';
      case LAYOUT.TYPE_C:
        return 'LAYOUT.TYPE_C';
    }
  };

  return (
    <div
      className={classNames(
        webConfig.layoutType === LAYOUT.TYPE_A
          ? 'bg-blue-500 justify-start'
          : webConfig.layoutType === LAYOUT.TYPE_B
            ? 'bg-violet-500 justify-center'
            : 'bg-fuchsia-500 justify-end',
        'flex al p-2 m-4'
      )}
    >
      {getLayoutContent()}
    </div>
  );
}

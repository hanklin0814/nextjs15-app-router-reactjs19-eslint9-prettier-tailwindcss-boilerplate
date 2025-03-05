// async function getReact() {
//   const response = await fetch('https://registry.npmjs.org/react/rc', {
//     next: { revalidate: 60 },
//     cache: 'force-cache',
//   });

import Header from '@/components/Header';

//   if (!response.ok) {
//     throw Error;
//   }
//   return response.json();
// }

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const data = await getReact();

  return (
    <div className="dashboard-container">
      {/* 可放入 Dashboard 專用的 header 或側邊欄 */}
      <Header />
      {children}
    </div>
  );
}

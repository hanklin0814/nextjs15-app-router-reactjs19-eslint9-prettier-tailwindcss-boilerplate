export default async function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
      <div className="">這裡是 TodoLayout 的 footer</div>
    </div>
  );
}

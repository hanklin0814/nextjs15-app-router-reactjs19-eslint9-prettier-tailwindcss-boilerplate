export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <span className="ml-4 text-xl font-medium">DashboardLoading...</span>
      </div>
    </div>
  );
}

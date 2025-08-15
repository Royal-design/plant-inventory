export default function UserDashboard() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg p-6 shadow dark:bg-slate-600">
          <h2 className="text-lg font-semibold">Quick Stats</h2>
          <p className="mt-2">Your dashboard content here</p>
        </div>
      </div>
    </div>
  )
}

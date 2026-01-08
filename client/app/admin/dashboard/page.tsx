export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-4">Welcome! Use future pages to manage content.</p>
      <form action="/api/admin/logout" method="POST">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </form>
    </main>
  );
}

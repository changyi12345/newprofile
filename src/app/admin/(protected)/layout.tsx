import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div 
      className="min-h-screen bg-slate-50 dark:bg-black"
      suppressHydrationWarning
    >
      <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-slate-200 dark:border-neon-green/30 px-4 sm:px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-neon-green text-shadow-neon">Admin Dashboard</h1>
        <div 
          className="flex gap-2 sm:gap-4"
          suppressHydrationWarning
        >
          <Link href="/" target="_blank">
             <Button variant="outline" size="sm" className="dark:border-neon-blue dark:text-neon-blue dark:hover:bg-neon-blue/10">View Site</Button>
          </Link>
          <Link href="/api/auth/signout">
             <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50">Logout</Button>
          </Link>
        </div>
      </nav>
      <main className="p-4 sm:p-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}

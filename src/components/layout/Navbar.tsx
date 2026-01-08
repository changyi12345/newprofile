"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("Home")
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  if (!mounted) {
    return null
  }

  // Don't render Navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 dark:bg-black/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-100 dark:border-neon-green/30"
          : "bg-transparent py-5"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="#" 
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-neon-green tracking-tighter z-50 hover:opacity-80 transition-opacity"
            onClick={() => setActiveSection("Home")}
          >
            Portfolio<span className="text-blue-600 dark:text-neon-blue">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-neon-blue py-1",
                  activeSection === item.name
                    ? "text-blue-600 dark:text-neon-blue"
                    : "text-slate-600 dark:text-slate-300"
                )}
                onClick={() => setActiveSection(item.name)}
              >
                {item.name}
                {activeSection === item.name && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-neon-blue rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 px-0 rounded-full dark:text-neon-green dark:hover:bg-black dark:hover:text-neon-blue hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4 z-50">
             <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 px-0 rounded-full dark:text-neon-green hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 w-10 h-10 rounded-full dark:text-neon-green hover:bg-slate-100 dark:hover:bg-white/10"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-900 dark:text-neon-green" />
              ) : (
                <Menu className="h-6 w-6 text-slate-900 dark:text-neon-green" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-0 left-0 w-full bg-white dark:bg-black z-40 flex flex-col items-center justify-center md:hidden"
          >
             {/* Background Decoration */}
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 dark:bg-neon-blue/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/10 dark:bg-neon-green/10 rounded-full blur-3xl" />
             </div>

            <div className="flex flex-col items-center gap-8 relative z-10">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-3xl font-bold transition-colors hover:text-blue-600 dark:hover:text-neon-blue p-2 block",
                      activeSection === item.name
                        ? "text-blue-600 dark:text-neon-blue text-shadow-neon"
                        : "text-slate-900 dark:text-neon-green"
                    )}
                    onClick={() => {
                      setActiveSection(item.name)
                      setMobileMenuOpen(false)
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

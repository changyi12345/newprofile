"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminSectionProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

export function AdminSection({ title, icon, children, defaultOpen = false }: AdminSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div 
      className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200 hover:shadow-md"
      suppressHydrationWarning
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors active:bg-slate-100 dark:active:bg-slate-800",
          isOpen ? "bg-slate-50 dark:bg-slate-800/50" : "hover:bg-slate-50 dark:hover:bg-slate-800/30"
        )}
      >
        <div className="flex items-center gap-3" suppressHydrationWarning>
          {icon && <span className="text-blue-600 dark:text-blue-400">{icon}</span>}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          suppressHydrationWarning
        >
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div 
              className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800"
              suppressHydrationWarning
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

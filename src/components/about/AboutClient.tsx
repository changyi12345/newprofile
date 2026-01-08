"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileText, Mail } from "lucide-react"
import Image from "next/image"

interface AboutProps {
  data: {
    description: string
    experience: string
    projects: string
    image?: string | null
  } | null
}

export function AboutClient({ data }: AboutProps) {
  if (!data) return null

  return (
    <section id="about" className="py-12 lg:py-20 bg-white dark:bg-black overflow-hidden">
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        suppressHydrationWarning
      >
        <div 
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          suppressHydrationWarning
        >
          
          {/* Image / Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
            suppressHydrationWarning
          >
            <div className="relative aspect-square max-w-xs sm:max-w-md mx-auto lg:mx-0" suppressHydrationWarning>
              {/* Decorative background elements */}
              <div className="absolute inset-0 bg-blue-100 dark:bg-neon-blue/20 rounded-2xl transform rotate-3 transition-transform duration-300 hover:rotate-6 border border-transparent dark:border-neon-blue/30" suppressHydrationWarning />
              <div className="absolute inset-0 bg-slate-100 dark:bg-black rounded-2xl transform -rotate-3 transition-transform duration-300 hover:-rotate-6 border border-transparent dark:border-neon-green/30" suppressHydrationWarning />
              
              {/* Main Image Container */}
              <div className="relative h-full bg-slate-200 dark:bg-black rounded-2xl overflow-hidden flex items-center justify-center shadow-lg border border-transparent dark:border-neon-green/50" suppressHydrationWarning>
                {data.image ? (
                   <Image 
                     src={data.image} 
                     alt="About Me" 
                     fill 
                     className="object-cover"
                   /> 
                ) : (
                  <span className="text-slate-400 dark:text-neon-green font-medium">
                    Profile Image
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Text Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="space-y-6 text-center lg:text-left mt-8 lg:mt-0"
            suppressHydrationWarning
          >
            <div className="space-y-2 flex flex-col items-center lg:items-start" suppressHydrationWarning>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-neon-green text-shadow-neon">
                About Me
              </h2>
              <div className="h-1 w-20 bg-blue-600 dark:bg-neon-blue rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" suppressHydrationWarning />
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-200 leading-relaxed whitespace-pre-line" suppressHydrationWarning>
              {data.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 text-left" suppressHydrationWarning>
              <div className="p-4 bg-slate-50 dark:bg-black/50 rounded-lg border border-slate-100 dark:border-neon-blue/30 hover:dark:border-neon-blue/60 transition-colors" suppressHydrationWarning>
                <h3 className="font-bold text-slate-900 dark:text-neon-blue mb-1">Experience</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">{data.experience}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-black/50 rounded-lg border border-slate-100 dark:border-neon-green/30 hover:dark:border-neon-green/60 transition-colors" suppressHydrationWarning>
                <h3 className="font-bold text-slate-900 dark:text-neon-green mb-1">Projects</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">{data.projects}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4" suppressHydrationWarning>
              <Button className="gap-2 dark:shadow-[0_0_15px_rgba(34,197,94,0.3)] border-neon-green w-full sm:w-auto">
                <Mail className="w-4 h-4" />
                Contact Me
              </Button>
              <Button variant="outline" className="gap-2 dark:border-neon-blue dark:text-neon-blue dark:hover:bg-neon-blue/10 w-full sm:w-auto">
                <FileText className="w-4 h-4" />
                Resume
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

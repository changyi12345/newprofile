"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeroProps {
  data: {
    name: string
    role: string
    description: string
    available: boolean
    image?: string | null
    cv?: string | null
  } | null
}

export function HeroClient({ data }: HeroProps) {
  if (!data) return null

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as const },
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div 
        className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        suppressHydrationWarning
      >
        
        {/* Text Content */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left space-y-6 order-2 lg:order-1"
          suppressHydrationWarning
        >
          <motion.div variants={item} suppressHydrationWarning>
            {data.available && (
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-neon-blue/10 text-blue-600 dark:text-neon-blue text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(34,197,94,0.4)] border border-blue-200 dark:border-neon-blue/50">
                Available for work
              </span>
            )}
          </motion.div>

          <motion.h1 variants={item} className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-neon-green text-shadow-neon" suppressHydrationWarning>
            Hi, I&#39;m <span className="text-blue-600 dark:text-neon-blue text-shadow-neon">{data.name}</span>
            <br />
            <span className="text-slate-500 dark:text-slate-200 text-2xl sm:text-4xl md:text-5xl mt-2 block">
              {data.role}
            </span>
          </motion.h1>

          <motion.p variants={item} className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed" suppressHydrationWarning>
            {data.description}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4" suppressHydrationWarning>
            <Button size="lg" className="w-full sm:w-auto gap-2 shadow-[0_0_15px_rgba(34,197,94,0.5)] dark:shadow-[0_0_20px_rgba(34,197,94,0.4)] dark:hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] border-neon-green">
              View Projects <ArrowRight className="w-4 h-4" />
            </Button>
            {data.cv && (
              <a href={data.cv} download target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full gap-2 dark:border-neon-green dark:text-neon-green dark:hover:bg-neon-green/10">
                  Download CV <Download className="w-4 h-4" />
                </Button>
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Hero Image / Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[300px] sm:h-[400px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2 perspective-1000 mt-8 lg:mt-0"
          suppressHydrationWarning
        >
          {/* 3D Box Container */}
          <motion.div 
            whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[500px] bg-slate-100 dark:bg-black rounded-2xl border-2 border-slate-900 dark:border-neon-green shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] transition-shadow duration-500 overflow-hidden"
            suppressHydrationWarning
          >
             {data.image ? (
               <Image 
                 src={data.image} 
                 alt={data.name} 
                 fill 
                 className="object-cover"
                 priority
               />
             ) : (
               <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-black">
                 <div className="text-slate-300 dark:text-neon-green font-bold text-6xl lg:text-9xl select-none">
                    IMG
                 </div>
               </div>
             )}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

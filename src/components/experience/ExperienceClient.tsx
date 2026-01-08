"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"

interface Experience {
  id: string
  role: string
  company: string
  date: string
  description: string
}

interface ExperienceProps {
  data: Experience[]
}

export function ExperienceClient({ data }: ExperienceProps) {
  return (
    <section id="experience" className="py-12 lg:py-20 bg-slate-50 dark:bg-black/50">
      <div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        suppressHydrationWarning
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
          suppressHydrationWarning
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-neon-green mb-4 text-shadow-neon">
            Work Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-200">
            My professional journey and career milestones.
          </p>
        </motion.div>

        <div 
          className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent dark:before:via-neon-blue/50"
          suppressHydrationWarning
        >
          {data.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              suppressHydrationWarning
            >
              {/* Icon */}
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-neon-green bg-slate-50 dark:bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"
                suppressHydrationWarning
              >
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-neon-green" />
              </div>

              {/* Card */}
              <div 
                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white dark:bg-black rounded-xl border border-slate-100 dark:border-neon-blue/30 shadow-sm hover:shadow-md transition-shadow"
                suppressHydrationWarning
              >
                <div className="flex items-center justify-between mb-2" suppressHydrationWarning>
                  <h3 className="font-bold text-slate-900 dark:text-neon-green text-lg">
                    {exp.role}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-neon-blue font-medium mb-3" suppressHydrationWarning>
                  <span className="bg-blue-50 dark:bg-neon-blue/10 px-2 py-0.5 rounded-full border border-transparent dark:border-neon-blue/20">
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3 h-3" />
                    {exp.date}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-200 text-sm sm:text-base">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

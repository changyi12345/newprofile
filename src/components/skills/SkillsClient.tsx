"use client"

import { motion } from "framer-motion"
import { Code2, Palette, Database, Terminal } from "lucide-react"

interface Skill {
  id: string
  category: string
  name: string
  level: number
}

interface SkillsProps {
  data: Skill[]
}

export function SkillsClient({ data }: SkillsProps) {
  // Group skills by category
  const groupedSkills = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const categories = Object.keys(groupedSkills)

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return <Code2 className="w-6 h-6 text-blue-500 dark:text-neon-blue" />
      case "backend":
        return <Database className="w-6 h-6 text-green-500 dark:text-neon-green" />
      case "tools":
      case "devops":
      case "tools & devops":
        return <Terminal className="w-6 h-6 text-purple-500 dark:text-purple-400" />
      default:
        return <Palette className="w-6 h-6 text-orange-500 dark:text-orange-400" />
    }
  }

  return (
    <section id="skills" className="py-12 lg:py-20 bg-slate-50 dark:bg-black/80">
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
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
            Technical Skills
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-200 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels.
          </p>
        </motion.div>

        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          suppressHydrationWarning
        >
          {categories.map((category, groupIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-black rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 dark:border-neon-blue/30 dark:hover:border-neon-blue/60"
              suppressHydrationWarning
            >
              <div className="flex items-center gap-3 mb-6" suppressHydrationWarning>
                <div className="p-3 bg-slate-50 dark:bg-neon-blue/10 rounded-lg" suppressHydrationWarning>
                  {getIcon(category)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-neon-blue">
                  {category}
                </h3>
              </div>

              <div className="space-y-6" suppressHydrationWarning>
                {groupedSkills[category].map((skill, index) => (
                  <div key={skill.id} suppressHydrationWarning>
                    <div className="flex justify-between mb-2" suppressHydrationWarning>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {skill.name}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden" suppressHydrationWarning>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                        className="h-full bg-blue-600 dark:bg-neon-green rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

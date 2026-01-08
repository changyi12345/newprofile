"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { buttonVariants, buttonSizes } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  title: string
  description: string
  tags: string
  image: string | null
  demoLink: string | null
  githubLink: string | null
}

interface ProjectsProps {
  data: Project[]
}

export function ProjectsClient({ data }: ProjectsProps) {
  return (
    <section id="projects" className="py-12 lg:py-20 bg-white dark:bg-black">
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
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-200 max-w-2xl mx-auto">
            A selection of projects that demonstrate my ability to build scalable and user-friendly applications.
          </p>
        </motion.div>

        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          suppressHydrationWarning
        >
          {data.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-white dark:bg-black rounded-xl overflow-hidden border border-slate-100 dark:border-neon-blue/30 hover:dark:border-neon-blue/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              suppressHydrationWarning
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-black border-b dark:border-neon-blue/20 shrink-0" suppressHydrationWarning>
                {project.image && project.image.startsWith('/') ? (
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                   <div className={`absolute inset-0 ${project.image || 'bg-slate-200 dark:bg-black'} transition-transform duration-500 group-hover:scale-105`} suppressHydrationWarning />
                )}
                
                {/* Overlay - Visible on Hover and Focus */}
                <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4" suppressHydrationWarning>
                   {project.githubLink && (
                     <motion.a 
                       href={project.githubLink} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className={cn(
                         "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none outline-none",
                         buttonVariants.ghost,
                         buttonSizes.sm,
                         "text-white dark:text-neon-green hover:bg-white/20 dark:hover:bg-neon-green/20 focus:bg-white/20"
                       )}
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                       <Github className="w-5 h-5" />
                     </motion.a>
                   )}
                   {project.demoLink && (
                     <motion.a 
                       href={project.demoLink} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className={cn(
                         "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none outline-none",
                         buttonVariants.ghost,
                         buttonSizes.sm,
                         "text-white dark:text-neon-blue hover:bg-white/20 dark:hover:bg-neon-blue/20 focus:bg-white/20"
                       )}
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                       <ExternalLink className="w-5 h-5" />
                     </motion.a>
                   )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow" suppressHydrationWarning>
                <h3 className="text-xl font-bold text-slate-900 dark:text-neon-green mb-2 group-hover:text-blue-600 dark:group-hover:text-neon-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 flex-grow text-sm sm:text-base">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6" suppressHydrationWarning>
                  {project.tags.split(',').map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-0.5 text-xs font-medium bg-slate-100 dark:bg-neon-blue/10 text-slate-600 dark:text-neon-blue rounded-full border border-transparent dark:border-neon-blue/30"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <div className="mt-auto" suppressHydrationWarning>
                   <a 
                    href={project.demoLink || project.githubLink || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={cn(
                      "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none w-full justify-between group/btn",
                      buttonVariants.outline,
                      buttonSizes.md,
                      "dark:border-neon-green dark:text-neon-green dark:hover:bg-neon-green/10"
                    )}
                   >
                      View Details
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                   </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

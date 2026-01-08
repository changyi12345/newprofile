import { Github, Linkedin, Twitter } from "lucide-react"
import { getContact } from "@/app/actions"

export async function Footer() {
  const currentYear = new Date().getFullYear()
  const contact = await getContact()

  return (
    <footer className="bg-white dark:bg-black border-t border-slate-100 dark:border-neon-blue/20 py-12">
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        suppressHydrationWarning
      >
        <div 
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          suppressHydrationWarning
        >
          <div 
            className="text-center md:text-left"
            suppressHydrationWarning
          >
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-neon-green mb-2 text-shadow-neon">
              Portfolio<span className="text-blue-600 dark:text-neon-blue">.</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Building digital experiences with passion and purpose.
            </p>
          </div>

          <div 
            className="flex gap-6"
            suppressHydrationWarning
          >
            {contact?.github && (
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-neon-blue transition-colors">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
            )}
            {contact?.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-neon-blue transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
            {contact?.twitter && (
              <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-neon-blue transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
            )}
          </div>
        </div>

        <div 
          className="mt-8 pt-8 border-t border-slate-100 dark:border-neon-blue/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400"
          suppressHydrationWarning
        >
          <p suppressHydrationWarning>© {currentYear} All rights reserved.</p>
          <div 
            className="flex gap-6"
            suppressHydrationWarning
          >
            <a href="#" className="hover:text-slate-900 dark:hover:text-neon-green transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-neon-green transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { getHero, getAbout, getSkills, getProjects, getExperiences, getContact, updateHero, updateAbout, addSkill, deleteSkill, addProject, deleteProject, addExperience, deleteExperience, updateContact, updatePassword } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Trash2, Lock, Home, User, Code2, FolderGit2, Briefcase, Mail } from "lucide-react"
import { AdminSection } from "@/components/admin/AdminSection"

export default async function AdminDashboard() {
  const hero = await getHero()
  const about = await getAbout()
  const skills = await getSkills()
  const projects = await getProjects()
  const experiences = await getExperiences()
  const contact = await getContact()

  const inputClasses = "w-full px-4 py-3 border rounded-lg bg-white dark:bg-black border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
  const labelClasses = "block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300"

  return (
    <div 
      className="space-y-6 pb-20"
      suppressHydrationWarning
    >
      
      {/* Hero Section */}
      <AdminSection title="Hero Section" icon={<Home className="w-6 h-6" />}>
        <form action={updateHero} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Name</label>
              <input name="name" defaultValue={hero?.name} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Role</label>
              <input name="role" defaultValue={hero?.role} className={inputClasses} />
            </div>
          </div>
          <div>
            <label className={labelClasses}>Description</label>
            <textarea name="description" defaultValue={hero?.description} rows={3} className={inputClasses} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Profile Image</label>
              <input type="file" name="image" accept="image/*" className={inputClasses} />
              {hero?.image && <p className="text-xs text-slate-500 mt-2">Current: {hero.image}</p>}
            </div>
            <div>
              <label className={labelClasses}>CV / Resume (PDF)</label>
              <input type="file" name="cv" accept=".pdf" className={inputClasses} />
              {hero?.cv && <p className="text-xs text-slate-500 mt-2">Current: <a href={hero.cv} target="_blank" className="text-blue-500 hover:underline">View CV</a></p>}
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
            <input type="checkbox" name="available" defaultChecked={hero?.available} id="available" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="available" className="text-sm font-medium dark:text-slate-300 cursor-pointer select-none">Available for work</label>
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto">Save Hero</Button>
        </form>
      </AdminSection>

      {/* About Section */}
      <AdminSection title="About Section" icon={<User className="w-6 h-6" />}>
        <form action={updateAbout} className="space-y-6">
          <div>
            <label className={labelClasses}>Description</label>
            <textarea name="description" defaultValue={about?.description} rows={5} className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>About Image</label>
            <input type="file" name="image" accept="image/*" className={inputClasses} />
            {about?.image && <p className="text-xs text-slate-500 mt-2">Current: {about.image}</p>}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Experience Label</label>
              <input name="experience" defaultValue={about?.experience} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Projects Label</label>
              <input name="projects" defaultValue={about?.projects} className={inputClasses} />
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto">Save About</Button>
        </form>
      </AdminSection>

      {/* Skills Section */}
      <AdminSection title="Skills" icon={<Code2 className="w-6 h-6" />}>
        {/* Add Skill Form */}
        <form action={addSkill} className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold mb-4 dark:text-white text-lg">Add New Skill</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs mb-1.5 dark:text-slate-400 font-medium">Category</label>
              <select name="category" className={inputClasses}>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1.5 dark:text-slate-400 font-medium">Name</label>
              <input name="name" required className={inputClasses} placeholder="e.g. React" />
            </div>
            <div>
              <label className="block text-xs mb-1.5 dark:text-slate-400 font-medium">Level (%)</label>
              <input name="level" type="number" min="0" max="100" required className={inputClasses} placeholder="90" />
            </div>
            <Button type="submit" size="lg" className="w-full">Add</Button>
          </div>
        </form>

        {/* Skills List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(skill => (
            <div key={skill.id} className="flex justify-between items-center p-4 bg-white dark:bg-black rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
              <div>
                <p className="font-bold dark:text-white">{skill.name}</p>
                <p className="text-sm text-slate-500">{skill.category} • {skill.level}%</p>
              </div>
              <form action={deleteSkill.bind(null, skill.id)}>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 h-10 w-10 p-0 rounded-full"><Trash2 className="w-5 h-5" /></Button>
              </form>
            </div>
          ))}
        </div>
      </AdminSection>

      {/* Projects Section */}
      <AdminSection title="Projects" icon={<FolderGit2 className="w-6 h-6" />}>
        <form action={addProject} className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold mb-4 dark:text-white text-lg">Add New Project</h3>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>Title</label>
              <input name="title" required className={inputClasses} placeholder="Project Title" />
            </div>
            <div>
              <label className={labelClasses}>Description</label>
              <textarea name="description" required className={inputClasses} placeholder="Description" rows={3} />
            </div>
            <div>
              <label className={labelClasses}>Tags</label>
              <input name="tags" required className={inputClasses} placeholder="Tags (comma separated)" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Demo Link</label>
                <input name="demoLink" className={inputClasses} placeholder="https://..." />
              </div>
              <div>
                <label className={labelClasses}>GitHub Link</label>
                <input name="githubLink" className={inputClasses} placeholder="https://..." />
              </div>
            </div>
            <div>
              <label className={labelClasses}>Project Image</label>
              <input type="file" name="image" accept="image/*" className={inputClasses} />
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto">Add Project</Button>
          </div>
        </form>

        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.id} className="flex flex-col sm:flex-row justify-between items-start p-5 bg-white dark:bg-black rounded-xl border border-slate-100 dark:border-slate-800 gap-4 shadow-sm">
              <div>
                <h4 className="font-bold text-lg dark:text-white mb-1">{project.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                   {project.tags.split(',').map(t => <span key={t} className="text-xs bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">{t.trim()}</span>)}
                </div>
                <div className="flex gap-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                  {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="hover:underline">Live Demo</a>}
                  {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>}
                </div>
              </div>
              <form action={deleteProject.bind(null, project.id)} className="self-end sm:self-start w-full sm:w-auto">
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 w-full sm:w-auto justify-center"><Trash2 className="w-5 h-5 mr-2 sm:mr-0" /> <span className="sm:hidden">Delete Project</span></Button>
              </form>
            </div>
          ))}
        </div>
      </AdminSection>

      {/* Experience Section */}
      <AdminSection title="Experience" icon={<Briefcase className="w-6 h-6" />}>
        <form action={addExperience} className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold mb-4 dark:text-white text-lg">Add Experience</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
             <div>
               <label className={labelClasses}>Role</label>
               <input name="role" required className={inputClasses} placeholder="Software Engineer" />
             </div>
             <div>
               <label className={labelClasses}>Company</label>
               <input name="company" required className={inputClasses} placeholder="Tech Corp" />
             </div>
          </div>
          <div className="mb-4">
             <label className={labelClasses}>Date Range</label>
             <input name="date" required className={inputClasses} placeholder="2023 - Present" />
          </div>
          <div className="mb-4">
             <label className={labelClasses}>Description</label>
             <textarea name="description" required className={inputClasses} placeholder="Key responsibilities..." rows={3} />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto">Add Experience</Button>
        </form>

        <div className="space-y-4">
          {experiences.map(exp => (
            <div key={exp.id} className="flex flex-col sm:flex-row justify-between items-start p-5 bg-white dark:bg-black rounded-xl border border-slate-100 dark:border-slate-800 gap-4 shadow-sm">
              <div>
                <h4 className="font-bold text-lg dark:text-white">{exp.role} <span className="text-blue-600 dark:text-blue-400 text-base font-normal block sm:inline">@ {exp.company}</span></h4>
                <p className="text-sm text-slate-500 mb-2 font-medium">{exp.date}</p>
                <p className="text-slate-600 dark:text-slate-300">{exp.description}</p>
              </div>
              <form action={deleteExperience.bind(null, exp.id)} className="self-end sm:self-start w-full sm:w-auto">
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 w-full sm:w-auto justify-center"><Trash2 className="w-5 h-5 mr-2 sm:mr-0" /> <span className="sm:hidden">Delete</span></Button>
              </form>
            </div>
          ))}
        </div>
      </AdminSection>

      {/* Contact Information */}
      <AdminSection title="Contact Information" icon={<Mail className="w-6 h-6" />}>
        <form action={updateContact} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Email</label>
              <input name="email" defaultValue={contact?.email} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Phone</label>
              <input name="phone" defaultValue={contact?.phone} className={inputClasses} />
            </div>
          </div>
          <div>
            <label className={labelClasses}>Location</label>
            <input name="location" defaultValue={contact?.location} className={inputClasses} />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className={labelClasses}>GitHub Link</label>
              <input name="github" defaultValue={contact?.github || ''} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>LinkedIn Link</label>
              <input name="linkedin" defaultValue={contact?.linkedin || ''} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Twitter Link</label>
              <input name="twitter" defaultValue={contact?.twitter || ''} className={inputClasses} />
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto">Save Contact Info</Button>
        </form>
      </AdminSection>

      {/* Security Section */}
      <AdminSection title="Account Security" icon={<Lock className="w-6 h-6" />}>
        <form action={updatePassword} className="space-y-6 max-w-md">
          <div>
            <label className={labelClasses}>Current Password</label>
            <input type="password" name="currentPassword" required className={inputClasses} placeholder="••••••••" />
          </div>
          <div>
            <label className={labelClasses}>New Password</label>
            <input type="password" name="newPassword" required className={inputClasses} placeholder="••••••••" />
          </div>
          <div>
            <label className={labelClasses}>Confirm New Password</label>
            <input type="password" name="confirmPassword" required className={inputClasses} placeholder="••••••••" />
          </div>
          <Button type="submit" variant="outline" size="lg" className="w-full sm:w-auto border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/50">Change Password</Button>
        </form>
      </AdminSection>

    </div>
  )
}

import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
    },
  })
  console.log({ user })

  // Hero Data
  // Check if exists
  const heroCount = await prisma.hero.count()
  if (heroCount === 0) {
    await prisma.hero.create({
      data: {
        name: 'Your Name',
        role: 'Full Stack Developer',
        description: 'I build accessible, pixel-perfect, secure, and performant web applications. Specialized in Node.js, React, and modern UI/UX.',
        available: true,
      },
    })
  }

  // About Data
  const aboutCount = await prisma.about.count()
  if (aboutCount === 0) {
    await prisma.about.create({
      data: {
        description: 'I am a passionate Full Stack Developer with a strong focus on building scalable and user-friendly web applications.',
        experience: '2+ Years',
        projects: '10+ Completed',
      },
    })
  }

  // Skills
  const skillCount = await prisma.skill.count()
  if (skillCount === 0) {
    const skills = [
      { category: 'Frontend', name: 'React / Next.js', level: 90 },
      { category: 'Frontend', name: 'TypeScript', level: 85 },
      { category: 'Frontend', name: 'Tailwind CSS', level: 95 },
      { category: 'Backend', name: 'Node.js', level: 85 },
      { category: 'Backend', name: 'PostgreSQL', level: 75 },
      { category: 'Tools', name: 'Git / GitHub', level: 90 },
    ]
    
    for (const skill of skills) {
      await prisma.skill.create({ data: skill })
    }
  }

  // Projects
  const projectCount = await prisma.project.count()
  if (projectCount === 0) {
    const projects = [
      {
        title: 'E-Commerce Dashboard',
        description: 'A comprehensive dashboard for managing products, orders, and analytics.',
        tags: 'Next.js,TypeScript,Tailwind,Prisma',
        image: 'bg-gradient-to-br from-blue-500 to-purple-600',
      },
      {
        title: 'Task Management App',
        description: 'Collaborative task management tool with drag-and-drop kanban boards.',
        tags: 'React,Redux,Node.js',
        image: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      },
    ]

    for (const project of projects) {
      await prisma.project.create({ data: project })
    }
  }

  // Experience
  const expCount = await prisma.experience.count()
  if (expCount === 0) {
    const experiences = [
      {
        role: 'Senior Full Stack Developer',
        company: 'Tech Solutions Inc.',
        date: '2023 - Present',
        description: 'Leading a team of developers in building scalable web applications.',
      },
      {
        role: 'Frontend Developer',
        company: 'Creative Digital Agency',
        date: '2021 - 2023',
        description: 'Developed responsive and interactive user interfaces.',
      },
    ]

    for (const exp of experiences) {
      await prisma.experience.create({ data: exp })
    }
  }

  // Contact Data
  const contactCount = await prisma.contact.count()
  if (contactCount === 0) {
    await prisma.contact.create({
      data: {
        email: 'hello@example.com',
        phone: '+1 (234) 567-890',
        location: 'Yangon, Myanmar',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

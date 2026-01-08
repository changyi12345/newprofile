'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import bcrypt from 'bcryptjs'

async function saveFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  // Ensure directory exists
  const uploadDir = join(process.cwd(), 'public', 'uploads')
  try {
    await mkdir(uploadDir, { recursive: true })
  } catch {
  }

  // Create unique filename
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
  const path = join(uploadDir, filename)
  
  await writeFile(path, buffer)
  return `/uploads/${filename}`
}

// --- Fetch Actions ---

export async function getHero() {
  return await prisma.hero.findFirst()
}

export async function getAbout() {
  return await prisma.about.findFirst()
}

export async function getSkills() {
  return await prisma.skill.findMany()
}

export async function getProjects() {
  return await prisma.project.findMany()
}

export async function getExperiences() {
  return await prisma.experience.findMany()
}

export async function getContact() {
  return await prisma.contact.findFirst()
}

// --- Update Actions ---

export async function updateHero(formData: FormData) {
  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const description = formData.get('description') as string
  const available = formData.get('available') === 'on'
  const imageFile = formData.get('image') as File | null
  const cvFile = formData.get('cv') as File | null

  let imageUrl = undefined
  if (imageFile && imageFile.size > 0) {
    imageUrl = await saveFile(imageFile)
  }

  let cvUrl = undefined
  if (cvFile && cvFile.size > 0) {
    cvUrl = await saveFile(cvFile)
  }

  const hero = await prisma.hero.findFirst()

  if (hero) {
    await prisma.hero.update({
      where: { id: hero.id },
      data: { 
        name, 
        role, 
        description, 
        available,
        ...(imageUrl && { image: imageUrl }),
        ...(cvUrl && { cv: cvUrl })
      },
    })
  } else {
    await prisma.hero.create({
      data: { 
        name, 
        role, 
        description, 
        available,
        image: imageUrl,
        cv: cvUrl
      },
    })
  }
  revalidatePath('/')
}

export async function updateAbout(formData: FormData) {
  const description = formData.get('description') as string
  const experience = formData.get('experience') as string
  const projects = formData.get('projects') as string
  const imageFile = formData.get('image') as File | null

  let imageUrl = undefined
  if (imageFile && imageFile.size > 0) {
    imageUrl = await saveFile(imageFile)
  }

  const about = await prisma.about.findFirst()

  if (about) {
    await prisma.about.update({
      where: { id: about.id },
      data: { 
        description, 
        experience, 
        projects,
        ...(imageUrl && { image: imageUrl })
      },
    })
  } else {
    await prisma.about.create({
      data: { 
        description, 
        experience, 
        projects,
        image: imageUrl
      },
    })
  }
  revalidatePath('/')
}

export async function addSkill(formData: FormData) {
  const category = formData.get('category') as string
  const name = formData.get('name') as string
  const level = parseInt(formData.get('level') as string)

  await prisma.skill.create({
    data: { category, name, level },
  })
  revalidatePath('/')
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } })
  revalidatePath('/')
}

export async function addProject(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const tags = formData.get('tags') as string
  const demoLink = formData.get('demoLink') as string
  const githubLink = formData.get('githubLink') as string
  const imageFile = formData.get('image') as File | null
  
  let imageUrl = 'bg-gradient-to-br from-blue-500 to-purple-600' // Default
  if (imageFile && imageFile.size > 0) {
    imageUrl = await saveFile(imageFile)
  }

  await prisma.project.create({
    data: { title, description, tags, demoLink, githubLink, image: imageUrl },
  })
  revalidatePath('/')
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } })
  revalidatePath('/')
}

export async function addExperience(formData: FormData) {
  const role = formData.get('role') as string
  const company = formData.get('company') as string
  const date = formData.get('date') as string
  const description = formData.get('description') as string

  await prisma.experience.create({
    data: { role, company, date, description },
  })
  revalidatePath('/')
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } })
  revalidatePath('/')
}

export async function updateContact(formData: FormData) {
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const location = formData.get('location') as string
  const github = formData.get('github') as string
  const linkedin = formData.get('linkedin') as string
  const twitter = formData.get('twitter') as string

  const contact = await prisma.contact.findFirst()

  if (contact) {
    await prisma.contact.update({
      where: { id: contact.id },
      data: { email, phone, location, github, linkedin, twitter },
    })
  } else {
    await prisma.contact.create({
      data: { email, phone, location, github, linkedin, twitter },
    })
  }
  revalidatePath('/')
}

export async function updatePassword(formData: FormData) {
  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error('All fields are required')
  }

  if (newPassword !== confirmPassword) {
    throw new Error('New passwords do not match')
  }

  // Find the first user (assuming single admin)
  const user = await prisma.user.findFirst()

  if (!user) {
    throw new Error('User not found')
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

  if (!isPasswordValid) {
    throw new Error('Invalid current password')
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  })
  
  // We don't verify return value here, just let it throw or succeed
}

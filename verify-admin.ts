const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@example.com'
  const user = await prisma.user.findUnique({
    where: { email }
  })

  console.log('User found:', user)

  if (user) {
    const isPasswordValid = await bcrypt.compare('admin123', user.password)
    console.log('Password valid:', isPasswordValid)
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

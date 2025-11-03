import express from 'express'
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

// ✅ Create a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body

  try {
    // const user = await prisma.user.create({
    //   data: { name, email },
    // })
    // res.status(201).json(user)
  } catch (error) {
    console.error(error)
    if (error.code === 'P2002') {
      // Prisma unique constraint violation (duplicate email)
      res.status(400).json({ error: 'Email already exists' })
    } else {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
})

// ✅ Get all users (for testing)
app.get('/users', async (req, res) => {
  // const users = await prisma.user.findMany()
  // res.json(users)
})

// ✅ Start server
const PORT = process.env.PORT || 6000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

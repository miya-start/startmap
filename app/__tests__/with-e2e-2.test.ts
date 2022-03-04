import { execSync } from 'child_process'
import { randomBytes } from 'crypto'
import type { Prisma, PrismaClient } from '@prisma/client'
import { prisma, Profile, User, Post } from '@prisma/client'
import { createUser, updateUsername } from '../test/functions-without-context'

let schema: string
let db: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>
beforeAll(async () => {
  schema = 'a' + randomBytes(4).toString('hex')
  process.env.DATABASE_URL = `${process.env.DATABASE_URL}?schema=${schema}`
  console.log('DATABASE_URL', process.env.DATABASE_URL)

  db = (await import('~/utils/db.server')).db

  execSync(
    `DATABASE_URL=${process.env.DATABASE_URL} npx prisma migrate reset --force`
  )
})

afterAll(async () => {
  const deletePosts = db.post.deleteMany()
  const deleteProfiles = db.profile.deleteMany()
  const deleteUsers = db.user.deleteMany()

  await db.$transaction([deletePosts, deleteProfiles, deleteUsers])
  await db.$disconnect()
  await db.$queryRawUnsafe<[]>(`DROP SCHEMA ${schema} CASCADE`)
  console.log('DATABASE_URL', process.env.DATABASE_URL)
})

test('should create new user and profile with 1 post', async () => {
  const user: User = {
    id: 2,
    name: 'Bob',
    email: 'bob@prisma.io',
  }

  await db.post.create({
    data: {
      title: 'Lorem ipsum',
      author: {
        connectOrCreate: {
          create: {
            ...user,
            profile: {
              create: {
                id: 2,
                bio: 'I like birds',
              },
            },
          },
          where: {
            email: user.email,
          },
        },
      },
    },
  })

  const newUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
  })

  const newPost = await db.post.findFirst({
    where: {
      author: {
        email: user.email,
      },
    },
  })

  expect(newUser).toEqual(user)
  expect(newPost).toHaveProperty('title', 'Lorem ipsum')
})

// test('should update a users name ', async () => {
//   const user = {
//     id: 1,
//     name: 'Rich Haines',
//     email: 'hello@prisma.io',
//   }

//   await expect(updateUsername(user)).resolves.toEqual({
//     id: 1,
//     name: 'Rich Haines',
//     email: 'hello@prisma.io',
//   })
// })

// test('should fail if user does not accept terms', async () => {
//   const user = {
//     id: 1,
//     name: 'Rich Haines',
//     email: 'hello@prisma.io',
//     acceptTermsAndConditions: false,
//   }

//   await expect(createUser(user)).resolves.toEqual(
//     new Error('User must accept terms!')
//   )
// })

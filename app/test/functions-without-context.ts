import { db } from '~/utils/db.server'

interface CreateUser {
  name: string
  email: string
  acceptTermsAndConditions: boolean
}

export async function createUser(user: CreateUser) {
  if (user.acceptTermsAndConditions) {
    const { id, name, email } = await db.user.create({
      data: { name: user.name, email: user.email },
    })
    return { id, name, email }
  } else {
    return new Error('User must accept terms!')
  }
}

interface UpdateUser {
  id: number
  name: string
  email: string
}

export async function updateUsername(user: UpdateUser) {
  return await db.user.update({
    where: { id: user.id },
    data: user,
  })
}

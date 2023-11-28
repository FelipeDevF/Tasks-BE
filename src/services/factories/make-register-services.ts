import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterServices } from '../register'

export function makeRegisterServices() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerServices = new RegisterServices(prismaUsersRepository)

  return registerServices
}

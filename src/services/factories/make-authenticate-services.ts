import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateServices } from '../authenticate'

export function makeAuthenticateServices() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateServices = new AuthenticateServices(prismaUsersRepository)

  return authenticateServices
}

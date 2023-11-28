import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileServices } from '../get-user-profile'

export function makeGetUserProfileServices() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const GetPserProfileServices = new GetUserProfileServices(
    prismaUsersRepository,
  )

  return GetPserProfileServices
}

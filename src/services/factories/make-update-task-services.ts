import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository'
import { UpdateTaskServices } from '../update-task'

export function makeUpdateTaskServices() {
  const prismaTasksRepository = new PrismaTasksRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const updateTaskServices = new UpdateTaskServices(
    prismaTasksRepository,
    prismaUsersRepository,
  )

  return updateTaskServices
}

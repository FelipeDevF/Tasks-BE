import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { TaskServices } from '../task'
import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository'

export function makeTaskServices() {
  const prismaTasksRepository = new PrismaTasksRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const taskServices = new TaskServices(
    prismaTasksRepository,
    prismaUsersRepository,
  )

  return taskServices
}

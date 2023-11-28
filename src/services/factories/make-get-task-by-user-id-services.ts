import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository'
import { GetTaskByUserIdServices } from '../get-task-by-user-id'

export function makeGetTaskByUserIdServices() {
  const prismaTasksRepository = new PrismaTasksRepository()
  const getTaskByUserIdServices = new GetTaskByUserIdServices(
    prismaTasksRepository,
  )

  return getTaskByUserIdServices
}

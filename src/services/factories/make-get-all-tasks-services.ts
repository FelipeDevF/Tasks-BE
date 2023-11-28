import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository'
import { GetAllTasksServices } from '../get-all-tasks'

export function makeGetAllTasksServices() {
  const prismaTasksRepository = new PrismaTasksRepository()
  const taskServices = new GetAllTasksServices(prismaTasksRepository)

  return taskServices
}

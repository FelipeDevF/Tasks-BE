import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository'
import { DeleteTaskServices } from '../delete-task'

export function makeDeleteTaskServices() {
  const prismaTasksRepository = new PrismaTasksRepository()
  const deleteTaskServices = new DeleteTaskServices(prismaTasksRepository)

  return deleteTaskServices
}

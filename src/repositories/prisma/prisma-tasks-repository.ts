import { prisma } from '@/lib/prisma'
import { Prisma, Task } from '@prisma/client'
import { TasksRepository } from '../tasks-repository'

export class PrismaTasksRepository implements TasksRepository {
  async create(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    const task = await prisma.task.create({
      data,
    })

    return task
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await prisma.task.findMany()

    return tasks
  }

  async getTaskByUserId(userId: string): Promise<Task[] | null> {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    })

    return tasks
  }

  async deleteTask(id: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id,
      },
    })
  }

  async findById(id: string): Promise<Task | null> {
    const tasks = await prisma.task.findUnique({
      where: {
        id,
      },
    })

    return tasks
  }

  async update(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    const tasks = await prisma.task.update({
      data,
      where: {
        id: data.id,
      },
    })

    return tasks
  }
}

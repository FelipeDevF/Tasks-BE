import { Task, User, Prisma } from '@prisma/client'
import { TasksRepository } from '../tasks-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async create(data: Prisma.TaskUncheckedCreateInput) {
    const task = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      created_at: new Date(),
      tags: data.tags,
      responsible: data.responsible,
      userId: data.userId,
    }

    this.items.push(task)

    return task
  }

  async getAllTasks() {
    return this.items
  }

  async getTaskByUserId(userId: string) {
    const tasks = this.items.filter((item) => item.userId === userId)

    return tasks
  }
}

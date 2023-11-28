import { Prisma, Task } from '@prisma/client'

export interface TasksRepository {
  create(data: Prisma.TaskUncheckedCreateInput): Promise<Task>
  update(data: Prisma.TaskUncheckedCreateInput): Promise<Task>
  getAllTasks(): Promise<Task[]>
  getTaskByUserId(userId: string): Promise<Task[] | null>
  findById(id: string): Promise<Task | null>
  deleteTask(id: string): Promise<void>
}

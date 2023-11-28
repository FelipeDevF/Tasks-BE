import { TasksRepository } from '@/repositories/tasks-repository'
import { Task } from '@prisma/client'

interface TaskServicesResponse {
  task: Task[]
}

export class GetAllTasksServices {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(): Promise<TaskServicesResponse> {
    const task = await this.tasksRepository.getAllTasks()

    return {
      task,
    }
  }
}

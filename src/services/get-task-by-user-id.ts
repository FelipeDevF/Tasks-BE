import { TasksRepository } from '@/repositories/tasks-repository'
import { Task } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface TaskServicesResponse {
  task: Task[]
}

export class GetTaskByUserIdServices {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(userId: string): Promise<TaskServicesResponse> {
    const task = await this.tasksRepository.getTaskByUserId(userId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    return {
      task,
    }
  }
}

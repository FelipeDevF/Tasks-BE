import { TasksRepository } from '@/repositories/tasks-repository'

export class DeleteTaskServices {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(id: string): Promise<void> {
    await this.tasksRepository.deleteTask(id)
  }
}

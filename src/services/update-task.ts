import { TasksRepository } from '@/repositories/tasks-repository'
import { Task } from '@prisma/client'
import { UserDoesNotExistsError } from './errors/user-does-not-exists-error'
import { UsersRepository } from '@/repositories/users-repository'

interface TaskServicesRequest {
  id: string
  title: string
  description: string
  tags: string
  responsible: string
  userId: string
}

interface TaskServicesResponse {
  task: Task
}

export class UpdateTaskServices {
  constructor(
    private tasksRepository: TasksRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
    title,
    description,
    tags,
    responsible,
    userId,
  }: TaskServicesRequest): Promise<TaskServicesResponse> {
    const userWithSameUserId = await this.usersRepository.findById(userId)
    const taskWithSameTaskId = await this.tasksRepository.findById(id)

    if (!userWithSameUserId || !taskWithSameTaskId)
      throw new UserDoesNotExistsError()

    const task = await this.tasksRepository.update({
      id,
      title,
      description,
      tags,
      responsible,
      userId,
    })

    return {
      task,
    }
  }
}

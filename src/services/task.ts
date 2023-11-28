import { TasksRepository } from '@/repositories/tasks-repository'
import { Task } from '@prisma/client'
import { UserDoesNotExistsError } from './errors/user-does-not-exists-error'
import { UsersRepository } from '@/repositories/users-repository'

interface TaskServicesRequest {
  title: string
  description: string
  tags: string
  responsible: string
  userId: string
}

interface TaskServicesResponse {
  task: Task
}

export class TaskServices {
  constructor(
    private tasksRepository: TasksRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    title,
    description,
    tags,
    responsible,
    userId,
  }: TaskServicesRequest): Promise<TaskServicesResponse> {
    const userWithSameUserId = await this.usersRepository.findById(userId)

    if (!userWithSameUserId) throw new UserDoesNotExistsError()

    const task = await this.tasksRepository.create({
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

import { expect, describe, it, beforeEach } from 'vitest'
import { TaskServices } from './task'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserDoesNotExistsError } from './errors/user-does-not-exists-error'

let tasksRepository: InMemoryTasksRepository
let usersRepository: InMemoryUsersRepository
let sut: TaskServices

describe('Tasks services', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new TaskServices(tasksRepository, usersRepository)
  })

  it('should be able to register a task', async () => {
    usersRepository.items.push({
      id: 'userId',
      created_at: new Date(),
      email: 'email@email.com',
      name: 'Name',
      password_hash: '123456',
    })

    const { task } = await sut.execute({
      title: 'Name',
      description: 'description',
      tags: 'tags',
      responsible: 'responsible',
      userId: 'userId',
    })

    expect(task.id).toEqual(expect.any(String))
  })

  it('it should not be possible to register a task without a registered userId', async () => {
    usersRepository.items.push({
      id: 'user-02',
      created_at: new Date(),
      email: 'email@email.com',
      name: 'Name',
      password_hash: '123456',
    })

    await expect(() =>
      sut.execute({
        title: 'Name',
        description: 'description',
        tags: 'tags',
        responsible: 'responsible',
        userId: 'userId',
      }),
    ).rejects.toBeInstanceOf(UserDoesNotExistsError)
  })
})

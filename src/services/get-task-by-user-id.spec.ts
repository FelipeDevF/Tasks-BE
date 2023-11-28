import { expect, describe, it, beforeEach } from 'vitest'
import { GetAllTasksServices } from './get-all-tasks'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'

let tasksRepository: InMemoryTasksRepository
let sut: GetAllTasksServices

describe('Get Task By User Id services', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new GetAllTasksServices(tasksRepository)
  })

  it('must be able to list all user tasks', async () => {
    const tasks = await sut.execute()

    expect(tasks).toMatchObject({ task: [] })
  })
})

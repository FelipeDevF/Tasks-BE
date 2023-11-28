import { expect, describe, it, beforeEach } from 'vitest'
import { GetAllTasksServices } from './get-all-tasks'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'

let tasksRepository: InMemoryTasksRepository
let sut: GetAllTasksServices

describe('Get All Tasks services', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new GetAllTasksServices(tasksRepository)
  })

  it('must be able to list all tasks', async () => {
    const tasks = await sut.execute()

    expect(tasks).toMatchObject({ task: [] })
  })
})

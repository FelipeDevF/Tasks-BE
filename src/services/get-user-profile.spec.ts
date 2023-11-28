import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileServices } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileServices

describe('Get User Profile services', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileServices(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createUser = await usersRepository.create({
      name: 'Name',
      email: 'email@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Name')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

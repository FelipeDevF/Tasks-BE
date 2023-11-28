import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterServices } from '@/services/factories/make-register-services'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerServices = makeRegisterServices()

    await registerServices.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError)
      return replay.status(409).send({ message: err.message })

    return replay.status(500).send()
  }

  return replay.status(201).send()
}

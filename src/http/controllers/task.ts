import { UserDoesNotExistsError } from '@/services/errors/user-does-not-exists-error'
import { makeTaskServices } from '@/services/factories/make-task-services'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function task(request: FastifyRequest, replay: FastifyReply) {
  const userId = request.user.sub

  const taskBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    tags: z.string(),
    responsible: z.string(),
  })

  const { title, description, tags, responsible } = taskBodySchema.parse(
    request.body,
  )

  try {
    const taskServices = makeTaskServices()

    const task = await taskServices.execute({
      title,
      description,
      tags,
      responsible,
      userId,
    })

    return replay.status(201).send(task)
  } catch (err) {
    if (err instanceof UserDoesNotExistsError)
      return replay.status(400).send({ message: err.message })

    return replay.status(500).send()
  }
}

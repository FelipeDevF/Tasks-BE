import { UserDoesNotExistsError } from '@/services/errors/user-does-not-exists-error'
import { makeUpdateTaskServices } from '@/services/factories/make-update-task-services'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateTask(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const userId = request.user.sub

  const updateTaskBodySchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    tags: z.string(),
    responsible: z.string(),
  })

  const { id, title, description, tags, responsible } =
    updateTaskBodySchema.parse(request.body)

  try {
    const updateTaskServices = makeUpdateTaskServices()

    await updateTaskServices.execute({
      id,
      title,
      description,
      tags,
      responsible,
      userId,
    })
  } catch (err) {
    if (err instanceof UserDoesNotExistsError)
      return replay.status(400).send({ message: err.message })

    return replay.status(500).send()
  }

  return replay.status(201).send()
}

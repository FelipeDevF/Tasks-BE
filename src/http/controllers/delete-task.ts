import { UserDoesNotExistsError } from '@/services/errors/user-does-not-exists-error'
import { makeDeleteTaskServices } from '@/services/factories/make-delete-task-services'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteTask(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const deleteTaskBodySchema = z.object({
    id: z.string(),
  })

  const { id } = deleteTaskBodySchema.parse(request.body)

  try {
    const deleteTaskServices = makeDeleteTaskServices()

    await deleteTaskServices.execute(id)
  } catch (err) {
    if (err instanceof UserDoesNotExistsError)
      return replay.status(400).send({ message: err.message })

    return replay.status(500).send()
  }

  return replay.status(201).send()
}

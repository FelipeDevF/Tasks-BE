import { makeGetTaskByUserIdServices } from '@/services/factories/make-get-task-by-user-id-services'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getTaskByUserId(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const userId = request.user.sub

  try {
    const getTaskUserByIdServices = makeGetTaskByUserIdServices()

    const tasks = await getTaskUserByIdServices.execute(userId)

    return replay.status(201).send(tasks)
  } catch (err) {
    return replay.status(500).send()
  }
}

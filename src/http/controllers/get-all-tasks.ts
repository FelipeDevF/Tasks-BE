import { makeGetAllTasksServices } from '@/services/factories/make-get-all-tasks-services'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllTasks(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  try {
    const tasksServices = makeGetAllTasksServices()

    const tasks = await tasksServices.execute()

    return replay.status(201).send(tasks)
  } catch (err) {
    return replay.status(500).send()
  }
}

import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { task } from './controllers/task'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify_jwt'
import { getAllTasks } from './controllers/get-all-tasks'
import { getTaskByUserId } from './controllers/get-task-by-user-id'
import { deleteTask } from './controllers/delete-task'
import { updateTask } from './controllers/updeta-task'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticate */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.post('/tasks', { onRequest: [verifyJWT] }, task)
  app.get('/tasks', { onRequest: [verifyJWT] }, getAllTasks)
  app.get('/tasks-user', { onRequest: [verifyJWT] }, getTaskByUserId)
  app.delete('/task', { onRequest: [verifyJWT] }, deleteTask)
  app.put('/task', { onRequest: [verifyJWT] }, updateTask)
}

import { makeGetUserProfileServices } from '@/services/factories/make-get-user-profile-services'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, replay: FastifyReply) {
  await request.jwtVerify()

  const getUserProfile = makeGetUserProfileServices()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return replay.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}

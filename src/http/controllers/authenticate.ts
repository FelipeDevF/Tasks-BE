import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateServices } from '@/services/factories/make-authenticate-services'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateServices = makeAuthenticateServices()

    const { user } = await authenticateServices.execute({
      email,
      password,
    })

    const expiracao = Math.floor(Date.now() / 1000) + 60 * 60 * 24

    const token = await replay.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: expiracao,
        },
      },
    )

    return replay.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError)
      return replay.status(400).send({ message: err.message })

    return replay.status(500).send()
  }
}

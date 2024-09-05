const UsersRepository = require('../repositories/UsersRepository')
const CreateSessionsService = require('../services/SessionsServices/CreateSessionsService')

class SessionsController {

  async create(request, response) {
    const { email, password } = request.body

    const usersRepository = new UsersRepository()
    const createSessionsService = new CreateSessionsService(usersRepository)

    try {
      const { token, user } = await createSessionsService.execute({ email, password })

      response.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 15 * 60 * 1000
      })
  
      response.status(201).json({ user })
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message })
    }
  }
}

module.exports = SessionsController
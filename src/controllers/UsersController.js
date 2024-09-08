const UsersRepository = require("../repositories/UsersRepository")

const CreateUserService = require("../services/UsersServices/CreateUserService")

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    try {
      await createUserService.execute({ name, email, password })
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message })
    }
    return response.status(201).json()
  }
}

module.exports = UsersController
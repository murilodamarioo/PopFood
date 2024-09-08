const { hash } = require('bcryptjs')
const AppError = require('../../utils/AppError')

class CreateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }) {
    const checkEmailExists = await this.usersRepository.findByEmail(email)

    if (!name || !email || !password) throw new AppError('Todos os campos devem ser preenchidos.', 400)

    if (checkEmailExists) throw new AppError('Este e-mail já está em uso.', 400)

    const hashedPassword = await hash(password, 8)

    await this.usersRepository.create({name, email, password: hashedPassword})
  }
}

module.exports = CreateUserService
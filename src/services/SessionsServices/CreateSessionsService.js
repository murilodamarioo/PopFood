const AppError = require("../../utils/AppError")
const authConfig = require('../../configs/auth')

const { sign } = require('jsonwebtoken')
const { compare } = require('bcryptjs')

class CreateSessionsService {

  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email ou senha inválidos', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Email ou senha inválidos', 401)
    }
    
    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn
    })

    delete user.password

    return { user, token }
  }
}

module.exports = CreateSessionsService
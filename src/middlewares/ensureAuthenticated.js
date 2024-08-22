const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

function ensureAuthenticated(request, response, next) {
  const authHeaders = request.authHeaders

  if (!authHeaders.cookie) throw new AppError('Roken não informado', 401)
  
  const [_, token] = authHeaders.cookie.split('token=')

  try {
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id),
      role
    }

    return next()
  } catch {
    throw new AppError('Token inválido', 401)
  }
}

module.exports = ensureAuthenticated
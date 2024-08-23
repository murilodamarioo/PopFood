const AppError = require('../utils/AppError')

function verifyUserAuthorization(roleToverify) {
  return (request, response, next) =>{
    const { role } = request.user

    if (!roleToverify.includes(role)) {
      throw new AppError('Não Autorizado', 401)
    }

    return next()
  }
}

module.exports = verifyUserAuthorization
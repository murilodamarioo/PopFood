const knex = require('../database/knex')

class UsersRepository {
  async findByEmail(email) {
    const user = await knex('users').where({email}).first()
    return user
  }

  async create({ name, email, password }) {
    const userCreated = await knex('users').insert({name, email, password})
    return userCreated
  }
}

module.exports = UsersRepository
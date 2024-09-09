const knex = require('../database/knex')

class IngredientsRepository {
  async insert(title) {
    await knex('ingredients').insert(title)
  }

  async delete(id) {
    await knex('ingredients').whereIn({id})
  }
}

module.exports = IngredientsRepository
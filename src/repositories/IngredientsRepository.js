const knex = require('../database/knex')

class IngredientsRepository {
  async insert(title) {
    await knex('ingredients').insert(title)
  }

  async delete(food_id) {
    await knex('ingredients').where({food_id}).del()
  }
}

module.exports = IngredientsRepository
const knex = require('../database/knex')

class FoodsRepository {
  async create({ image, name, category, price, description }) {
    const [food_id] = await knex('foods').insert({ image, name, category, price, description })
    return food_id
  }

  async delete(id) {
    await knex('foods').where({ id }).delete()
  }

  async insertIngredients(ingredients) {
    await knex('ingredients').insert(ingredients)
  }
}

module.exports = FoodsRepository
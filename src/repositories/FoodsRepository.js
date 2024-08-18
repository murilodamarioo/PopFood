const knex = require('../database/knex')

class FoodsRepository {
  async create({ image, name, category, price, description }) {
    console.log(image, name, category, price, description)
    const [food_id] = await knex('foods').insert({ image, name, category, price, description })

    return food_id
  }
}

module.exports = FoodsRepository
const knex = require('../database/knex')

class FoodsRepository {
  async findAll() {
    const queryResult = await knex('foods')
    return queryResult
  }

  async findBySearch(searchTerm) {
    const queryResult = await knex('foods')
    .distinct('foods.id', 'foods.name', 'foods.price', 'foods.description', 'foods.image', 'foods.category', 'foods.created_at')
    .join('ingredients', 'foods.id', 'ingredients.food_id')
    .where('foods.name', 'like', `%${searchTerm}%`)
    .orWhere('ingredients.title', 'like', `%${searchTerm}%`)
    .orderBy('foods.name')

    return queryResult
  }
  
  async findById(id) {
    const food = await knex('foods').where({id}).first()
    const ingredientsInfo = await knex('ingredients').where({food_id: id}).orderBy('title')
    
    const ingredients = ingredientsInfo.map(info => info.title)

    return { food, ingredients }
  }

  async create({ user_id, image, name, category, price, description }) {
    const [food_id] = await knex('foods').insert({ user_id, image, name, category, price, description })
    return food_id
  }

  async delete(id) {
    await knex('foods').where({ id }).del()
  }

  async insertIngredients(ingredients) {
    await knex('ingredients').insert(ingredients)
  }

  async update({ id, name, category, price, description }) {
    await knex('foods').update({name, category, price, description, updated_at: knex.fn.now()}).where({ id })
  }

  async updateImage(id, image) {
    await knex('foods').update({ image }).where({ id })
  }
}

module.exports = FoodsRepository
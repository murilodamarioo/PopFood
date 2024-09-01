class CreateFoodService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository
  }

  async execute({ user_id, image, name, category, price, description, ingredients }) {
    const food_id = await this.foodsRepository.create({ user_id, image, name, category, price, description })

    const ingredientsToInsert = ingredients.map(ingredient => {
      return {
        food_id,
        user_id,
        title: ingredient
      }
    })
    await this.foodsRepository.insertIngredients(ingredientsToInsert)
  }
}

module.exports = CreateFoodService
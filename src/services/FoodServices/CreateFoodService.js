class CreateFoodService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository
  }

  async execute({ image, name, category, price, description, ingredients }) {
    const food_id = await this.foodsRepository.create({ image, name, category, price, description })

    const ingredientsToInsert = ingredients.map(ingredient => {
      return {
        food_id,
        title: ingredient
      }
    })
    await this.foodsRepository.insertIngredients(ingredientsToInsert)
  }
}

module.exports = CreateFoodService
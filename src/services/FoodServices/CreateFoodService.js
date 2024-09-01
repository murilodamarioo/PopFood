const DiskStorage = require("../../providers/DiskStorage")

class CreateFoodService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository
  }

  async execute({ user_id, image, name, category, price, description, ingredients }) {
    const diskStorage = new DiskStorage()
    const filename = await diskStorage.saveFile(image)
    
    const food_id = await this.foodsRepository.create({ user_id, image: filename, name, category, price, description })

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
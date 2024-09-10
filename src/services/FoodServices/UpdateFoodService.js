const AppError = require('../../utils/AppError')

class UpdateFoodService {
  constructor(foodsRepository, ingredientsRepository) {
    this.foodsRepository = foodsRepository
    this.ingredientsRepository = ingredientsRepository
  }

  async execute({ id, name, category, price, description, ingredients }) {
    const { food: foodExists } = await this.foodsRepository.findById(id)
    if (!foodExists) {
      throw new AppError('Impossível de atualizar! Prato inexistente!', 404)
    }

    if (!name || !category || !price || !description) {
      throw new AppError('Todos os campos devem ser preenchidos!', 400)
    }

    foodExists.name = name ?? foodExists.name
    foodExists.category = category ?? foodExists.category
    foodExists.price = price ?? foodExists.price
    foodExists.description = description ?? foodExists.description

    await this.ingredientsRepository.delete(id)

    const ingredientsToInsert = ingredients.map(ingredient => {
      return {
        food_id: id,
        user_id: foodExists.user_id,
        title: ingredient
      }
    })
    
    await this.ingredientsRepository.insert(ingredientsToInsert)

    await this.foodsRepository.update({
        id,
        name: foodExists.name, 
        category: foodExists.category, 
        price: foodExists.price,
        description: foodExists.description
      })
  }
}

module.exports = UpdateFoodService
const DiskStorage = require("../../providers/DiskStorage")
const AppError = require("../../utils/AppError")

class CreateFoodService {
  constructor(foodsRepository, ingredientsRepository) {
    this.foodsRepository = foodsRepository
    this.ingredientsRepository = ingredientsRepository
  }

  async execute({ user_id, image, name, category, price, description, ingredients }) {
    if (!image) {
      throw new AppError('Imagem do prato obrigatória', 400)
    }

    let newIngredients

    if (typeof ingredients === 'string') {
      newIngredients = ingredients.split(',').map(ingredient => ingredient.trim())
    } else {
      newIngredients = ingredients
    }

    const diskStorage = new DiskStorage()
    const filename = await diskStorage.saveFile(image)

    if  (!name || !category || !price || !description || !ingredients) {
      throw new AppError('Todos os campos devem serem prenchidos.', 400)
    }

    const food_id = await this.foodsRepository.create({ user_id, image: filename, name, category, price, description })

    const ingredientsToInsert = newIngredients.map(ingredient => {
      return {
        food_id,
        user_id,
        title: ingredient
      }
    })
    await this.ingredientsRepository.insert(ingredientsToInsert)
  }
}

module.exports = CreateFoodService
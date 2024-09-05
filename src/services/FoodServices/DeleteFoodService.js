const AppError = require('../../utils/AppError')

class DeleteFoodService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository
  }

  async execute(id) {
    const { food: foodExists } = await this.foodsRepository.findById(id)

    if (!foodExists) {
      throw new AppError('Impossível de excluir! Prato inexistente!', 404)
    }

    await this.foodsRepository.delete(id)
  }
}

module.exports = DeleteFoodService
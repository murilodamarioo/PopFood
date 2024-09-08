const AppError = require("../../utils/AppError")

class ShowFoodsService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository
  }

  async execute(id) {
    const item = await this.foodsRepository.findById(id) 

    if (!item.food) {
      throw new AppError('Prato inexistente!', 404)
    }
    
    return item
  }
}

module.exports = ShowFoodsService
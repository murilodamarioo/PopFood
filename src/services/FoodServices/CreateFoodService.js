class CreateFoodService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository
  }

  async execute({ image, name, category, price, description }) {
    await this.foodsRepository.create({ image, name, category, price, description })
  }
}

module.exports = CreateFoodService
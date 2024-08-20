class IndexFoodService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository
  }

  async execute(search) {
    const foodsFounded = await this.foodsRepository.findAll(search)
    return foodsFounded
  }
}

module.exports = IndexFoodService
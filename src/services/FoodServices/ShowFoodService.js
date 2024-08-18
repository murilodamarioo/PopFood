class ShowFoodsService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository
  }

  async execute(id) {
    const item = await this.foodsRepository.findById(id)
    return item
  }
}

module.exports = ShowFoodsService
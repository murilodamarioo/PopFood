class DeleteFoodService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository
  }

  async execute(id) {
    await this.foodsRepository.delete(id)
  }
}

module.exports = DeleteFoodService
class DeleteFoodService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository
  }

  async execute(id) {
    const { food: foodExists } = await this.foodsRepository.findById(id)

    if (!foodExists) {
      throw new Error('Impossível de excluir! Prato inexistente!', 400)
    }

    await this.foodsRepository.delete(id)
  }
}

module.exports = DeleteFoodService
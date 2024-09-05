class IndexFoodService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository
  }

  async execute(search) {

    let foodsFounded

    if (search) {
      foodsFounded = await this.foodsRepository.findBySearch(search)
    } else {
      foodsFounded = await this.foodsRepository.findAll()
    }

    return foodsFounded
  }
}

module.exports = IndexFoodService
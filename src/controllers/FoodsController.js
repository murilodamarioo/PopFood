const FoodsRepository = require('../repositories/FoodsRepository')
const CreateFoodService = require('../services/FoodServices/CreateFoodService')

class FoodsController {
  async create(request, response) {
    const { image, name, category, price, description, ingredients } = request.body

    const foodsRepository = new FoodsRepository()
    const createFoodService = new CreateFoodService(foodsRepository)

    createFoodService.execute({ image, name, category, price, description, ingredients })

    return response.status(201).send()
  }
}

module.exports = FoodsController
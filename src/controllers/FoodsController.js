const FoodsRepository = require('../repositories/FoodsRepository')
const CreateFoodService = require('../services/FoodServices/CreateFoodService')
const DeleteFoodService = require('../services/FoodServices/DeleteFoodService')

class FoodsController {
  async create(request, response) {
    const { image, name, category, price, description, ingredients } = request.body

    const foodsRepository = new FoodsRepository()
    const createFoodService = new CreateFoodService(foodsRepository)

    createFoodService.execute({ image, name, category, price, description, ingredients })

    return response.status(201).send()
  }

  async delete(request, response) {
    const { id } = request.params

    const foodsRepository = new FoodsRepository()
    const deleteFoodService = new DeleteFoodService(foodsRepository)
    
    await deleteFoodService.execute({ id })

    return response.status(204).send()
  }
}

module.exports = FoodsController
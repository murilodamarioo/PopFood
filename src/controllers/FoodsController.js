const FoodsRepository = require('../repositories/FoodsRepository')

const CreateFoodService = require('../services/FoodServices/CreateFoodService')
const DeleteFoodService = require('../services/FoodServices/DeleteFoodService')
const ShowFoodService = require('../services/FoodServices/ShowFoodService')
const IndexFoodService = require('../services/FoodServices/IndexFoodService')
const UpdateFoodService = require('../services/FoodServices/UpdateFoodService')

class FoodsController {
  async index(request, response) {
    const { search } = request.query

    const foodsRepository = new FoodsRepository()
    const indexFoodService = new IndexFoodService(foodsRepository)

    const searchResult = await indexFoodService.execute(search)

    return response.json(searchResult)
  }

  async show(request, response) {
    const { id } = request.params

    const foodsRepository = new FoodsRepository()
    const showFoodService = new ShowFoodService(foodsRepository)

    const { food, ingredients } = await showFoodService.execute(id)

    return response.json({ ...food, ingredients })
  }

  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body
    const image = request.file?.filename
    const user_id = request.user.id

    const foodsRepository = new FoodsRepository()
    const createFoodService = new CreateFoodService(foodsRepository)

    try {
      await createFoodService.execute({ user_id, image, name, category, price, description, ingredients })
    } catch(error) {
      return response.status(error.statusCode).json({ error: error.message })
    }

    return response.status(201).send()
  }

  async update(request, response) {
    const { id } = request.params
    const { name, category, price, description } = request.body

    const foodsRepository = new FoodsRepository()
    const updateFoodService = new UpdateFoodService(foodsRepository)

    try {
      await updateFoodService.execute({ id, name, category, price, description })
    } catch(error) {
      return response.status(error.statusCode).json({ error: error.message })
    }

    return response.status(200).json()
  }

  async delete(request, response) {
    const { id } = request.params

    const foodsRepository = new FoodsRepository()
    const deleteFoodService = new DeleteFoodService(foodsRepository)

    try {
      await deleteFoodService.execute(id)
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message })
    }
    
    return response.status(204).send()
  }
}

module.exports = FoodsController
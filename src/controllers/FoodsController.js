const FoodsRepository = require('../repositories/FoodsRepository')

const CreateFoodService = require('../services/FoodServices/CreateFoodService')
const DeleteFoodService = require('../services/FoodServices/DeleteFoodService')
const ShowFoodService = require('../services/FoodServices/ShowFoodService')
const IndexFoodService = require('../services/FoodServices/IndexFoodService')
const UpdateFoodService = require('../services/FoodServices/UpdateFoodService')
const IngredientsRepository = require('../repositories/ingredientsRepository')

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

    try {
      const { food, ingredients } = await showFoodService.execute(id)

      return response.json({ ...food, ingredients })
    } catch(error) {
      return response.status(error.statusCode).json({ message: error.message })
    }
  }

  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body
    const image = request.file?.filename
    const user_id = request.user.id

    const foodsRepository = new FoodsRepository()
    const ingredientsRepository = new IngredientsRepository()
    const createFoodService = new CreateFoodService(foodsRepository, ingredientsRepository)

    try {
      await createFoodService.execute({ user_id, image, name, category, price, description, ingredients })
    } catch(error) {
      return response.status(error.statusCode).json({ message: error.message })
    }

    return response.status(201).send()
  }

  async update(request, response) {
    const { id } = request.params
    const { name, category, price, description, ingredients } = request.body

    const foodsRepository = new FoodsRepository()
    const ingredientsRepository = new IngredientsRepository()
    const updateFoodService = new UpdateFoodService(foodsRepository, ingredientsRepository)

    try {
      await updateFoodService.execute({ id, name, category, price, description, ingredients })
    } catch(error) {
      return response.status(error.statusCode).json({ message: error.message })
    }

    return response.status(200).json({ message: 'Prato atualizado com sucesso!' })
  }

  async delete(request, response) {
    const { id } = request.params

    const foodsRepository = new FoodsRepository()
    const deleteFoodService = new DeleteFoodService(foodsRepository)

    try {
      await deleteFoodService.execute(id)
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message })
    }
    
    return response.status(204).send()
  }
}

module.exports = FoodsController
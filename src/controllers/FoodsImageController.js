const FoodsRepository = require('../repositories/FoodsRepository')
const UpdateFoodImageService = require('../services/FoodServices/UpdateFoodImageService')
class FoodsImageController {
  async update(request, response) {
    const { id } = request.params
    const imageFilename = request.file.filename

    const foodsRepository = new FoodsRepository()
    const updateFoodImageService = new UpdateFoodImageService(foodsRepository)

    await updateFoodImageService.execute({ id, imageFilename })

    return response.status(200).json()
  }
}

module.exports = FoodsImageController
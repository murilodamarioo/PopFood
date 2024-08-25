const DiskStorage = require('../../providers/DiskStorage')

class UpdateFoodImageService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository
  }

  async execute({ id, imageFilename }) {
    const diskStorage = new DiskStorage()

    const food = await this.foodsRepository.findById(id)

    if (food.image) {
      await diskStorage.deleteFile(food.image)
    }

    const filename = await diskStorage.saveFile(imageFilename)
    food.image = filename

    await this.foodsRepository.updateImage(id, filename)
  }
}

module.exports = UpdateFoodImageService
const { Router, response } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const FoodsController = require('../controllers/FoodsController')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization')

const foodsRoutes = Router()
const upload = multer(uploadConfig.MULTER)
const foodsController = new FoodsController()

foodsRoutes.use(ensureAuthenticated)

foodsRoutes.get('/', foodsController.index)
foodsRoutes.get('/:id', foodsController.show)
foodsRoutes.post('/', verifyUserAuthorization(['admin']), foodsController.create)
foodsRoutes.patch('/:id/image', verifyUserAuthorization(['admin']), upload.single('image'), (request, response) => {
  console.log(request.file.filename)
  return response.json()
})
foodsRoutes.delete('/:id', verifyUserAuthorization(['admin']), foodsController.delete)

module.exports = foodsRoutes
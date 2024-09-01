const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const FoodsController = require('../controllers/FoodsController')
const FoodsImageController = require('../controllers/FoodsImageController')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization')

const foodsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const foodsController = new FoodsController()
const foodsImageController = new FoodsImageController()

foodsRoutes.use(ensureAuthenticated)

foodsRoutes.get('/', foodsController.index)
foodsRoutes.get('/:id', foodsController.show)
foodsRoutes.post('/', verifyUserAuthorization(['admin']),  upload.single('image'), foodsController.create)
foodsRoutes.patch('/:id/image', verifyUserAuthorization(['admin']), upload.single('image'), foodsImageController.update)
foodsRoutes.delete('/:id', verifyUserAuthorization(['admin']), foodsController.delete)

module.exports = foodsRoutes
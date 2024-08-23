const { Router } = require('express')

const FoodsController = require('../controllers/FoodsController')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization')

const foodsRoutes = Router()
const foodsController = new FoodsController()

foodsRoutes.use(ensureAuthenticated)

foodsRoutes.get('/', foodsController.index)
foodsRoutes.get('/:id', foodsController.show)
foodsRoutes.post('/', verifyUserAuthorization(['admin']), foodsController.create)
foodsRoutes.delete('/:id', verifyUserAuthorization(['admin']), foodsController.delete)

module.exports = foodsRoutes
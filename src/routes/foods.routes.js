const { Router } = require('express')

const FoodsController = require('../controllers/FoodsController')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const foodsRoutes = Router()
const foodsController = new FoodsController()

foodsRoutes.use(ensureAuthenticated)

foodsRoutes.get('/', foodsController.index)
foodsRoutes.get('/:id', foodsController.show)
foodsRoutes.post('/', foodsController.create)
foodsRoutes.delete('/:id', foodsController.delete)

module.exports = foodsRoutes